var app = angular.module('jobsApp')

app.controller('authController', function($scope, authService, $location){
    
    $scope.loginWithEmail = function() {
        var user = {
            email : $scope.email,
            password : $scope.password,
        }
        
        authService.loginWithEmail(user).then(function(auth) {
            console.log(auth) 
        });  
    }
    
    $scope.registerWithEmail = function() {
        var newUser = {
            firstName : $scope.firstName,
            lastName : $scope.lastName,
            email : $scope.email,
            password : $scope.password,
        }
        
        authService.registerWithEmail(newUser);
        $location.path('/login')
    }
//    
//    $scope.registerWithGoogle = function() {
//        authService.registerWithGoogle();
//        $location.path('/createTeam')
//    }
//    
//    $scope.loginWithGoogle = function() {
//        authService.loginWithGoogle();
//    }
//    
//    

});