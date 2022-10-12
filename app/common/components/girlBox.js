angular.module('primeiraApp').component('girlBox', {
    bindings: {
        grid: '@',
        colorClass: '@',
        name: '@',
        value: '@',
        text: '@',
    },
    controller: [
        'gridSystem',
        function(gridSystem) {
            this.$onInit = function () {
                this.gridClasses = gridSystem.toCssClasses(this.grid)
            }    
        }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
        <div class="box box-widget widget-user">
            <div class="widget-user-header {{ $ctrl.colorClass }}">
                <h5 class="widget-user-username">{{ $ctrl.name }}</h5>
            </div>
            <div class="widget-user-image">
                <img class="img-circle" src="/assets/{{ $ctrl.name }}.png" alt="User Avatar">
            </div>
            <div class="box-footer">
                <div class="row">
                    <div class="col-sm-12 border-right">
                        <div class="description-block">
                            <h3 class="description-header">{{ $ctrl.value }}</h3>
                            <span class="description-text">{{ $ctrl.text }}</span>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    `
})