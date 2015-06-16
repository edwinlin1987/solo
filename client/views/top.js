angular.module('top', ['scores'])

.controller('TopController', function ($scope, Scores, Codes) {

  Scores.getScores().then(function(data) {
    $scope.scores = data;
  });
  $scope.count = 0;
  $scope.click = function() {
    $scope.count++;
    $scope.count = $scope.count % $scope.functions.length;
    $scope.display = $scope.functions[$scope.count];
  };
  $scope.functions = Object.keys(Codes);
  $scope.display = $scope.functions[$scope.count];

});