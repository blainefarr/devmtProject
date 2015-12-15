var app = angular.module('jobsApp')

app.controller('jobFormController', function($scope, $location, jobFormService, userService, $stateParams){        
        
    
    $scope.projectType = "Project"
    
//    QUESTIONS -
//    Can I make user available through all controllers, or do I have to call it in each one?
//    Why is it logging twice?
    
    $scope.userInfo = userService.getLoggedInUser().$loaded().then(function(userInfo) {
            $scope.user = {
                uid: userInfo.$id,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            }      
//            console.log($scope.user);
            $scope.empName = userInfo.firstName
    })
    
    $scope.editOpenJob = function() {
        if (!$stateParams.jobID) {
            
        } else {
        jobFormService.editOpenJob($stateParams.jobID).$loaded().then(function(jobData) {
            $scope.jobDate = jobData.jobDate
            $scope.empName = jobData.empName
            $scope.jobName = jobData.jobName
            $scope.jobType = jobData.jobType
            $scope.jobStatus = jobData.jobStatus
            $scope.userId = jobData.userId
            $scope.jobId = jobData.$id 
        })
        
        }
        
    }
    
    $scope.editOpenJob()
    
    
    $scope.submitJob = function() {
        $scope.jobData = {
            jobDate : $scope.dt.getTime(),
            empName : $scope.empName,
            jobName : $scope.jobName,
            jobType : $scope.jobType,
            jobStatus : "Submitted",
            userId : $scope.user.uid,
            
        }
        
        if (!$stateParams.jobID) {
            jobFormService.postNewJob($scope.jobData);
            $location.path('/home')
        } else {
            $scope.jobData.jobId = $scope.jobId;
            console.log($scope.jobData)
            jobFormService.updateJob($scope.jobData)
            $location.path('/home')   
        }
        
    }
    
    $scope.saveJob = function() {
        $scope.jobData = {
            jobDate : $scope.dt.getTime(),
            empName : $scope.empName,
            jobName : $scope.jobName,
            jobType : $scope.jobType,
            jobStatus : "Saved",
            userId : $scope.user.uid,
        }
        console.log($scope.jobData);
        
        if (!$stateParams.jobID) {

            jobFormService.postNewJob($scope.jobData);
            $location.path('/home')
        } else {
            $scope.jobData.jobId = $scope.jobId;
            console.log($scope.jobData)
            jobFormService.updateJob($scope.jobData)
            $location.path('/home')   
        }
    }
    
    

    
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };


    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
  
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
        console.log('opened');
        $scope.status.opened = true;
    };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
    
});