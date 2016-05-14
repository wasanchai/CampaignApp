import { Controller } from '../entities';

export default class LoginCtrl extends Controller {
    constructor() {
    super(...arguments);
 
	
	this.login = function() {
 
     	let t = this;
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
			  //alert("hi" + Meteor.user().username);
				 location.href = '/';
				 //this.$state.go('tab.home');
		   }
		 });
  }
	      this.NewCampaign = function() {
   // alert("new");
    var CampaignID = "NEW";
   this.$state.go('tab.campaigns.m',{CampaignID}); //err
    // this.$state.go('tab.reports');
  }
 
  }


  remove(chat) {
    this.callMethod('removeChat', chat._id);
  }
}

 
LoginCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$log'];