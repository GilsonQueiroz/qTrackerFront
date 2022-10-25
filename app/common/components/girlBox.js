angular.module('primeiraApp').component('girlBox', {
    bindings: {
        colorClass: '@',
        name: '@',
        text: '@',
        id: '@',
        type: '@',
        model: '=',
    },
    template: `
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
                        <input id="{{ $ctrl.id }}" class="form-control" 
                            type="{{ $ctrl.type }}" ng-model="$ctrl.model" />
                        <span class="description-text">{{ $ctrl.text }}</span>
                    </div>
                </div>
            </div>    
        </div>
    `
})