const express = require('express');
const { signup, signin, forgotPassword, verifyOTP, resetPassword, signupMain } = require('../controllers/auth.controller');
const { getAllUsers, deleteUser, deleteAllUsers, updateUser } = require('../controllers/user.controller');
const { getTodayeData } = require('../controllers/finalcaculation.controller');

const router = express.Router();




// =========== PUBLIC ROUTES (No Authentication Required) ===========
router.post('/main/signup', signupMain);
router.post('/signup', signup);

router.post('/signin', signin);
router.post('/forgotpassword', forgotPassword);
router.post('/verifyotp', verifyOTP);
router.post('/reset-password', resetPassword);


router.get('/getall', getAllUsers);
router.delete('/delete/:id', deleteUser);
router.delete('/deleteall', deleteAllUsers);
router.put('/update/:id', updateUser);
// router.post('/logout', logout);




router.get('/gettodaycalculation', getTodayeData);







module.exports = router;