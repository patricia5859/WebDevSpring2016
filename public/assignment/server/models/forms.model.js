var forms = require("./forms.mock.json");

module.exports = function(){

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        createFormForUser : createFormForUser,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,

    }
};
