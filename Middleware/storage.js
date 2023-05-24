const multer = require('multer');

export var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/banner');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});

var upload = multer({ storage: storage });