(function () {
    'use strict';

    angular.module('app.ui.form')
        .directive('uiFileUpload', uiFileUpload);

    // Dependency: https://github.com/grevory/bootstrap-file-input
    function uiFileUpload() {
        return {
            restrict: 'A',
            link: function(scope, ele) {
                ele.bootstrapFileInput();
            }            
        }
    }

})(); 


