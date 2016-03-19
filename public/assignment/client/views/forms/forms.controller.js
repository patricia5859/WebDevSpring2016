(function(){
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, $location, FormService) {


        var currentUser = $rootScope.user;

        function initForms(){

            FormService
                .findAllFormsForUser(currentUser._id)
                .then(function(response){
                    console.log(response);
                    $scope.forms = response.data;
            });
        }

        $scope.addForm = function(form){
            FormService
                .createFormForUser(currentUser._id, form)
                .then( function(response){
                $scope.forms.push(response.data);
                $scope.form={};
                $scope.selIndex = null;

            });
        };

        $scope.updateForm = function(form){
            console.log("insdie update");
            console.log(form);
            FormService
                .updateFormById(form._id, form)
                .then(function(response){
                    initForms();
                    $scope.form={};
            });

        };


        $scope.deleteForm = function(index){
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(function(response){
                initForms();
            });
            $scope.form={};
        };

        $scope.selectForm = function(index){
            $scope.selIndex = index;
            var currentForm = $scope.forms[index];
            $scope.form = currentForm;
        };

        initForms();
        }

    })();



