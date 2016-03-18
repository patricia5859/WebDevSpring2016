(function(){
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, $location, FormService) {


        var currentUser = $rootScope.user;

        function initForms(){

            FormService.findAllFormsForUser(currentUser._id,function(response){
                $scope.forms = response;
            })
        }

        $scope.addForm = function(form){
            FormService.createFormForUser(currentUser._id, form, function(response){
                $scope.forms.push(response);
                $scope.form={};
                $scope.selIndex = null;

            });
        };

        $scope.updateForm = function(form){
            FormService.updateFormById(currentUser._id, form, function(response){
                initForms();
            });
            $scope.form={};
        };


        $scope.deleteForm = function(index){
            FormService.deleteFormById($scope.forms[index]._id, function(response){
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



