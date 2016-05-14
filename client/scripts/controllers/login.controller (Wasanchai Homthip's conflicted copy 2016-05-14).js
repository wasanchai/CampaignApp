import { Controller } from '../entities';

export default class LoginCtrl extends Controller {
  login() {
 
     
       let domain = "scasset";
         let user = this.email;//"wasanchai@scasset.com";
	   //let user = "wasanchai@scasset.com";
	     Meteor.loginWithLDAP(user,this.password, { dn:   user, search: '(sAMAccountName=' + user + ')' }, function(err) {
		    if (err) {
			  // login failed
			   //  debugger; 
			  alert(err);
		    }
		    else {
			  // login successful
			    // debugger;
			  alert("hi" + Meteor.user().username);
		   }
		 });
  }

 
}

LoginCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$log'];