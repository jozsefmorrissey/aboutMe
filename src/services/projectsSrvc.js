exports.projectsSrvc = ($http, $q) => {
  const obj = {};
  const projDefer = $q.defer();
  let projects;
  const projectMap = {};
  let currProject;

  function resolve(res) {
    for (let index = 0; index < res.data.length; index += 1) {
      const project = res.data[index];
      projectMap[project.project] = project;
    }
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

  function getProject(title) {
    return projectMap[title];
  }

  $http.get('/resources/json/projects.json').then(resolve);
  obj.getProject = getProject;
  obj.getCurrProject = getCurrProject;
  obj.setProject = setProject;
  obj.loadProjects = loadProjects;
  obj.getProjects = getProjects;
  return obj;
};
