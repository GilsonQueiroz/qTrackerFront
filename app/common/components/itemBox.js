angular.module('primeiraApp').component('itemBox', {
    bindings: {
        grid: '@',
        colorClass: '@',
        icon: '@',
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
        <div class="info-box">
            <div>
                <span class="info-box-icon {{ $ctrl.colorClass }}">
                    <i class="{{ $ctrl.icon }}"></i>
                </span>
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