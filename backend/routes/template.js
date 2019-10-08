var express = require('express');
var router = express.Router();

var csrfProtection = require(__dirname+"/../middleware/csrfProtection");
const templateController = require(__dirname+"/../controllers/templateController");

router.get('/getcsrftoken',[csrfProtection], templateController.getcsrftoken);

module.exports = router;