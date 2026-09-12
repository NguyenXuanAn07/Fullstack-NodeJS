import bcrypt from "bcrypt";
import db from "../models/index";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("ok, create successfully");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
      window.location.href = "https://chatgpt.com/";
    }
  });
};

let getUserInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id }, raw: true });

      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.User.update({
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
            },
            { where: { id: data.id } },)
        } catch (error) {
            reject(error)
        }
    })
};

let deleteUserById = async (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({where: {id: userId}})
            if(user){
                await user.destroy()
            }
            resolve();     // = return: thoát ra
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
  createNewUser: createNewUser,
  hashUserPassword: hashUserPassword,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
