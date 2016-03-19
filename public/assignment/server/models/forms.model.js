var forms = require("./forms.mock.json");

module.exports = function(){

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        findFormByFormId : findFormByFormId,
        createFormForUser : createFormForUser,
        deleteFormByFormId : deleteFormByFormId,
        updateFormByFormId : updateFormByFormId,
        getField : getField,
        getFieldById : getFieldById,
        deleteField : deleteField,
        deleteFieldByFormId : deleteFieldByFormId,
        createFieldForForm : createFieldForForm,
        updateFieldForForm : updateFieldForForm,
        updateField : updateField

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

    function getField(formId, fieldId){

        for (form in forms){
            if(forms[form]._id == formId)
                if(fieldId)
                    getFieldById(forms[form].fields, fieldId);
                else
                    return forms[form].fields;
        }
    }

    function getFieldById(fields, fieldId){

        for (field in fields){
            if( fields[field]._id == fieldId)
                return fields[field];
        }

    }

    function  deleteField(formId, fieldId) {

        for (form in forms) {
            if (forms[form]._id == formId)
                deleteFieldByFormId(forms[form].fields, fieldId)
        }
        return forms;
    }

    function deleteFieldByFormId(fields, fieldId) {
        console.log("inform.model.js");
        for (field in fields) {
            if (fields[field]._id == fieldId)
                fields.splice(field, 1);
        }
    }

    function  createFieldForForm(formId, field){

        var temp ={};
        field._id = (new Date).getTime();
        for (form in forms) {
            if (forms[form]._id == formId) {
                forms[form].fields.push(field);
                temp = field;
            }

        }
        return temp;

    }

    function updateFieldForForm(formId, fieldId, field){
        var tempField = {};
        for (form in forms) {
            if (forms[form]._id == formId);
            return updateField(forms[form].fields, fieldId, field);

        }
    }

    function updateField(fields, fieldId, field){
        for(field in fields){
            if(fields[field]._id == fieldId) {
                field[field] = field;
                return field;
            }
        }
    }

};
