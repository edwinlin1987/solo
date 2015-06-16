angular.module('game', ['scores', 'code'])

.controller('GameController', function ($location, $state, $rootScope,$scope, Scores, Codes, $stateParams) {
  
  $scope.load = function () {
    var func = Object.keys(Codes)[Math.floor(Math.random()*Object.keys(Codes).length)];
    $scope.start = "";
    $scope.end = Codes[func];
    $scope.function = func;
    $scope.chars = 0;
    $scope.mistakes = 0;
  };
  $scope.load();

  $scope.reload = function() {
    $scope.load();
    $state.transitionTo('game', {
        reload: true,
        inherit: false,
        notify: true
    });
  };

  var key;
  
  angular.element(document).on('keydown',function(event){
    angular.element(document.getElementsByClassName(''+event.keyCode)).addClass('down');
    if(event.keyCode === 8 && document.activeElement.nodeName !== 'INPUT'){ event.preventDefault();}
  });
  angular.element(document).on('keyup',function(event){
    angular.element(document.getElementsByClassName(''+event.keyCode)).removeClass('down');
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
      if ($scope.end.length === 0) {
        var username = 'guest';
        if ($rootScope.user) { username = $rootScope.user.username; }
        Scores.addScore({ username: username, function: $scope.function, wpm : $scope.wpm, chars : $scope.chars, mistakes: $scope.mistakes, time : new Date() - $scope.time });
        $rootScope.lastMistakes = $scope.mistakes;
        $rootScope.lastWPM = $scope.wpm;
        $rootScope.lastChars = $scope.chars;
        $scope.load();
        $state.transitionTo('gameEnd', {
            reload: true,
            inherit: false,
            notify: true
        });
      }
      $rootScope.$apply();
    }
  });
});