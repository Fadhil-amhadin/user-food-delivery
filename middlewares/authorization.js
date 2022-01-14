const { verifyToken } = require("../helpers/jwt")

const authorization = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token){
            throw { name: 'InvalidInput'}
        }

        const user = verifyToken(access_token)
        req.user = {
			userId: user.userId,
            personalInfo: {
                email: user.email,
                phoneNo: user.phoneNo,
                name: user.name
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization