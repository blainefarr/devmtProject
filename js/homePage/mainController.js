var app = angular.module('jobsApp')

app.controller('mainController', function($scope, jobFormService, authService, userService){        
    
    
    $scope.userInfo = userService.getLoggedInUser().$loaded().then(function(userInfo) {

        $scope.user = {
            uid: userInfo.$id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
        }      

        jobFormService.getJobs(userInfo.$id).$loaded().then(function(jobsArray) {
//            console.log(jobsArray);  
            $scope.jobs = jobsArray
        });
    })
    
    
    $scope.logout = function(){        
        console.log('logout')
        authService.logout();
    }

    
    
});