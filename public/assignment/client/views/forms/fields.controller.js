
(function() {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController($scope, $routeParams, $rootScope, $location, FormService, FieldService) {

        var formId = $routeParams.formId;

        var user = $rootScope.user;
        $scope.model= {};
        var uerFields = [];
        var userForms = [];


        function initialiseForms() {
            getUserForms(user._id);
        }
        initialiseForms();

        function getUserForms(userId) {

            var formData=[];

            FormService
                .findAllFormsForUser(userId)
                .then(function (response){
                    angular.copy(response.data, userForms);
                    getFormFields();
                });
        }

        function  getFormFields(){

            console.log("Inside getFormFields");
            for(form in userForms){
                if(userForms[form]._id == formId){
                    console.log("Inside if");
                    console.log(userForms[form].fields);
                    $scope.model.fields = userForms[form].fields;
                    break;
                }
            }

        }


        $scope.addField = function(fieldType){

            switch (fieldType){
                case "singleLineText":
                    var field = {"_id": null, "label": "Text Field", "type": "TEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(user._id);
                        });
                    break;
                case "multiLineText" :
                    var field = {"_id": null, "label": "Text Field", "type": "MULTITEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(user._id);
                        });
                    break;
            }
        }
    }
})();
