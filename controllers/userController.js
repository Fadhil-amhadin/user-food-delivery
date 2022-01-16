const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
// const { v4: uuid } = require("uuid");
const randomNumberGenerator = require("../helpers/randomNumberGenerator");

class UserController {
	static async register(req, res, next) {
		try {
			const { email, phoneNo, password } = req.body;
			if (req.headers.signature === "midasfooddelivery") {
				// let userId = uuid()
				let userId = randomNumberGenerator();
				let foundUser = await User.findOne({
					where: {
						userId,
					},
				});

				while (foundUser) {
					userId = randomNumberGenerator();
					foundUser = await User.findOne({
						where: {
							userId,
						},
					});
				}

				const createUser = await User.create({
					email,
					phoneNo,
					password,
					userId,
				});

				res.status(200).json({
					payload: [{}],
					errors: [],
					success: true,
				});
			} else {
				throw { name: "InvalidSignature" };
			}
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			//console.log(req.headers.signature)
			if (req.headers.signature === "midasfooddelivery") {
				
				const foundUser = await User.findOne({
					where: {
						email,
					},
				});

				if (!foundUser) {
					throw { name: "EmailNotRegistered" };
				}

				if (!comparePassword(password, foundUser.password)) {
					throw { name: "WrongPassword" };
				}

				const userLogin = {
					id: foundUser.id,
					email: foundUser.email,
					phoneNo: foundUser.phoneNo,
					userId: foundUser.userId,
					name: foundUser.name,
				};

				const token = signToken(userLogin);

				res.status(200).json({
					payload: [
						{
							userId: foundUser.userId,
							tokens: {
								accessToken: token,
							},
							userInfo: {
								personalInfo: {
									email: foundUser.email,
									phoneNo: foundUser.phoneNo,
									name: foundUser.name,
								},
							},
						},
					],
					errors: [],
					success: true,
				});
			} else {
				throw { name: "InvalidSignature" };
			}
		} catch (err) {
			res.send(err)
			next(err);
		}
	}

	static async loginCheck(req, res, next) {
		try {
			const response = await User.findOne({
				where: {
					id: req.params.id,
				},
				attributes: {
					exclude: ["id", "password", "updatedAt", "createdAt"],
				},
			});

			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	static async updateUser (req, res, next) {
		try {
			const { userId, personalInfo } = req.user
			const { name } = req.body
			const image = req.files.image[0].filename

			await User.update({
				name,
				image: `https://dry-tundra-76454.herokuapp.com/uploads/${image}` // insert url/uploads/image_url
			},{
				where:{
					userId
				}
			})
			res.status(200).json({
				payload: [{
					userId,
					personalInfo
				}],
				errors: [],
				success: true,
			});
		} catch (err) {
			next(err)
		}
	}
}

module.exports = UserController;
