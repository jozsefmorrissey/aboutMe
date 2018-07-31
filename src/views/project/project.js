exports.projectCtrl = ($scope, projectsSrvc) => {
  $scope.project = projectsSrvc.getCurrProject();
  let currTech;

  function toHtmlName(string) {
    return string.replace(/_|([a-z])([A-Z])| /g, '$1-$2').toLowerCase();
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

  $scope.techInfoToggle = techInfoToggle;
  $scope.filename = toHtmlName($scope.project.project);
};
