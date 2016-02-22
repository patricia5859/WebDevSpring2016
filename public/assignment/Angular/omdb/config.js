/**
 * Created by Patricia on 2/17/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .config(configuration);
    fucntion configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "home/home.view.controller"
            })
            .when("/search",{
                templateUrl: "search/search.view.controller"
            })
            .otherwise(
                redirectTo: "/home"
            )
    }
}());