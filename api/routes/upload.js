const router = require("express").Router();

const imageModel = require("../model/Photo");
const path = require("path");
const fs = require("fs");

const multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

router.post("/upload", upload.single("myImage"), (req, res) => {
  let img = fs.readFileSync(req.file.path);
  let encode_img = img.toString("base64");
  let final_img = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_img, "base64"),
  };
  imageModel.create(
    { final_img, name: "aaaaa", desc: encode_img },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        fs.writeFile(
          __dirname + "/uploads/upload.png",
          final_img.image,
          function (err) {
            console.log(err);
          },
        );

        console.log("Saved To database");
        res.contentType(final_img.contentType);
        res.status(200);
      }
    },
  );
});
module.exports = router;
