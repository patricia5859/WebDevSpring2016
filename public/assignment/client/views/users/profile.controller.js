(function(){
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        $scope.update=function(user){
            var userId = $rootScope.user._id;
            UserService.updateUserById(userId, user,
                function(response) {
                    $rootScope.user = response;
                    console.log($rootScope.user);
                }
            )
            $location.path('/profile');
        }

    }
})();



