angular.module('monoblog')
.factory('posts', [
'$http',
function($http){
  var o = {
    posts: []
  };
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      data.forEach(function(post){
        o.posts[post.id] = post;
      });
    });
  };
  o.create = function(post) {
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    });
  };
  o.delete = function(post) {
    return $http.delete('/posts/' + post.id)
      .success(function(data){
        o.posts.slice(post.id, 1);
      });
  };
  o.update = function(post, id) {
    return $http.put('/posts/' + id, post)
      .success(function(data){
        post.upvotes += 1;
      });
  };
  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  };
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  };
  return o;
}]);
