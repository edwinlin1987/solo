angular.module('scores', [])

.factory('Scores', function ($http) {

  var getScores = function () {
    return $http({
    method: 'GET',
    url: '/scores',
    }).then(function(resp) {
      return resp.data;
    });
  };

  var addScore = function (scores) {
    return $http({
    method: 'POST',
    url: '/scores',
    data : scores
    });
  };

  return {
    getScores: getScores,
    addScore: addScore
  };
});