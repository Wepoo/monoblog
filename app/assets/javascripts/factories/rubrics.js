angular.module('monoblog')
.factory('rubrics', [
'$http',
function($http){
  var o = {
    rubrics: []
  };
  o.getAll = function() {
    return $http.get('/rubrics.json').success(function(data){
      data.forEach(function(rubric){
        o.rubrics[rubric.id] = rubric;
      });
    });
  };
  o.create = function(rubric) {
    return $http.post('/rubrics.json', rubric).success(function(data){
      o.rubrics.push(data);
    });
  };
  return o;
}]);
