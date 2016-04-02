module.exports = function(app, db, mongoose){

    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formsModel = require("./models/forms.model.server.js")(db, mongoose);
    var fieldsModel = require("./models/fields.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/forms.service.server.js")(app, formsModel);
    var fieldService = require("./services/field.service.server.js")(app, formsModel, fieldsModel);
};
