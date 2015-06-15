angular.module('top', ['scores'])

.controller('TopController', function ($scope, Scores) {

  Scores.getScores().then(function(data) {
    $scope.scores = data;
  });

});