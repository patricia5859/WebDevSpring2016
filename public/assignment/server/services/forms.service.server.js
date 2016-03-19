
var formsModel = require("../models/forms.model.js")();

module.exports = function(app){
    app.get("/api/assignment/user/:userId/form", getFormForUsers);
    app.get("/api/assignment/form/:formId", getFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function getFormForUsers(req, res){
            console.log("in user.service.server.js");
            var forms = formsModel.findAllFormsForUser(req.params.userId);
            console.log(forms);
            res.json(forms);
    }


    function getFormByFormId(req, res){
        var form = formsModel.findFormByFormId(req.params._id);
        res.json(form);
    }

    function deleteForm(req, res){
        var forms = formsModel.deleteFormByFormId(req.params._id);
        res.json(forms);
    }

    function createForm(req, res){
        var tempForm = req.body;
        var form = formsModel.createFormForUser(req.params.userId, tempForm);
        res.json(form);
    }

    function updateForm(req, res){
        var tempForm = req.body;
        console.log("*********************update form");
        console.log(tempForm);
        console.log(req.params.formId);
        var form = formsModel.updateFormByFormId(req.params.formId, tempForm);
        res.json(form);
    }
};