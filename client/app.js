angular.module('myApp', ['scores', 'code', 'auth', 'side', 'top', 'game', 'ui.router'])

.config(function($urlRouterProvider, $httpProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/game')
  $stateProvider
    .state('game', {
      url: '/game',
      templateUrl: '/views/game.html',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signin.html',
    });
});