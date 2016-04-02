module.exports = function(mongoose) {

    var userSchema = mongoose.Schema(
        {
            "_id": String,
            "username": String,
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
