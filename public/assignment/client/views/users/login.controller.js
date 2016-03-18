(function(){
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.login=function(user){
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data.username==null){
                        $location.path('/login');
                        console.log('login failed');
                    }
                    else{
                        $rootScope.user = response.data;
                        $location.path('/profile');
                        console.log('logged in');
                    }
                });
        }

    }
})();



