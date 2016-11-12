angular.module('controllers',[]);
angular.module('app', ['controllers', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/link2', {templateUrl: 'views/link2.html', controller: 'linkController'}).
            when('/home', {templateUrl: 'views/home.html', controller: 'homeController'}).
            
            otherwise({
                redirectTo : '/home'
            });
    }]);
