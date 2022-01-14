const errorHandler = (err, req, res, next) => {
	let statusCode = 500;
	let code = "ERR1111";
	let message = "Internal server error";
	let type = "Server Error";

	if (err.name === "VersionNotFound") {
		statusCode = 404;
		code = "ERR1000";
		message = "Version not found";
		type = "Not Found";
	} else if (err.name === "WrongPassword") {
		statusCode = 404;
		code = "ERR1101";
		message = "Wrong Password";
		type = "Not Match";
	} else if (err.name === "EmailNotRegistered") {
		statusCode = 404;
		code = "ERR1102";
		message = "Email Not Registered";
		type = "Not Found";
	} else if (err.name === "SequelizeValidationError") {
		statusCode = 400;
		if (err.errors[0].message === "wrong format email") {
			code = "ERR1001";
			message = "Email Not Match The Criteria";
			type = "Not Match";
		} else if (err.errors[0].message === "Validation is on password failed") {
			code = "ERR1002";
			message = "Password Not Match The Criteria";
			type = "Not Match";
		} else if (err.errors[0].message === "NotBeginWithZero") {
			code = "ERR1003";
			message = "Phone Number should start with 0";
			type = "Not Match";
		} else {
			code = "";
			message = err.errors[0].message;
			type = "";

		}
	} else if (err.name === "InvalidSignature") {
		statusCode = 403;
	} else if (err.name === "SequelizeUniqueConstraintError") {
		statusCode = 400;
		code = "";
		message = err.errors[0].message;
		type = "";
	} else if (err.name === "InvalidFileFormat") {
		statusCode = 400;
		code = "";
		message = "File Format Should Be MP4";
		type = "";
	} else if (err.name === "InvalidFileSize") {
		statusCode = 400;
		code = "";
		message = "File Size Should Not Exceeded 25MB";
		type = "";
	} else if (err.name === "InvalidInput") {
		statusCode = 401;
		code = "";
		message = "Invalid email/password";
		type = "";
	} else if (err.name === "ShopNotFound") {
		statusCode = 404;
		code = "";
		message = "Shop Not Found";
		type = "";
	}
	res.status(statusCode).json({
		payload: [],
		errors: [
			{
				code,
				message,
				type
			}
		],
		success: false,
	});
};

module.exports = errorHandler;
