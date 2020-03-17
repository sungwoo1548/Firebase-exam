const express = require("express");
const router = express.Router();

const admin = require("../firebaseAdmin");
const storage = admin.storage();

router.post("/", (req, res) => {
    /**
     * 업로드 프로세스.....
     */
});

module.exports = router;