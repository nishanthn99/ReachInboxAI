const express = require("express");
const router = express.Router();
const { getDrafts, readMail, getMails, createLabel, getLabel } = require("../controller/messageController");
const { sendMailViaQueue,sendMultipleEmails } = require("../controller/messageQueue")
const { redisGetToken } = require("../middleware/redis");
const { sendMail, getUser }  = require("./googleauth")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/userInfo/:email", getUser);

router.post("/sendMail/:email", async (req, res) => {
  try {
    const token = await redisGetToken(req.params.email);
    const result = await sendMail(req.body, token);
    res.status(200).json({ message: "Email sent successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/allDrafts/:email", getDrafts);
router.get("/read/:email/message/:message", readMail);
router.get("/list/:email", getMails);


router.post("/sendone/:email/:id", sendMailViaQueue);
router.post("/sendMultiple/:id", sendMultipleEmails);
router.post("/createLabel/:email", createLabel )
router.get("/getLabel/:email/:id", getLabel )
router.post('api/mail/sendMail',sendMail)
module.exports = router;