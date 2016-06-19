(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.progressPercentage = null;

        //Init Props
        vm.getAllFiles = getAllFiles();


        activate();


        vm.submit = function () {
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        }
        vm.upload = function (file) {
            if (file) {
                dataservice.uploadFiles(file).then(success,error,progress);
            }
            function success(resp) {
                if (resp.data.error_code === 0) {
                    logger.success('Success ' + resp.config.data.file.name + ' uploaded.');
                    vm.file = [];
                } else {
                    logger.error('An error occured');
                }
            }
            function error(resp) {
                logger.error('Error status: ' + resp.status);
            }
            function progress(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }
        };


        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getAllFiles() {

        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
