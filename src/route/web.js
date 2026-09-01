import express from "express";
import homeController from "../config/controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.get("/hello", (req, res) => {
    return res.send("Hello world with Nguyen Xuan An");
  });
  router.post("/post-crud", homeController.postCRUD);
  router.get('/get-crud', homeController.displayCRUD)
  return app.use("/", router);
};

module.exports = initWebRoutes;
