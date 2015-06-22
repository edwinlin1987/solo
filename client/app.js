angular.module('myApp', ['scores', 'code', 'auth', 'side', 'top', 'game', 'end','ui.router'])

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
    })
    .state('gameEnd', {
      url: '/gameEnd',
      templateUrl: 'views/gameEnd.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    });
});