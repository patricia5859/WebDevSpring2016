(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){
        var forms=[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormbyId: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback){
            var newForm={}
            newForm._id = (new Date).getTime();
            angular.copy(form, newForm);
            newForm.userId = userId;
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var tempForms = [];
            for(i=0; i<forms.length; i++){
                if(forms[i].userId==userId){
                    tempForms.push(forms[i]);
                }
            }
            callback(tempForms);
        }

        function deleteFormById(formId, callback){
            for(i=0; i<forms.length; i++){
                if(forms[i]._id==formId){
                    forms.splice(i,1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for(i=0; i<forms.length; i++){
                if(forms[i]._id==formId){
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;
                }
            }
            callback(newForm);
        }

    }
})();