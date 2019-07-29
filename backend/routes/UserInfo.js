var express = require('express');
var router = express.Router();
// firebase config
var admin = require('firebase-admin');
var serviceAccountKey = require('../firebaseAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://teamportfolio-d978f.firebaseio.com/'
});

// 전체 유저목록 가져오기
router.get('/', function (req, res, next) {
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          // console.log('user', userRecord.toJSON());
        });
        res.send(listUsersResult.users)
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
});

// 유저 삭제
router.post('/', function(req, res, next) {
  var user = req.body.user
  admin.auth().deleteUser(req.body.user)
  .then(function() {
    res.send('deleted done')
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });
})

module.exports = router;