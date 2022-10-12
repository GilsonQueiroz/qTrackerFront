(function(){
    angular.module('primeiraApp').factory('tabsDash', [TabsDashFactory])

    function TabsDashFactory() {

        function show(owner, {
            tabGames = false,
            tabDash = false
        }) {
            owner.tabGames = tabGames
            owner.tabDash = tabDash
        }
    
        return { show }
    }
})()