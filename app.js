
var app = angular.module('jobsApp', ['ui.router', 'firebase'])

.constant('fb', {
    url: 'https://contractorapp.firebaseio.com/'
})

app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('/', {
            url: "/",
            templateUrl: "js/auth/loginView.html",
        })
        .state('/login', {
            url: "/login",
            templateUrl: "js/auth/loginView.html",
//            resolve: {
//                requireNoAuth: function($state, authService) {
//                    return authService.requireAuth().then(function(auth) {
//                        $state.go('/home');
//                        
//                    }, function(error) {
//                        $state.go('/home');
//                    })
//                }
//            }
        })
        .state('/register', {
            url: "/register",
            templateUrl: "js/auth/registerView.html",
        })
        .state('/create', {
            url: '/create',
            templateUrl: "js/jobForm/jobFormView.html",
            controller: "jobFormController",
        })
        .state('edit', {
            url: '/edit/:jobID',
            templateUrl: "js/jobForm/jobFormView.html",
            controller: "jobFormController",
        })
        .state('/home', {
            url: '/home',
            templateUrl: "js/homePage/currentJobs.html",
//            resolve: {
//                auth: function($state, authService){
//                    return authService.$requireAuth().catch(function(){
//                        $state.go('home');
//                    });
//                },
//            }
        })
        .state('/createTeam', {
            url: '/createTeam',
            templateUrl: "js/createTeam/createTeamView.html",      
        })
    
    $urlRouterProvider.otherwise("/");
    
}).run(function($rootScope, $state) {
    $rootScope.$state = $state;  
})