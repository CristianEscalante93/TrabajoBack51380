const multer= require("multer") ;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });

const path= require("path");
const fileURLToPath = require("url");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

module.exports = {uploader,path,__dirname,__filename,fileURLToPath};