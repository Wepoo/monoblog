angular.module('monoblog')
.controller('PostsCtrl', [
'$scope',
'posts',
'post',
'$state',
'Auth',
function($scope, posts, post, $state, Auth){
  $scope.post = post;
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post.id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.isMyPosts = function(post){
    if (Auth._currentUser && Auth._currentUser.id == post.user.id ) {
      return true;
    } else {
      return false;
    }
  };
}]);
