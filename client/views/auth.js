angular.module('auth', ['users'])

.controller('AuthController', function ($rootScope,$scope, $location, Users) {
  $scope.user = {};
  $scope.fail = false;

  $scope.signin = function () {
    Users.signIn($scope.user)
      .then(function(user) {
        $scope.fail = false;
        $rootScope.user = user.data;
        $location.path('/game');
      })
      .catch(function(){
        $scope.fail = true;
      });
  };

  $scope.signup = function () {
    Users.addUser($scope.user)
      .then(function(user) {
        $scope.fail = false;
        $rootScope.user = user.data;
        $location.path('/game');
      })
      .catch(function(){
        $scope.fail = true;
      });
  };

});