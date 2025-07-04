const express = require('express');
const router = express.Router();

const signupModule = require('./profiles/signup');



// Import all profile functions
const signup = signupModule.signup;
console.log('logs:', typeof signup)
// throw Error(`logs: typeof functions is : ${typeof signup}`)

// const signup = require('./profiles/signup');
// const signin = require('./profiles/signin');
// const googleAuth = require('./profiles/googleAuth');
// const uploadAvatar = require('./profiles/uploadAvatar');
// const getSession = require('./profiles/getSession');
// const logout = require('./profiles/logout');
// const getUser = require('./profiles/getUser');
// const sendVerificationEmail = require('./profiles/sendVerificationEmail');
// const verifyEmail = require('./profiles/verifyEmail');
// const createUserProfile = require('./profiles/createUserProfile');
// const getUserProfile = require('./profiles/getUserProfile');
// const updateUserProfile = require('./profiles/updateUserProfile');
// const deleteUserProfile = require('./profiles/deleteUserProfile');
// const listUserProfiles = require('./profiles/listUserProfiles');

// Route definitions
 router.post('/signup', signup);
// router.post('/signin', signin);
// router.get('/google-auth', googleAuth);
// router.post('/upload-avatar', uploadAvatar);
// router.get('/session', getSession);
// router.post('/logout', logout);
// router.get('/user', getUser);
// router.post('/send-verification-email', sendVerificationEmail);
// router.post('/verify-email', verifyEmail);
// router.post('/profile', createUserProfile);
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);
// router.delete('/profile', deleteUserProfile);
// router.get('/profiles', listUserProfiles);

module.exports = router;
