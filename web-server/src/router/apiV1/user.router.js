import express from "express";

import throwRPCErrors from "../../utils/throwRPCErrors";
import handleRPCRes from "../../utils/handleRPCRes";
import { userService } from "../../config/serviceClient.config";

const router = express.Router();

router.post("/signup", (req, res) => {
  const credentials = req.body;
  userService.request("signUpUser", credentials, (err, response) => {
    if (err) {
      throwRPCErrors(err, res);
    } else {
      handleRPCRes(response, res);
    }
  });
});

router.post("/signin", (req, res) => {
  const credentials = req.body;
  userService.request("signInUser", credentials, (err, response) => {
    if (err) {
      throwRPCErrors(err, res);
    } else {
      handleRPCRes(response, res);
    }
  });
});

router.get("/auth", (req, res) => {
  const { user } = req;
  if (user) {
    userService.request("tryAutoSignIn", user, (err, response) => {
      if (err) {
        throwRPCErrors(err, res);
      } else {
        handleRPCRes(response, res);
      }
    });
  } else
    res.status(403).send({
      meta: {
        type: "failed",
        status: 403,
        message: "not authenticated"
      }
    });
});

export default router;
