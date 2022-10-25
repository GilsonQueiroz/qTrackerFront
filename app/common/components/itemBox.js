angular.module('primeiraApp').component('itemBox', {
    bindings: {
        colorClass: '@',
        icon: '@',
        text: '@',
        id: '@',
        type: '@',
        model: '=',
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
        <div>
            <span class="info-box-icon {{ $ctrl.colorClass }}">
                <i class="{{ $ctrl.icon }}"></i>
            </span>
        </div>    
        <div class="box-footer">
            <div class="row">
                <div class="col-sm-12 border-right">
                    <div class="description-block">
                        <input id="{{ $ctrl.id }}" class="form-control" 
                            type="{{ $ctrl.type }}" ng-model="$ctrl.model" />
                        <span class="description-text">{{ $ctrl.text }}</span>
                    </div>
                </div>
            </div>    
        </div>
    `
})