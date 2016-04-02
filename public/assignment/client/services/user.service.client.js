(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername : findUserByUsername,
            findUserById : findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return api;

        function findUserByCredentials(username, password) {
            console.log("in user.service.client.js");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function findUserByUsername(usrename){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserById(user){
            return $http.get("/api/assignment/user?"+user);
        }

        function createUser(newUser){
           return $http.post("/api/assignment/user"+newUser);
        }

        function deleteUserById(userId){
            return $http.delete("/api/asignment/user"+userId);
        }

        function updateUserById(userId, user){
            return $http.put("/api/assignment/user"+userId,user);
        }
    }
})();