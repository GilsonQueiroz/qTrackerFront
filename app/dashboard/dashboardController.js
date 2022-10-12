(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        "$http",
        "tabsDash",
        "msgs",
        DashboardController
    ])
    
    function DashboardController($http, tabsDash, msgs) {
        
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

        vm.dashboard = function(save) {
            vm.save = save
            const timeUrl = `${url}/timeplay?slug=${save.slug}`
            const girlUrl = `${url}/girl?slug=${save.slug}`
            const varUrl = `${url}/varsave?slug=${save.slug}`
            const dashboardUrl = `${url}/task/dashboard?slug=${save.slug}&day=${save.actualDay}&period=${save.actualTime}`

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

            tabsDash.show(vm, {tabDash: true})
        }

        vm.update = function() {
            const updateUrl = `${url}/save/${vm.save._id}`
            $http.put(updateUrl, vm.save).then(function(response) {
                vm.dashboard(vm.save)
                msgs.addSuccess('Atualizado!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.atualizaReqs = function(codTask){
            const requireUrl = `${url}/task/complete?quest=${codTask}`
            $http.get(requireUrl).then(function(response) {
                let taskReqs = response.data.resultados
                taskReqs.forEach(function(taskreq){
                    let disponible = true
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
                        msgs.addSuccess('Requisito atualizado!')
                    }).catch(function(response){
                        msgs.addError(response.data.errors)
                    })
        
                });
            })
        }

        vm.tExecute = function(task) {
            if(task.taskRepeat){
                task.nextDay = vm.save.actualDay + task.interval
            }

            const completeUrl = `${url}/task/${task._id}`
            $http.put(completeUrl, task).then(function(response) {
                vm.dashboard(vm.save)
                msgs.addSuccess('Atualizado!')
            }).catch(function(response){
                msgs.addError(response.data.errors)
            })
        }

        vm.tComplete = function(task) {
            task.taskComplete = true
            task.taskDisponible = false

            vm.atualizaReqs(task.codTask)
            vm.tExecute(task)
        }

        vm.showLocal = function(dates, period){
            let date = dates.find(date => date.time == period)
            return date.local
        }

        vm.gamelist()
    }
})()
