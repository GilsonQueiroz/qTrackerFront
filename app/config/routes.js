angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard?page",
      templateUrl: "dashboard/dashtabs.html"
    }).state('gameSave', {
      url: "/gameSave?page",
      templateUrl: "gameSave/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
  }
])
