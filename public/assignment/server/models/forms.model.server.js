    var q = require("q");

module.exports = function(db, mongoose){

    var formSchema = require("./forms.schema.server.js")(mongoose);

    var formModel = mongoose.model('formModel', formSchema);

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

        var defer = q.defer();
        formModel.find({'userId' : userId},
            function(err, forms){
                if(err){
                    console.log("error in find all forms");
                }
                else{
                    defer.resolve(forms);
                }
            }

        );

        return defer.promise;
        /*var formsForUser = [];
        for(form in forms){
            if(forms[form].userId == userId){
                formsForUser.push(forms[form]);
                console.log("in if");
        }}
        return formsForUser;*/
    }

    function findFormByFormId(formId){
        for(form in forms){
            if(form._id==formId){
                return form;
            }
        }
        return null;
    }

    function createFormForUser(userId, form){

        var defer = q.defer();
        var newForm = {};
        newForm = form;
        newForm.userId = userId;
        newForm.created = (new Date).getTime();

        formModel.create(newForm,
            function(err, form){
                if(err){
                    console.log("form creation failed");
                }
                else{
                    console.log("form created");
                    console.log(form);
                    defer.resolve(form);

                }
            }
        );

        return defer.promise;
       /* var form={};
        var Id = (new Date).getTime();
        form._id = Id;
        form.userId = userId;
        form.title = tempForm.title;
        form.fields = null;
        forms.push(form);
        return form;*/
    }

    function deleteFormByFormId(formId){
        var defer = q.defer();
        formModel.remove({'_id' : formId},
            function(err, forms){
                if(err){
                    console.log("error in delete form by Id");
                }
                else{
                    console.log("form del");
                    defer.resolve(findAllFormsForUser(forms.userId));
                }
            }

        );

        return defer.promise;
        /*for(form in forms){
            if(form._id==formId){
                forms.splice(form,1);
                break;
            }
        }*/
    }

    function updateFormByFormId(formId, newForm){

        var defer = q.defer();
        delete newForm._id;

        formModel.update({'_id' : formId},
            {$set : newForm},
            function(err, forms){
                if(err){
                    console.log("error in update form");
                }
                else{
                    formModel.findOne({"_id" : formId},
                        function(err, user){
                            defer.resolve(forms);
                        }

                    );
                }
            }

        );

        return defer.promise;
        /*for(form in forms){
            if(forms[form]._id==formId){
                forms[form].title = newForm.title;
                forms[form].fields = newForm.fields;
            }
        }
        return newForm;*/
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
