const express = require("express");
const { UserAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");

const profileRouter = express.Router();

profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile was updated`,
      data: loggedInUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
