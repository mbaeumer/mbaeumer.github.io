angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/link2', {templateUrl: 'views/link2.html'}).
            when('/home', {templateUrl: 'views/home.html'}).
            
            otherwise({
                redirectTo : '/home'
            });
    }]);
