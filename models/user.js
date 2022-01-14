'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "email is required",
        },
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          args: true,
          msg: "wrong format email",
        },
      },
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "phoneNo is required",
        },
        notNull: {
          msg: "phoneNo is required",
        },
        initZero(value) {
          if (value[0] !== "0") {
            throw new Error("NotBeginWithZero");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
         // 8 char, contain at least 1 numeric, 1 upper and 1 lower
        notEmpty: {
          args: true,
          msg: "password is required",
        },
        notNull: {
          msg: "password is required",
        },
        // len: {
        //   args: [8],
        //   msg: "password's minimum length is 8",
        // },
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "userId is required",
        },
        notNull: {
          msg: "userId is required",
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};