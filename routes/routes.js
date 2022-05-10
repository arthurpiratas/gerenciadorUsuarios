var express = require("express")
var app = express()
var router = express.Router()
var HomeController = require("../controllers/HomeController")
var UserController = require("../controllers/UserController")
var PassTokenController = require("../controllers/PassTokenController")

router.get('/', HomeController.index)
router.post('/user', UserController.create)
router.get('/users', UserController.listAll)
router.get('/user/:id', UserController.listForId)
router.put('/user/', UserController.edit)
router.delete('/user/:id', UserController.delete)
router.post('/recoverpassword', PassTokenController.recoverPassword)
router.post('/changepassword', PassTokenController.changePassword)

module.exports = router;