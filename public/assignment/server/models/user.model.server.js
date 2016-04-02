var q = require("q");
var uuid = require("node-uuid");

module.exports = function(db, mongoose){
    console.log(mongoose);

    var userSchema = require("./user.schema.server.js")(mongoose);

    var userCollection = mongoose.model("userCollection", userSchema);

    var api = {
        findUserByCredentials : findUserByCredentials,
        findUserByUsername : findUserByUsername,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        createUser : createUser
       // deleteUserById : deleteUserById,
      //  updateUserById : updateUserById
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

        userCollection.findUser(
            {'username': username},
            function(err, user){
                defer.resolve(user);
            }
        );
        return defer.promise;
/*        for(user in users){
            if(user.username==username){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;*/
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

       /* for(user in users){
            if(user._id==Id){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;*/
    }

    function createUser(newUser){

        newUser._id = uuid.v1();

        var defer = q.defer();

        userCollection.create(newUser,
            function(err, user){
                defer.resolve(user);
            }
        );
        return defer.promise;
/*        newUser._id = (new Date).getTime();
        users.push(newUser);
        return newUser;*/
    }

    /*
    function deleteUserById(Id){
        for(user in users){
            if(user._id==Id){
                users.splice(user,1);
                break;
            }
        }
        return users;
    }

    function updateUserById(Id, user){
        for(user in users){
            if(users[user]._id == Id){
                users[user].firstName = user.firstName;
                users[user].lastName = user.lastName;
                users[user].username = user.username;
                users[user].password = user.password;
                users[user].role = user.role;
            }
        }
        return user;
    }
    */
};