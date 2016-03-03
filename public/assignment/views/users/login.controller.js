(function(){
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.login=function(user){
            UserService.findUserByCredentials(user.username, user.password,
                function(response){
                    if(response.username==null){
                        $location.path('/login');
                        console.log('login failed');
                    }
                    else{
                        $rootScope.user = response;
                        $location.path('/profile');
                        console.log('logged in');
                    }
                }
            )

        }

    }
})();



