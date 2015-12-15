var app = angular.module('jobsApp')

app.service('userService', function($firebaseAuth, fb, $location, $firebaseArray, $firebaseObject){

//    var usersRef = new Firebase(fb.url + 'users');
//    var users = $firebaseArray(usersRef);
//    var Users = {};
//    
//    return Users
    
    var userID = ""
    
    this.logout = function() {
        authObj.$unauth();
        $location.path('login');  
    };
    
    var ref = new Firebase(fb.url);
    var usersRef = ref.child("users");
    var authObj = $firebaseAuth(ref);
    
    
    
    this.getLoggedInUser = function(){
        
//        var endUser = new Firebase(fb.url + "/user" + authData.uid);
//        return $firebaseArray(endUser) 
        
        var authData = ref.getAuth();
//        console.log(authData)
        userID = authData.uid
        var refUser = new Firebase(fb.url + "users/" + userID);
        
//        ref.orderByChild("email").equalTo('blaine.farr@gmail.com').on("child_added", function(snapshot) {
//            console.log(snapshot.key());   
//        })
//        var query = $firebaseArray(refUser.startAt(authData.uid).endAt(authData.uid));
//        query.$loaded().then(function() {
//            console.log(query);
//        });
        
        var userInfo = $firebaseObject(refUser)
        return userInfo
        
//        return refUser.$firebaseArray().then(function (authData){
//            console.log(authData)
//            return authData;
//        }, function (error){
//            return error
//        })
        
    }
    
})



//        
//|;
            
        

//        return {
//            if (authData) {
//                console.log("Authenticated user with uid:", authData.uid);
//            
//            var refUser = new Firebase(fb.url + "users/" + authData.uid);
//            return $firebaseArray(refUser);
            
            
            
//            userInfo.$loaded()
//                .then(function() {
//                    user.firstName = userInfo[1].$value
//                    
//            })
//            .catch(function(error) {
//                console.log("Error:", error);
//            });


//    ref.onAuth(function(authData) {
//        if (authData) {
//            // save the user's profile into the database so we can list users,
//            // use them in Security and Firebase Rules, and show profiles
//            ref.child("users").child(authData.uid).set({
//                provider: authData.provider,
//                name: getName(authData)
//            });
//        }
//    });
//    
//    // find a suitable name based on the meta info given by each provider
//    function getName(authData) {
//        switch(authData.provider) {
//            case 'password':
//                return authData.password.email.replace(/@.*/, '');
//            case 'twitter':
//                return authData.twitter.displayName;
//            case 'facebook':
//                return authData.facebook.displayName;
//      }
//    }