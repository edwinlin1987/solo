angular.module('game', ['scores', 'code'])

.controller('GameController', function ($scope, Scores, Codes) {
  var func = Object.keys(Codes)[Math.floor(Math.random()*Object.keys(Codes).length)];
  $scope.start = "";
  $scope.end = Codes[func];
  $scope.data = {
    'function': func,
    'chars' : 0,
    'mistakes' : 0
  };
  var key;
  
  $(document).on('keydown',function(event){
    if(event.keyCode === 8){ event.preventDefault();}
  });
  angular.element(document).bind('keypress', function(event) {
    event.preventDefault();
    var next = function () {
      $scope.start = $scope.start + $scope.end[0];
      $scope.end = $scope.end.slice(1);
    };
    if (!$scope.start) { $scope.time = new Date();}
    key = event.keyCode;
    if ($scope.end.charCodeAt(0) === key) {
      next();
      $scope.data.chars++;
      $scope.wpm = Math.round(($scope.data.chars * 12000)/(new Date() - $scope.time));
    } else if ($scope.end.charCodeAt(0) === 10 && key === 13) {
      next();
      while ($scope.end.charCodeAt(0) === 32) {
        next();
      }
      $scope.data.chars++;
      $scope.wpm = (($scope.data.chars * 12000)/(new Date() - $scope.time)).toFixed(2);
    } else {
      // $scope.data[key] = $scope.data[key] || 0;
      // $scope.data[key]++;
      $scope.data.mistakes++;
    }
    if (!$scope.end.length) {
      Scores.addScore({ wpm : $scope.wpm, data: $scope.data, time : new Date() - $scope.time });
    }
    $scope.$apply();
  });
});