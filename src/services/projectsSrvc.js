exports.projectsSrvc = ($http, $q) => {
  const obj = {};
  const projDefer = $q.defer();
  let projects;
  let currProject;

  function resolve(res) {
    projects = res.data;
    currProject = projects[0];
    projDefer.resolve();
  }

  function loadProjects() {
    return projDefer.promise;
  }

  function getProjects() {
    if (projects === undefined) {
      return undefined;
    }

    return JSON.parse(JSON.stringify(projects));
  }

  function setProject(index) {
    currProject = JSON.parse(JSON.stringify(projects[index]));
  }

  function getCurrProject() {
    return currProject;
  }

  $http.get('/resources/json/projects.json').then(resolve);
  obj.getCurrProject = getCurrProject;
  obj.setProject = setProject;
  obj.loadProjects = loadProjects;
  obj.getProjects = getProjects;
  return obj;
};
