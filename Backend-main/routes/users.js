const express = require("express");
const router = express.Router();
const userService = require("../services/UserService");
//const adminService = require("")

const apiConfig = require("./assets/api.json");
const { authenticateToken, authorize } = require("./assets/middleware");
const { crearMiddlewareCarga } = require("../controls/utilities/multerConfig");

const subirSolicitud = crearMiddlewareCarga("solicitudes");

apiConfig.forEach((route) => {
  const { type, models } = route;
  switch (type) {
    case "get_without_token":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.get(url, (req, res) => {
            userService.get_without_token(req, res, model.model);
          });
        });
      });
      break;
    case "get":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.get(url, authenticateToken, (req, res) => {
            userService.get(req, res, model.model);
          });
        });
      });
      break;
    case "post":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.post(url, authenticateToken, (req, res) => {
            userService.post(req, res, model.model);
          });
        });
      });
      break;
    case "post_without_token":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.post(
            url,
            subirSolicitud.single("description_pdf"),
            (req, res) => {
              userService.post_without_token(req, res, model.model);
            }
          );
        });
      });
      break;
    case "post_url":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.post(url, authenticateToken, authorize, (req, res) => {
            userService.post(req, res, model.model);
          });
        });
      });
      break;
    case "delete":
      models.forEach((model) => {
        model.urls.forEach((url) => {
          router.delete(url, authenticateToken, (req, res) => {
            userService.delete(req, res, model.model);
          });
        });
      });
      break;
    default:
      break;
  }
});

module.exports = router;
