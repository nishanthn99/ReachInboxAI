const express = require("express");
const router = express.Router();
const {
  getDrafts,
  readMail,
  getMails,
  
} = require("../controller/emailController");
const {sendMailViaQueue,
  sendMultipleEmails,} = require("../controllers/oauthController")
const {sendMail, getUser}  = require("./googleauth")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/userInfo/:email", getUser);

router.post("/sendMail", async (req, res) => {
  try {
    const result = await sendMail(req.body);
    res.status(200).json({ message: "Email sent successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/allDrafts/:email", getDrafts);
router.get("/read/:email/message/:message", readMail);
router.get("/list/:email", getMails);


router.post("/sendone/:id", sendMailViaQueue);
router.post("/sendMultiple/:id", sendMultipleEmails);


module.exports = router;