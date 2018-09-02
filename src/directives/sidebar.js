function sidebar() {
  function ctrl($scope, sideBarSrvc) {
    function isShowing() {
      return sideBarSrvc.isShowing();
    }

    $scope.isShowing = isShowing;
  }
  return {
    scope: {},
    controller: ctrl,
    templateUrl: 'src/directives/templates/sidebar.html',
  };
}

exports.sidebar = sidebar;
