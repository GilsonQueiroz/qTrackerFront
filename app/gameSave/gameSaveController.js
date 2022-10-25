(function(){
    angular.module('primeiraApp').controller('GameSaveCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        GameSaveController
    ])

    function GameSaveController($http, $location, msgs, tabs) {

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

        //time controllers
        vm.refreshTime = function(save) {
            const timeUrl = `${url}/timeplay?slug=${save.slug}`
            $http.get(timeUrl).then(function(response) {
                vm.timeplay = {}
                vm.save = save
                vm.timeplays = response.data
                tabs.show(vm, {tabTimeList: true, tabTimeCreate: true})
            })
        }
        
        vm.timeCreate = function(save) {
            const createTimeUrl = `${url}/timeplay`
            vm.timeplay.slug = save.slug
            $http.post(createTimeUrl, vm.timeplay).then(function(response) {
                vm.refreshTime(save)
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabTimeUpdate = function(timeplay) {
            vm.timeplay = timeplay
            tabs.show(vm, {tabTimeUpdate: true})
        }

        vm.timeUpdate = function(save) {
            const updateTimeUrl = `${url}/timeplay/${vm.timeplay._id}`
            $http.put(updateTimeUrl, vm.timeplay).then(function(response) {
                vm.refreshTime(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabTimeDelete = function(timeplay) {
            vm.timeplay = timeplay
            tabs.show(vm, {tabTimeDelete: true})
        }

        vm.timeDelete = function(save) {
            const deleteTimeUrl = `${url}/timeplay/${vm.timeplay._id}`
            $http.delete(deleteTimeUrl, vm.timeplay).then(function(response) {
                vm.refreshTime(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }
        //fim de time controllers

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

        //varsave controllers
        vm.refreshVar = function(save) {
            const varUrl = `${url}/varsave?slug=${save.slug}`
            $http.get(varUrl).then(function(response) {
                vm.varsave = {}
                vm.save = save
                vm.varsaves = response.data
                tabs.show(vm, {tabVarList: true, tabVarCreate: true})
            })
        }
        
        vm.varCreate = function(save) {
            const createVarUrl = `${url}/varsave`
            vm.varsave.slug = save.slug
            $http.post(createVarUrl, vm.varsave).then(function(response) {
                vm.refreshVar(save)
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabVarUpdate = function(varsave) {
            vm.varsave = varsave
            tabs.show(vm, {tabVarUpdate: true})
        }

        vm.varUpdate = function(save) {
            const updateVarUrl = `${url}/varsave/${vm.varsave._id}`
            $http.put(updateVarUrl, vm.varsave).then(function(response) {
                vm.refreshVar(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })

        }

        vm.showTabVarDelete = function(varsave) {
            vm.varsave = varsave
            tabs.show(vm, {tabVarDelete: true})
        }

        vm.varDelete = function(save) {
            const deleteVarUrl = `${url}/varsave/${vm.varsave._id}`
            $http.delete(deleteVarUrl, vm.varsave).then(function(response) {
                vm.refreshVar(save)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }
        //fim de varsave controllers

        //Task controllers
        vm.paginator = function(totalPages, page){
            const pages = parseInt(totalPages) || 1
            vm.pagesArray = Array(pages).fill(0).map((e, i) => i+1)
            
            vm.page = parseInt(page) || 1
            vm.needPagination = pages > 1
            vm.hasPrev = vm.page > 1
            vm.hasNext = vm.page < pages

            vm.isCurrent = function(i) {
                return vm.page == i
            }
        }

        vm.refreshTask = function(save, page) {
            vm.page = page
            const taskUrl = `${url}/task?slug=${save.slug}&sort=codTask&skip=${(page - 1) * 15}&limit=15`
            const timeUrl = `${url}/timeplay?slug=${save.slug}`
            $http.get(taskUrl).then(function(response) {
                vm.task = { timeLocals: [{}], requirements: [{}], girlUpdates: [{}], varUpdates: [{}] }
                vm.save = save
                vm.tasks = response.data
                $http.get(timeUrl).then(function(response) { 
                    vm.timeplays = response.data
                })

                $http.get(`${url}/task/count?slug=${save.slug}`).then(function(response){
                    vm.pages = Math.ceil(response.data.value / 15)
                    vm.paginator(vm.pages, vm.page)
                    tabs.show(vm, {tabTaskList: true, tabTaskCreate: true})
                })
            })
        }
        
        vm.taskCreate = function(save) {
            const createTaskUrl = `${url}/task`
            vm.task.slug = save.slug
            $http.post(createTaskUrl, vm.task).then(function(response) {
                vm.refreshTask(save, 1)
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showTabTaskUpdate = function(task) {
            vm.task = task
            tabs.show(vm, {tabTaskUpdate: true})
        }

        vm.taskUpdate = function(save) {
            const updateTaskUrl = `${url}/task/${vm.task._id}`
            $http.put(updateTaskUrl, vm.task).then(function(response) {
                vm.refreshTask(save, 1)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })

        }

        vm.showTabTaskDelete = function(task) {
            vm.task = task
            tabs.show(vm, {tabTaskDelete: true})
        }

        vm.taskDelete = function(save) {
            const deleteTaskUrl = `${url}/task/${vm.task._id}`
            $http.delete(deleteTaskUrl, vm.task).then(function(response) {
                vm.refreshTask(save, 1)
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.addDate = function(index){
            vm.task.timeLocals.splice(index + 1, 0, {})
        }

        vm.cloneDate = function(index, {time, local}){
            time += 1
            vm.task.timeLocals.splice(index + 1, 0, {time, local})
        }

        vm.deleteDate = function(index){
            if (vm.task.timeLocals.length > 1) {
                vm.task.timeLocals.splice(index, 1)
            }
        }

        vm.addReq = function(index){
            vm.task.requirements.splice(index + 1, 0, {})
        }

        vm.cloneReq = function(index, {codTask, taskComplete}){
            vm.task.requirements.splice(index + 1, 0, {codTask, taskComplete})
        }

        vm.deleteReq = function(index){
            if (vm.task.requirements.length > 1) {
                vm.task.requirements.splice(index, 1)
            }
        }
        //fim de tasks controllers

        vm.refreshSave()
    }
})()