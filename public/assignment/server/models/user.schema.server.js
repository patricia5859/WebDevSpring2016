module.exports = function(mongoose) {

    var userSchema = mongoose.Schema(
        {

            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "email": [String],
            "phone": [String],
            "roles": [String]
        },
        {
            collection: "userData"
        }
    );

    return userSchema;
};
