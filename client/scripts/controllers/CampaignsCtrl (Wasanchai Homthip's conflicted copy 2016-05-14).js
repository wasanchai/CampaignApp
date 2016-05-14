import { Controller } from '../entities';

export default class CampaignsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('campaigns');
    this.helpers({

      data() {
        return Campaigns.find();
      }
    });
      this.NewCampaign = function() {
   // alert("new");
    var CampaignID = "NEW";
   this.$state.go('tab.campaign',{CampaignID}); //err
    // this.$state.go('tab.reports');
  }
 
  }


  remove(chat) {
    this.callMethod('removeChat', chat._id);
  }
}

CampaignsCtrl.$inject = ['$scope', 'NewChat','$state'];

 