// Module imports
require('isomorphic-fetch')

const admin = require('firebase-admin')
const Color = require('color-me-maybe')
const functions = require('firebase-functions')
const jwt = require('jsonwebtoken')





// Initialize Firebase
admin.initializeApp()





exports.verifyPixels = functions.database.ref('/{channelID}/unverifiedPixels/{pixelID}').onCreate(async (snapshot, context) => {
  const {
    channelID,
    pixelID,
  } = context.params
  const {
    authToken,
    color,
    coordinates,
    timestamp,
    userID,
  } = snapshot.val()
  const database = admin.database()
  const errors = []
  const thirtySecondsAgo = Date.now() - 30000

  // Verify that the user has not drawn a pixel within the last 30 seconds
  const [
    pixelsFromLastThirtySecondsSnapshot,
    unverifiedPixelsFromLastThirtySecondsSnapshot,
  ] = await Promise.all([
    database.ref(`/${channelID}/pixels`).orderByChild('timestamp').startAt(thirtySecondsAgo).once('value'),
    database.ref(`/${channelID}/unverifiedPixels`).orderByChild('timestamp').startAt(thirtySecondsAgo).once('value'),
  ])
  const allPixels = Object.entries({
    ...(pixelsFromLastThirtySecondsSnapshot.val() || {}),
    ...(unverifiedPixelsFromLastThirtySecondsSnapshot.val() || {}),
  })

  const pixelsFromUser = allPixels.filter(([xPixelID, pixel]) => {
    return (pixel.userID === userID) && (xPixelID !== pixelID)
  })

  if (pixelsFromUser.length) {
    errors.push(`${userID} drew a pixel ${(Date.now() - pixelsFromUser[0].timestamp) / 1000} seconds ago; they have not waited long enough to draw a new pixel`)
  }

  // Verify that coordinates are in-bounds
  // TODO: Handle out-of-bounds coordinates on the positive side
  if (coordinates.x < 0) {
    errors.push(`${coordinates.x} is out-of-bounds`)
  }

  if (coordinates.y < 0) {
    errors.push(`${coordinates.y} is out-of-bounds`)
  }

  // Verify that `color` is a valid color hex
  try {
    Color.fromHex(color)
  } catch (error) {
    errors.push(`${color} is not a valid color code`)
  }

  // Verify that `authToken` is valid and belongs to `userID`
  try {
    const twitchSecret = Buffer.from(functions.config().twitch.secret, 'base64')
    const payload = jwt.verify(authToken, twitchSecret)
  } catch (error) {
    errors.push('Invalid JWT', error)
  }

  // Copy pixel to verified collection if there were no errors
  if (!errors.length) {
    try {
      await database.ref(`/${channelID}/pixels`).push({
        color,
        coordinates,
        timestamp,
        userID,
      })
    } catch (error) {
      return console.error(`Failed to create pixel at X${coordinates.x}, Y${coordinates.y}`, error)
    }
  } else {
    errors.forEach(error => console.error(error))
  }

  // Delete pixel from unverified collection
  try {
    await database.ref(`/${channelID}/unverifiedPixels/${pixelID}`).remove()
  } catch (error) {
    return console.error(`Failed to delete unverified pixel ${pixelID}`, error)
  }
})
