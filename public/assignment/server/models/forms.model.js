var forms = require("./forms.mock.json");

module.exports = function(){

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        findFormByFormId : findFormByFormId,
        createFormForUser : createFormForUser,
        deleteFormByFormId : deleteFormByFormId,
        updateFormByFormId : updateFormByFormId

    }
    return api;

    function findAllFormsForUser(userId){
        console.log("model "+userId);

        var formsForUser = [];
        for(form in forms){
            if(forms[form].userId == userId){
                formsForUser.push(forms[form]);
                console.log("in if");
        }}
        return formsForUser;
    }

    function findFormByFormId(formId){
        for(form in forms){
            if(form._id==formId){
                return form;
            }
        }
        return null;
    }

    function createFormForUser(userId, tempForm){
        var form={};
        var Id = (new Date).getTime();
        form._id = Id;
        form.userId = userId;
        form.title = tempForm.title;
        form.fields = null;
        forms.push(form);
        return form;
    }

    function deleteFormByFormId(formId){
        for(form in forms){
            if(form._id==formId){
                forms.splice(form,1);
                break;
            }
        }
    }

    function updateFormByFormId(formId, newForm){
        for(form in forms){
            if(forms[form]._id==formId){
                forms[form].title = newForm.title;
                forms[form].fields = newForm.fields;
            }
        }
        return newForm;
    }


};
