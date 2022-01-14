const multer = require ('multer')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const uploadSingle = upload.single('image')

module.exports = uploadSingle