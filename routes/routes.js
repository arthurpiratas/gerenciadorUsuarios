var express = require("express")
var app = express()
var router = express.Router()
var HomeController = require("../controllers/HomeController")
var UserController = require("../controllers/UserController")
var PassTokenController = require("../controllers/PassTokenController")
var AdmionAuth = require("../middleware/AdminAuth")

router.get('/', HomeController.index)
router.post('/user',AdmionAuth, UserController.create)
router.get('/users',AdmionAuth, UserController.listAll)
router.get('/user/:id',AdmionAuth, UserController.listForId)
router.put('/user/',AdmionAuth, UserController.edit)
router.delete('/user/:id',AdmionAuth, UserController.delete)
router.post('/recoverpassword', PassTokenController.recoverPassword)
router.post('/changepassword', PassTokenController.changePassword)
router.post('/login', UserController.login)

module.exports = router;