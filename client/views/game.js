angular.module('game', ['scores', 'code'])

.controller('GameController', function ($state,$rootScope,$scope, Scores, Codes) {
  var func = Object.keys(Codes)[Math.floor(Math.random()*Object.keys(Codes).length)];
  
  $scope.load = function () {
    $scope.start = "";
    $scope.end = Codes[func];
    $scope.user = 'anon';
    $scope.function = func;
    $scope.chars = 0;
    $scope.mistakes = 0;
  };

  var key;
  
  angular.element(document).on('keydown',function(event){
    if(event.keyCode === 8 && document.activeElement.nodeName !== 'INPUT'){ event.preventDefault();}
  });
  angular.element(document).on('keypress', function(event) {
    if (document.activeElement.nodeName !== 'INPUT') {
      event.preventDefault();
      var next = function () {
        $scope.start = $scope.start + $scope.end[0];
        $scope.end = $scope.end.slice(1);
      };
      if (!$scope.start) { $scope.time = new Date();}
      key = event.keyCode;
      if ($scope.end.charCodeAt(0) === key) {
        next();
        $scope.chars++;
        $scope.wpm = Math.round(($scope.chars * 12000)/(new Date() - $scope.time));
      } else if ($scope.end.charCodeAt(0) === 10 && key === 13) {
        next();
        while ($scope.end.charCodeAt(0) === 32) {
          next();
        }
        $scope.chars++;
        $scope.wpm = (($scope.chars * 12000)/(new Date() - $scope.time)).toFixed(2);
      } else {
        // $scope[key] = $scope[key] || 0;
        // $scope[key]++;
        $scope.mistakes++;
      }
      $scope.$apply();
      if (!$scope.end.length) {
        var username = 'guest';
        if ($rootScope.user) { username = $rootScope.user.username; }
        Scores.addScore({ username: username, function: $scope.function, wpm : $scope.wpm, chars : $scope.chars, mistakes: $scope.mistakes, time : new Date() - $scope.time });
        alert("YOU FINISHED! You typed at " + $scope.wpm + " words per minute and made " + $scope.mistakes + " mistake(s). Play again?");
        $state.reload(true);
        $scope.load();
      }
    }
  });
  $scope.load();
});