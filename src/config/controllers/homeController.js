import db from "../../models/index.js";
import CRUDService from "../../services/CRUDService.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data,
    });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = async (req, res) => {
  try {
    let data = await db.user.findAll();
    return res.render("homepage.ejs");
  } catch (e) {
    console.log(e);
  }
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log("------------");
  console.log(data);
  console.log("------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    //check user data not found
    return res.render('test/editCRUD.ejs');
  } else {
    return res.send("User not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  getEditCRUD: getEditCRUD,
};
