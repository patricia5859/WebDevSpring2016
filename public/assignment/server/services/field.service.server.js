var fieldModel = require("../models/forms.model.server.js")();

module.exports = function(app) {

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
    res.json(fieldModel.deleteField (formId, fieldId));

}

function createFieldForForm(req, res){
    var formId = req.params.formId;
    var field = req.body;

    res.json(fieldModel.createFieldForForm(formId, field));

}

function  updateFieldForForm(req, res){
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = req.body;

    res.json(fieldModel.updateFieldByFormIdFieldId (formId, fieldId, field));

}


};