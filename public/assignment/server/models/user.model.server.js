var q = require("q");
var uuid = require("node-uuid");

module.exports = function(db, mongoose){


    var userSchema = require("./user.schema.server.js")(mongoose);

    var userCollection = mongoose.model("userCollection", userSchema);

    var api = {
        findUserByCredentials : findUserByCredentials,
        findUserByUsername : findUserByUsername,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        createUser : createUser,
       // deleteUserById : deleteUserById,
        updateUserById : updateUserById
    };
    return api;

    function findUserByCredentials(username, password){

        var defer = q.defer();

        userCollection.findOne(
            {'username': username, 'password': password},
            function(err, user){
                console.log(user);
                defer.resolve(user);
            }
        );
        return defer.promise;
     /*console.log("user "+username+" password "+password);

        for(user in users){
            console.log(user);
            if(users[user].username==username && users[user].password==password){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;*/
    }

    function findUserByUsername(username){

        var defer = q.defer();

        userCollection.findOne(
            {'username': username},
            function(err, user){
                defer.resolve(user);
            }
        );
        return defer.promise;

    }

    function findAllUsers(){
        var defer = q.defer();

        userCollection.findUser(
            function(err, userList){
                defer.resolve(userList);
            }
        );
        return defer.promise;
    }

    function findUserById(Id){

        var defer = q.defer();

        userCollection.findById(Id,
        function(err, user){
            defer.resolve(user)
        });

        return defer.promise;


    }

    function createUser(newUser){




        var defer = q.defer();

        userCollection.create(newUser,
            function(err, user){
                console.log(user);
                defer.resolve(user);
            }
        );
        return defer.promise;
/*        newUser._id = (new Date).getTime();
        users.push(newUser);
        return newUser;*/
}



    function updateUserById(Id, user) {




        var deferred = q.defer();


        userCollection.update(
            {'_id' : Id},
            {$set : user},
            function(err, update){
                if(err){
                    console.log("error updating");
                    console.log(err);
                    deferred.reject(err);
                }
                else{

                    console.log("success");
                    console.log(update);
                    deferred.resolve(update);
                }
            }
        );
        return deferred.promise;
    };

};

