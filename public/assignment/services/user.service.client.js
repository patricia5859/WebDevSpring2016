(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var user = [

            {    "_id":123, "firstName":"Alice",  "lastName":"Wonderland",
                "username":"alice",  "password":"alice", "roles": ["student"]        },

            {    "_id":234, "firstName":"Bob",  "lastName":"Hope",
                "username":"bob",    "password":"bob", "roles": ["admin"]        },

            {    "_id":345, "firstName":"Charlie", "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]        },

            {    "_id":456, "firstName":"Dan", "lastName":"Craig",
                "username":"dan",    "password":"dan", "roles": ["faculty", "admin"]},

            {    "_id":567, "firstName":"Edward","lastName":"Norton",
                "username":"ed", "password":"ed", "roles": ["student"]        }

        ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var res = {};
            for(i=0; i<user.length; i++){
                if((username==user[i].username)&&(password==user[i].password)){
                    angular.copy(user[i],res);
                    console.log(res);
                    break;
                }
            }
            callback(res);
        }

        function findAllUsers(callback) {
            callback(user);
        }

        function createUser(newUser, callback){

            newUser._id = (new Date).getTime();
            user.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback){
            for(i=0; i<user.length; i++){
                if(user[i].id==userId){
                    user.splice(i,1);
                    break;
                }
            }
            callback(user);
        }

        function updateUserById(userId, user, callback){
            for(i=0; i<user.length; i++){
                if(user[i].id == userId){
                    user[i].firstName = user.firstName;
                    user[i].lastName = user.lastName;
                    user[i].username = user.username;
                    user[i].password = user.password;
                    user[i].role = user.role;
                }
            }
            callback(user);
        }

    }
})();