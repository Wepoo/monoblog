angular.module('monoblog')
.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({ 
      title: $scope.title,
      body: $scope.body
    });
    $scope.title = '';
    $scope.body = '';
  };
  $scope.updatePost = function(post){
    $('#post_'+ post.id).prop("disabled", false);
    posts.update({
      title: post.title,
      body: post.body
    }, post.id);
  };
  $scope.deletePost = function(post){
    posts.delete(post);
  };
  $scope.update = function(){
    $('#post_'+this.post.id).prop("disabled", false);
  };
}]);
