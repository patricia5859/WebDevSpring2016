(function(){
    angular
        .module('FormBuilderApp')
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })

            .when("/login",{
                templateUrl: "views/users/login.view.html"
            })

            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })

            .when("/logout",{
                templateUrl: "views/home/home.view.html",
                controller: "LogoutController"
            })

            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/fields",{
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/form/:formId/fields",{
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user);
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        console.log("inside checkLoggedin:::::::::::::::::::::::::::::::::");

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                console.log(user);
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                console.log(user);
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();