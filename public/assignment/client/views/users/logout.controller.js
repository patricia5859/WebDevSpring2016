
(function(){
    angular
        .module('FormBuilderApp')
        .controller('LogoutController', LogoutController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $rootScope.user = null;
        }

    }