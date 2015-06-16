angular.module('users', [])

.factory('Users', function ($http) {

  var signIn = function (user) {
    return $http({
    method: 'POST',
    url: '/signin',
    data: user
    });
  };

  var addUser = function (user) {
    return $http({
    method: 'POST',
    url: '/signup',
    data : user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    signIn: signIn,
    addUser: addUser
  };
});