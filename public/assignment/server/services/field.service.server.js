

module.exports = function(app,formModel, fieldsModel) {

    app.get('/api/assignment/form/:formId/field', getField);
    app.get('/api/assignment/form/:formId/field/:fieldId', getField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldForForm);
    app.post('/api/assignment/form/:formId/field', createFieldForForm);


function  getField(req, res){
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    res.json(fieldModel.getField(formId, fieldId));
}

function  deleteField(req, res){
    console.log("in service.server.js");
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;

    formModel.findFormByFormId(formId)
        .then(function(form){

            fieldsModel.deleteField(fieldId)
                .then(function (field){
                    form.fields.id(fieldId).remove();
                    form.save();
                    res.json(form);
                });
        });

}

function createFieldForForm(req, res){
    var formId = req.params.formId;
    var field = req.body;
    console.log(123);
    console.log(formId);
    console.log(field);

    formModel.findFormByFormId(formId)
        .then(function(form){
            console.log(321);
            console.log(form);

            fieldsModel.createFieldForForm(field)
                .then(function (field){

                    form.fields.push(field);
                    form.save();
                    res.json(form);
                });
        });


}

function  updateFieldForForm(req, res){
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = req.body;

    res.json(fieldModel.updateFieldByFormIdFieldId (formId, fieldId, field));

}


};