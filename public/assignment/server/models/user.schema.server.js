module.exports = function(mongoose) {

    var userSchema = mongoose.Schema(
        {
            "_id": String,
            "username": String,
            "password": String,
            "firstName": String,
            "lastName": String,
            "email": [String],
            "phone": [String]
        },
        {
            collection: "userData"
        }
    );

    return userSchema;
};
