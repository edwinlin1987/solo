angular.module('auth', ['users'])

.controller('AuthController', function ($rootScope,$scope, $location, Users) {
  $scope.user = {};

  $scope.signin = function () {
    Users.signIn($scope.user)
      .then(function(user) {
        console.log(user.data);
        $rootScope.user = user.data;
        $location.path('/game');
      });
  };

  $scope.signup = function () {
    Users.addUser($scope.user)
      .then(function(user) {
        $rootScope.user = user.data;
        $location.path('#/signin');
      });
  };

});