angular.module('monoblog')
.controller('RubricCtrl', function ($scope, $uibModalInstance) {
  $scope.data = {
    title: ''
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.title);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
