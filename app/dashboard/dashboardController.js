(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        "$http",
        "$location",
        "tabsDash",
        "msgs",
        DashboardController
    ])
    
    function DashboardController($http, $location, tabsDash, msgs) {
        
        const vm = this
        const url = 'http://localhost:3003/api'
        
        vm.gamelist = function() {
            const saveUrl = `${url}/save`
            $http.get(saveUrl).then(function(response) {
                vm.save = {}
                vm.saves = response.data
                tabsDash.show(vm, {tabGames: true })
            })
        }

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

        vm.dashboard = function(save, page) {
            vm.save = save
            vm.page = page
            const timeUrl = `${url}/timeplay?slug=${save.slug}`
            const girlUrl = `${url}/girl?slug=${save.slug}`
            const varUrl = `${url}/varsave?slug=${save.slug}`
            const dashboardUrl = `${url}/task/dashboard?slug=${save.slug}&day=${save.actualDay}&period=${save.actualTime}&skip=${(page - 1) * 7}&limit=7`

            $http.get(timeUrl).then(function(response) {
                vm.timeplay = {}
                vm.timeplays = response.data
                vm.max = response.data.length
            })

            $http.get(girlUrl).then(function(response) {
                vm.girl = {}
                vm.girls = response.data
            })

            $http.get(varUrl).then(function(response) {
                vm.varsave = {}
                vm.varsaves = response.data
            })

            $http.get(dashboardUrl).then(function(response) {
                vm.task = {}
                vm.tasks = response.data.resultados
            })


            $http.get(`${url}/task/countdash?slug=${save.slug}&day=${save.actualDay}&period=${save.actualTime}`).then(function(response){
                vm.pages = Math.ceil(response.data.value / 7)
                vm.paginator(vm.pages, vm.page)
                tabsDash.show(vm, {tabDash: true})
            })
        }

        vm.update = function() {
            const updateUrl = `${url}/save/${vm.save._id}`
            $http.put(updateUrl, vm.save).then(function(response) {
                vm.dashboard(vm.save, 1)
                msgs.addSuccess('Savegame atualizado!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.atualizaReqs = function(task){
            const requireUrl = `${url}/task/complete?quest=${task.codTask}`
            $http.get(requireUrl).then(function(response) {
                let taskReqs = response.data.resultados
                if (taskReqs) {
                    taskReqs.forEach(function(taskreq){
                        let disponible = true
                        let contador = 1
                        taskreq.requirements = taskreq.requirements.map(function(require){
                            if (require.codTask == codTask){
                                disponible = disponible && true
                                return {
                                    codTask: require.codTask,
                                    taskComplete: true
                                }
                            } else {
                                disponible = disponible && require.taskComplete
                                return {
                                    codTask: require.codTask,
                                    taskComplete: require.taskComplete
                                }
                            }
                        })
    
                        taskreq.taskDisponible = disponible
    
                        const updateTaskUrl = `${url}/task/${taskreq._id}`
                        $http.put(updateTaskUrl, taskreq).then(function(response) {
                            msgs.addSuccess('Requisitos atualizado!')
                            contador += 1
                            if (contador == taskReqs.length){
                                vm.tExecute(task)
                            }
                        }).catch(function(response){
                            msgs.addError(response.data.errors)
                        })
                    })
                } else {
                    vm.tExecute(task)
                }
            })
        }

        vm.nextPeriod = function(){
            if (vm.save.actualTime == vm.max){
                vm.save.actualTime = 1
                vm.save.actualDay += 1
            } else {
                vm.save.actualTime += 1
            }

            const updateUrl = `${url}/save/${vm.save._id}`
            $http.put(updateUrl, vm.save).then(function(response) {
                msgs.addSuccess('Novo período!')
                vm.dashboard(vm.save, 1)
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.groupNextDay = function(task){
            const taskUrl = `${url}/task?group=${task.group}`
            $http.get(taskUrl).then(function(response) {
                let taskGroup = response.data
                let contador = 1
                taskGroup.forEach(function(taskInd){
                    taskInd.nextDay = vm.save.actualDay + taskInd.interval
                    const saveTask = `${url}/task/${taskInd._id}`
                    $http.put(saveTask, taskInd).then(function(response) {
                        msgs.addSuccess('Grupo Atualizado!')
                        contador += 1
                        if (contador == taskGroup.length){
                            if (task.periodEnd) {
                                vm.nextPeriod()
                            } else {
                                vm.dashboard(vm.save, 1)
                            }
                        }
                    }).catch(function(response){
                        msgs.addError(response.data.errors)
                    })
                })
            })
            
        }

        vm.tExecute = function(task) {
            if(task.group != ''){
                vm.groupNextDay(task)
            } else {
                if (task.periodEnd) {
                    vm.nextPeriod()
                } else {
                    vm.dashboard(vm.save, 1)
                }
            }
        }

        vm.tComplete = function(task) {
            task.taskComplete = true
            task.taskDisponible = false

            const completeUrl = `${url}/task/${task._id}`
            $http.put(completeUrl, task).then(function(response) {
                msgs.addSuccess('Tarefa completa!')
                vm.atualizaReqs(task)
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.showLocal = function(dates, period){
            let date = dates.find(date => date.time == period)
            return date.local
        }

        vm.girlUpdate = function(girl) {
            const updateGirlUrl = `${url}/girl/${girl._id}`
            $http.put(updateGirlUrl, girl).then(function(response) {
                vm.dashboard(vm.save, 1)
                msgs.addSuccess('Garota atualizada com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.varUpdate = function(varSave) {
            const updateVarUrl = `${url}/varsave/${varSave._id}`
            $http.put(updateVarUrl, varSave).then(function(response) {
                vm.dashboard(vm.save, 1)
                msgs.addSuccess('Item atualizado com sucesso!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.gamelist()
    }
})()
