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
            tabGirlDelete = false,
            tabTimeList = false,
            tabTimeCreate = false,
            tabTimeUpdate = false,
            tabTimeDelete = false,
            tabVarList = false,
            tabVarCreate = false,
            tabVarUpdate = false,
            tabVarDelete = false,
            tabTaskList = false,
            tabTaskCreate = false,
            tabTaskUpdate = false,
            tabTaskDelete = false
        }) {
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
            owner.tabGirlList = tabGirlList
            owner.tabGirlCreate = tabGirlCreate
            owner.tabGirlUpdate = tabGirlUpdate
            owner.tabGirlDelete = tabGirlDelete
            owner.tabTimeList = tabTimeList
            owner.tabTimeCreate = tabTimeCreate
            owner.tabTimeUpdate = tabTimeUpdate
            owner.tabTimeDelete = tabTimeDelete
            owner.tabVarList = tabVarList
            owner.tabVarCreate = tabVarCreate
            owner.tabVarUpdate = tabVarUpdate
            owner.tabVarDelete = tabVarDelete
            owner.tabTaskList = tabTaskList
            owner.tabTaskCreate = tabTaskCreate
            owner.tabTaskUpdate = tabTaskUpdate
            owner.tabTaskDelete = tabTaskDelete
        }
    
        return { show }
    }
})()