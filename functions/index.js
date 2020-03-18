// Module imports
require('isomorphic-fetch')

const admin = require('firebase-admin')
const Color = require('color-me-maybe')
const functions = require('firebase-functions')
const jwt = require('jsonwebtoken')





// Initialize Firebase
admin.initializeApp()





exports.verifyPixels = functions.database.ref('/{channelID}/unverifiedPixels/{coordinates}').onCreate(async (snapshot, context) => {
  const {
    channelID,
    coordinates,
  } = context.params
  const {
    authToken,
    color,
    timestamp,
    userID,
  } = snapshot.val()
  const database = admin.database()

  // Verify that `color` is a valid color hex
  try {
    Color.fromHex(color)
  } catch (error) {
    return console.error(`${color} is not a valid color code`)
  }

  // Verify that `authToken` is valid and belongs to `userID`
  try {
    const twitchSecret = Buffer.from(functions.config().twitch.secret, 'base64')
    const payload = jwt.verify(authToken, twitchSecret)
  } catch (error) {
    return console.error('Invalid JWT', error)
  }

  // Copy pixel to verified collection
  try {
    await database.ref(`/${channelID}/pixels/${coordinates}`).set({
      color,
      timestamp,
      userID,
    })
  } catch (error) {
    return console.error(`Failed to create pixel at ${coordinates}`, error)
  }

  // Delete pixel from unverified collection
  try {
    await database.ref(`/${channelID}/unverifiedPixels/${coordinates}`).remove()
  } catch (error) {
    return console.error(`Failed to delete unverified pixel at ${coordinates}`, error)
  }
})
