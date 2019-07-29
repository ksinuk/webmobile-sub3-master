var express = require('express');
var router = express.Router();

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

// router.get('/:id', function (req, res, next) {
//   var id = parseInt(req.params.id, 10)
//   var tt= tests.filter(function (test) {
//     return test.id === id
//   });
//   res.send(tt)
// });

module.exports = router;