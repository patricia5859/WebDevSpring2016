(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl: "views/home/home.view.html"
                })

                .when("/login",{
                    templateUrl: "views/users/login.view.html"
                })

                .when("/register",{
                    templateUrl: "views/users/register.view.html"
                })

                .when("/logout",{
                    templateUrl: "views/home/home.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

})();