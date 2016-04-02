var q = require("q");

module.exports = function(db, mongoose){

    var fieldSchema = require("./field.schema.server.js")(mongoose);

    var fieldModel = mongoose.model('Field', fieldSchema);

    var api = {

        findAllFormsForUser : findAllFormsForUser,
        createFieldForForm : createFieldForForm,
        deleteField : deleteField
    };
    return api;


    function deleteField(fieldId){

        var defer = q.defer();
        fieldModel.remove({"_id" : fieldId},
            function(err, field){
                if(err){
                    console.log("error in deleteField");
                }
                else{
                    defer.resolve(field);
                }
            }
        );

        return defer.promise;
    }


    function findAllFormsForUser(userId){
        var defer = q.defer();

        form.find({'userId' : userId},
            function(err,forms){
                if(err){
                    console.log("error in find all forms for user");
                }
                else{
                    defer.resolve(forms);
                }
            }
        );

        return defer.promise;
    }

    function createFieldForForm(field){

        var defer = q.defer();

        delete field._id;

        console.log("@@@@@@@@@@@");
        console.log(field);

        fieldModel.create(field,
            function(err, newField){
                if(err){
                    console.log("error in creating new field");
                }
                else{
                    console.log("success");
                    console.log(newField);
                    defer.resolve(newField);
                }
            }
        );
        return defer.promise;
    }
};
