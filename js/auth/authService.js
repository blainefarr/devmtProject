var app = angular.module('jobsApp')

app.service('authService', function($firebaseAuth, fb, $location, $firebaseArray){
    
    
    var ref = new Firebase(fb.url);
    var usersRef = ref.child("users");
    var authObj = $firebaseAuth(ref);
    
//    this.authCall = function () {
//        return authObj   
//    }
    
    this.loginWithEmail = function(user) {
        
        return authObj.$authWithPassword(user).then(function (auth){
            $location.path('/home');
            return auth;
        }, function (error){
            return error
        })
    }
    
    
    this.loginWithGoogle = function () {
        
        authObj.$authWithOAuthPopup("google", {scope: 'email'}).then(function(authData) {
            console.log(authData);
            
            
            usersRef.child(authData.uid).set({
                firstName : authData.google.cachedUserProfile.given_name,
                lastName : authData.google.cachedUserProfile.family_name,
                email : authData.google.email,
            });
            
            $location.path('home');
            console.log(user)
            console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
            
    }
    
    this.registerWithEmail = function(newUser) {
        ref.createUser({
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            email    : newUser.email,
            password : newUser.password,
//            uid : authUser.uid,
        }, function(error, authData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                
                
                usersRef.child(authData.uid).set({
                    firstName : newUser.firstName,
                    lastName : newUser.lastName,
                    email : newUser.email,
//                    uid : newUser.uid,
                })
                console.log("Successfully created user account with uid:", authData.uid);
                ;
                
            }
        });
    }
    
//    this.getProfile = function(uid) {
//        var usersRef = new Firebase(FirebaseUrl+'users');
//        var users = $firebaseArray(usersRef);
//        authObj.$requireAuth().$loaded(function(auth) {
//            var uid = auth.uid
//            var Users = {
//                getName: function(uid) {
//                    return users.$getRecord(uid).firstName;   
//                }
//            };
//    
//            return Users
//        })
//    }
    
    this.logout = function() {
        authObj.$unauth();
        
        $location.path('login');  
    };
    
    
    this.registerWithGoogle = function () {
        
        authObj.$authWithOAuthPopup("google", {scope: 'email'}).then(function(authData) {
        
            
            usersRef.child(authData.uid).set({
                firstName : authData.google.cachedUserProfile.given_name,
                lastName : authData.google.cachedUserProfile.family_name,
                email : authData.google.email,
//                uid : authData.uid,
            });
            
            $location.path('home');
            console.log(user)
            console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
            
    }
    
    this.logout = function() {
        authObj.$unauth();
        
        $location.path('/login');  
    };
})