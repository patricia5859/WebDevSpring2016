module.exports = function(mongoose){

    var fieldSchema = mongoose.Schema(
        {
            "label" : String,
            "type" : String,
            "palceholder" : String,
            "options" : [{

                label : String,
                value : String
            }]
        },
    {
            collection : "field"
    }
    );

    return fieldSchema;
};
