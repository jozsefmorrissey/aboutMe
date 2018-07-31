import angular from 'angular';
import uiRouter from 'angular-ui-router';

import { navbar } from './src/directives/navbar';

import { projectsSrvc } from './src/services/projectsSrvc';

import { homeCtrl } from './src/views/home/home';
import { inspirationCtrl } from './src/views/inspiration/inspiration';
import { otherCtrl } from './src/views/other/other';
import { programmingCtrl } from './src/views/programming/programming';
import { projectCtrl } from './src/views/project/project';

const ctrls = {};
ctrls.project = projectCtrl;
ctrls.home = homeCtrl;
ctrls.inspiration = inspirationCtrl;
ctrls.other = otherCtrl;
ctrls.programming = programmingCtrl;

const app = angular.module('routerApp', [uiRouter])
  .directive('navbar', navbar)
  .service('projectsSrvc', projectsSrvc);

function buildViews($stateProvider, $urlRouterProvider) {
  const ctrlKeys = Object.keys(ctrls);
  for (let index = 0; index < ctrlKeys.length; index += 1) {
    const key = ctrlKeys[index];
    $stateProvider
      .state(`${key}`, {
        url: `/${key}`,
        templateUrl: `src/views/${key}/${key}.html`,
        controller: ctrls[key],
      });
  }

  $urlRouterProvider.otherwise('/home');
}


app.config(buildViews);
