exports.programmingCtrl = ($scope, $http, projectsSrvc) => {
  $scope.msg = 'programming';

  function loadProjects() {
    $scope.projects = projectsSrvc.getProjects();
    $scope.filters = Object.keys($scope.projects[0]);
    $scope.displayPrograms = $scope.projects;
  }

  function uncheckAll() {
    $('#all-filter').prop('checked', false);
  }

  function clickedAll() {
    const allChecked = $('#all-filter').prop('checked');
    function setChecked() {
      $(this).prop('checked', allChecked);
    }

    $('.search-filter').each(setChecked);
  }

  function setProject(index) {
    projectsSrvc.setProject(index);
  }

  $scope.setProject = setProject;
  $scope.clickedAll = clickedAll;
  $scope.uncheckAll = uncheckAll;
  projectsSrvc.loadProjects().then(loadProjects);
};
