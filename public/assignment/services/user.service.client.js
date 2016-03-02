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
            createUsers: createUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var res = {};
            for(i=0; i<user.length; i++){
                if((username==user[i].username)&&(password==user[i].password)){
                    angular.copy(user[i],res);
                }
            }
            callback(res);
        }

        function findMovieByImdbID(imdbID, callback) {
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }

    }
})();