var app = angular.module('jobsApp');
    
app.service('jobFormService', function($firebaseArray, $firebaseObject, fb, $location){
    
    
    this.getJobs = function(user) {

        
        var ref = new Firebase(fb.url + "/jobs");
        
//        return $firebaseArray(myJobRef.child("-K5MR58LG_ioxQVH1voN"));
        
        var jobs = $firebaseArray(ref.orderByChild("userId").equalTo(user));
        
        return jobs        
        
    };
        
    this.editOpenJob = function(jobId){

        var jobRef = new Firebase(fb.url + "/jobs/")
        
        return $firebaseObject(jobRef.child(jobId));

    }
    
    this.postNewJob = function(newJob){
        
        var myJobRef = new Firebase(fb.url + "/jobs");
        console.log(newJob);
        myJobRef.push(newJob);
        
        return $firebaseArray(myJobRef) 
    };
    
    this.updateJob = function(job){
        
        var myJobRef = new Firebase(fb.url + "/jobs/");
        console.log(job.jobId);
        
        myJobRef.child(job.jobId).set(job)
        return $firebaseArray(myJobRef) 
    };
})