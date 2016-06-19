(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger', 'Upload', '$window'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger, Upload, $window) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            uploadFiles: uploadFiles
        };

        return service;

        function uploadFiles(fileS) {
            return Upload.upload({
                url: 'http://localhost:3000/upload',
                arrayKey: '',
                data: {file: fileS}
            });
        }

        function getMessageCount() {
            return $q.when(72);
        }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }
    }
})();
