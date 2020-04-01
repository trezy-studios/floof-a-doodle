const idify = string => string
  .replace(/[^\w]/gu, '-')
  .replace(/--+/gu, '-')
  .replace(/(^-|-$)/gu, '')
  .toLowerCase()





export default idify
