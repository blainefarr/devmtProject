var app = angular.module('jobsApp')

app.controller('createTeamController', function($scope, $location, createTeamService){
    
    $scope.createTeam = function() {
        var newTeam = {
            teamName : $scope.teamName,
        }
        
        $location.path('/addCrew')
    }
    
    $scope.useAlone = function() {
    
        $location.path('/home')
    }


});