import db from "../../models/index.js";

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
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
};
