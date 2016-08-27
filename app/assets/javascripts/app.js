angular.module('monoblog', ['ui.router', 'ui.select', 'ngSanitize', 'templates', 'Devise', 'ui.bootstrap'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }],
        rubrics: ['rubrics', function(rubrics) {
          return rubrics.getAll();
        }]
      },
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){}, function(error) {
          $state.go('home');
        });
      }]
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'views/_post.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/_login.html',
      controller: 'AuthCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });
  $urlRouterProvider.otherwise('home');
}]);
