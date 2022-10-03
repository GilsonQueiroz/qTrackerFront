(function(){
    angular.module('primeiraApp').factory('tabs', [TabsFactory])

    function TabsFactory() {

        function show(owner, {
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false,
            tabGirlList = false,
            tabGirlCreate = false,
            tabGirlUpdate = false,
            tabGirlDelete = false
        }) {
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
            owner.tabGirlList = tabGirlList
            owner.tabGirlCreate = tabGirlCreate
            owner.tabGirlUpdate = tabGirlUpdate
            owner.tabGirlDelete = tabGirlDelete
        }
    
        return { show }
    }
})()