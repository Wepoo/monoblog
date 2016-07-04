var app = angular.module('monoblog');
app.controller('MainCtrl', [
'$scope',
'posts',
'rubrics',
'$state',
'$uibModal',
'$log',
'Auth',
function($scope, posts, rubrics, $state, $uibModal, $log, Auth){
  $scope.posts = posts.posts;
  $scope.rubrics = rubrics.rubrics;
  $scope.signedIn = Auth.isAuthenticated;
  $scope.post_rubrics = {};
  $scope.post_rubrics.selected = {title: 'd2'};
  $scope.data = {
    rubric: $
  };

  // Pagination
  // $scope.itemsPerPage = 10;
  // $scope.currentPage = 1;

  // $scope.pageCount = function () {
  //   return Math.ceil($scope.posts.length / $scope.itemsPerPage);
  // };
  
  // $scope.posts.$promise.then(function () {
  //   $scope.totalItems = $scope.posts.length;
  //   $scope.$watch('currentPage + itemsPerPage', function() {
  //     var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
  //       end = begin + $scope.itemsPerPage;

  //     $scope.filteredFriends = $scope.posts.slice(begin, end);
  //   });
  // });

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({ 
      title: $scope.title,
      body: $scope.body
    });
    $scope.title = '';
    $scope.body = '';
    $scope.post_rubrics = '';
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
  $scope.isMyPosts = function(post){
    if (Auth._currentUser && Auth._currentUser.id == post.user.id ) {
      return true;
    } else {
      return false;
    }
  };
  $scope.isAdmin = function() {
    
    if (Auth._currentUser && Auth._currentUser.role == 'admin' ) {
      return true;
    } else {
      return false;
    }
  };
  $scope.openModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/modal/_rubricModalContent.html',
      controller: 'RubricCtrl'
    });
    modalInstance.result.then(function (title) {
      rubrics.create({ 
        title: title
      });
    });
  };

  $scope.$watch('selected_post_rubrics',function(newValue,oldValue){
    if (newValue && newValue!=oldValue){
      $scope.post_rubrics = $scope.selected_post_rubrics.value;

    }
  })
  
}]);
