const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).any();

const { BUCKET } = require("../firebaseAdmin");

router.post("/image", (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }

        // read file
        const file_list = req.files;
        console.log("file_list : ", file_list);

        if (file_list.length === 0) {
            res.status(400).json({ error: "no file" });
            return;
        }

        // firebase storage
        const file_to_up = BUCKET.file(file_list[0].originalname); // file 매서드로 file이름 지정
        file_to_up.save(file_list[0].buffer)
            .then(() => {
                res.status(200).json({ msg: "file uploaded" });
                return;
            })
            .catch(err => {
                res.status(500).json({ error: err.toString() });
                return;
            });
    });
});

module.exports = router;
