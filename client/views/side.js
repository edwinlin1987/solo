angular.module('side', [])


.controller('SideController', function ($scope, Scores) {
  Scores.getScores().then(function(data) {
    $scope.scores = data;
  });
});