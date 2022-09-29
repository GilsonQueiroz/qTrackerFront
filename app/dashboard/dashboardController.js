(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        "$http",
        DashboardController
    ])
    
    function DashboardController($http) {
        
        const vm = this
    
        vm.getGirls = function() {
            const url = 'http://localhost:3003/api/girl'
            $http.get(url).then(function(response) {
                vm.girls = [] = response.data
            })
        }

        vm.getGirls()

        vm.getItens = function() {
            const url = 'http://localhost:3003/api/varsave'
            $http.get(url).then(function(response) {
                vm.itens = [] = response.data
            })
        }

        vm.getItens()

    }
})()
