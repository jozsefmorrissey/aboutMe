import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Directives
import { navbar } from './src/directives/navbar';
import { sidebar } from './src/directives/sidebar';
import { chain } from './src/directives/chain';
import { drawBridge } from './src/directives/drawBridge';
import { expandableRepeat } from './src/directives/expandableRepeat';

import { projectsSrvc } from './src/services/projectsSrvc';
import { encryptionSrvc } from './src/services/encryptionSrvc';
import { sideBarSrvc } from './src/services/sideBarSrvc';

// Extra Controllers
import { dummyCtrl } from './src/controller/dummy';
import { encryptionCtrl } from './src/controller/encryption';


// View Controllers
import { homeCtrl } from './src/views/home/home';
import { inspirationCtrl } from './src/views/inspiration/inspiration';
import { otherCtrl } from './src/views/other/other';
import { programmingCtrl } from './src/views/programming/programming';
import { projectCtrl } from './src/views/project/project';

const ctrls = {};
ctrls.home = homeCtrl;
ctrls.inspiration = inspirationCtrl;
ctrls.other = otherCtrl;
ctrls.programming = programmingCtrl;

const app = angular.module('routerApp', [uiRouter])
  .directive('navbar', navbar)
  .directive('sidebar', sidebar)
  .directive('chain', chain)
  .directive('drawBridge', drawBridge)
  .directive('expandableRepeat', expandableRepeat)
  .service('projectsSrvc', projectsSrvc)
  .service('encryptionSrvc', encryptionSrvc)
  .service('sideBarSrvc', sideBarSrvc)
  .controller('encryptionCtrl', encryptionCtrl)
  .controller('dummyCtrl', dummyCtrl);


function buildViews($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('project', {
    url: '/project/:title',
    templateUrl: 'src/views/project/project.html',
    controller: projectCtrl,
  });

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

  $stateProvider
  .state('other.encryption', {
    url: '/encryption',
    templateUrl: 'src/views/other/encryption/encryption.html',
    controller: encryptionCtrl,
  });

  $urlRouterProvider.otherwise('/home');
}

function stateChange($rootScope, $transitions, sideBarSrvc) {
  const sidebarRegex = [
    /other.*/,
  ];

  function alert(transition) {
    // alert('hi');
    sideBarSrvc.hideBar();

    for (let index = 0; index < sidebarRegex.length; index += 1) {
      if (transition.to().name.match(sidebarRegex[index])) {
        sideBarSrvc.showBar();
      }
    }
  }
  // $rootScope.$on("$stateChangeStart", alert);

  $transitions.onStart({}, alert);
}

app.config(buildViews);
app.run(stateChange);
