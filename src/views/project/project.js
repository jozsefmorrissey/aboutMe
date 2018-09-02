exports.projectCtrl = ($scope, $stateParams, projectsSrvc) => {
  let currTech;

  function toHtmlName(string) {
    return string.replace(/_|([a-z])([A-Z])| /g, '$1-$2').toLowerCase();
  }

  function setProject() {
    $scope.project = projectsSrvc.getProject($stateParams.title);
    $scope.filename = toHtmlName($scope.project.project);
  }

  function techInfoToggle(tech) {
    if (tech === undefined || (tech === currTech && $scope.showTechInfo)) {
      $scope.showTechInfo = false;
    } else {
      $scope.showTechInfo = true;
      $scope.techFilename = toHtmlName(tech);
      currTech = tech;
    }
  }

  projectsSrvc.loadProjects().then(setProject);

  $scope.setProject = setProject;
  $scope.techInfoToggle = techInfoToggle;
};
