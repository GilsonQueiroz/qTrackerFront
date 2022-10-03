(function(){
    angular.module('primeiraApp').controller('GameSaveCtrl', [
        '$http',
        'msgs',
        'tabs',
        GameSaveController
    ])

    function GameSaveController($http, msgs, tabs) {

        const vm = this
        const url = 'http://localhost:3003/api'

        //save controllers
        vm.refreshSave = function() {
            const saveUrl = `${url}/save`
            $http.get(saveUrl).then(function(response) {
                vm.save = {}
                vm.saves = response.data
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }
        
        vm.create = function() {
            const createUrl = `${url}/save`
            $http.post(createUrl, vm.save).then(function(response) {
                vm.refreshSave()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabUpdate = function(save) {
            vm.save = save
            tabs.show(vm, {tabUpdate: true})
        }

        vm.update = function() {
            const updateUrl = `${url}/save/${vm.save._id}`
            $http.put(updateUrl, vm.save).then(function(response) {
                vm.refreshSave()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })

        }

        vm.showTabDelete = function(save) {
            vm.save = save
            tabs.show(vm, {tabDelete: true})
        }

        vm.delete = function() {
            const deleteUrl = `${url}/save/${vm.save._id}`
            $http.delete(deleteUrl, vm.save).then(function(response) {
                vm.refreshSave()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }
        //fim de save controllers

        //girl controllers
        vm.refreshGirl = function(save) {
            const girlUrl = `${url}/girl?slug=${save.slug}`
            $http.get(girlUrl).then(function(response) {
                vm.girl = {}
                vm.save = save
                vm.girls = response.data
                tabs.show(vm, {tabGirlList: true, tabGirlCreate: true})
            })
        }
        
        vm.girlCreate = function(save) {
            const createGirlUrl = `${url}/girl`
            vm.girl.slug = save.slug
            console.log(vm.girl)
            $http.post(createGirlUrl, vm.girl).then(function(response) {
                vm.refreshGirl(save)
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabGirlUpdate = function(girl) {
            vm.girl = girl
            tabs.show(vm, {tabGirlUpdate: true})
        }

        vm.girlUpdate = function(save) {
            const updateGirlUrl = `${url}/girl/${vm.girl._id}`
            $http.put(updateGirlUrl, vm.girl).then(function(response) {
                vm.refreshGirl(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })

        }

        vm.showTabGirlDelete = function(girl) {
            vm.girl = girl
            tabs.show(vm, {tabGirlDelete: true})
        }

        vm.girlDelete = function(save) {
            const deleteGirlUrl = `${url}/girl/${vm.girl._id}`
            $http.delete(deleteGirlUrl, vm.girl).then(function(response) {
                vm.refreshGirl(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }
        //fim de girl controllers

        vm.refreshSave()
    }
})()