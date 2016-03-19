(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http){

        var api={
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldForForm: deleteFieldForForm,
            updateField: updateField
        };
        return api;

        function createFieldForForm(formId, field){
            return $http.post('/api/assignment/form/'+formId+'/field', field);
        }

        function getFieldsForForm(formId){
            return $http.get('/api/assignment/form/'+formId+'/field');
        }

        function getFieldForForm(formId,fieldId){
            return $http.get('/api/assignment/form/'+formId+'/field/'+fieldId);
        }

        function deleteFieldForForm(formId, fieldId){
            console.log("in service.client.js");
            return $http.delete('/api/assignment/form/'+formId+'/field/'+fieldId);
        }

        function updateField(formId, fieldId, form){
            return $http.put('/api/assignment/form/'+formId+'/field/'+fieldId, form);
        }

        function test(){

        }

    }
})();