
(function(){
    angular
        .module('FormBuilderApp')
        .controller('LogoutController', LogoutController);

    function LogoutController($scope, $rootScope, $location, UserService) {


        UserService
            .logout()
            .then(function (response){
                $rootScope.user = null;

            });




    }

})();