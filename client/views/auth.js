angular.module('auth', ['users'])

.controller('AuthController', function ($rootScope,$scope, $location, Users) {
  $scope.user = {};

  $scope.signin = function () {
    Users.signIn($scope.user)
      .then(function() {
        $rootScope.user = $scope.user;
        $location.path('/game');
      });
  };

  $scope.signup = function () {
    Users.addUser($scope.user)
      .then(function() {
        $rootScope.user = $scope.user;
        $location.path('#/signin');
      });
  };

});