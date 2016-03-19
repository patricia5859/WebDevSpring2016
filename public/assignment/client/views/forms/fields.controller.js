
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

        $scope.removeField = function(field) {
            FieldService
                .deleteFieldForForm(formId, field._id)
                .then(function(response){
                    getUserForms(user._id);
                })
        };

        $scope.addField = function(fieldType){

            switch (fieldType){
                case "singleLineText":
                    var field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {
                            getUserForms(user._id);
                        });
                    break;

                case "multiLineText" :
                    var field = {"_id": null, "label": "New Text Field", "type": "MULTITEXT", "placeholder": "New Field"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {
                            getUserForms(user._id);
                        });
                    break;

                case "date" :
                    var field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {
                            getUserForms(user._id);
                        });
                    break;

                case "dropDown" :
                    var field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {
                            getUserForms(user._id);
                        });
                    break;

                case "checkBoxes" :
                    var field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    FieldService
                        .createFieldForForm(formId, field)
                        .then(function (response) {

                            getUserForms(user._id);
                        });
                    break;

                case "radioButtons" :
                    var field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
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
