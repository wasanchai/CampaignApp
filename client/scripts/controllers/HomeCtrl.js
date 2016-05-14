import { Controller } from '../entities';

export default class HomeCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('campaigns');
    this.helpers({

      data() {
        return Campaigns.find();
      }
    });
    this.NewCampaign = function () {
      // alert("new");
      var CampaignID = "NEW";
      this.$state.go('tab.campaign', { CampaignID }); //err
      // this.$state.go('tab.reports');
    }
    this.FormatNumber = function (i) {
      
        return Math.round(i) ;
      
    }

  }


  remove(chat) {
    this.callMethod('removeChat', chat._id);
  }
}

HomeCtrl.$inject = ['$scope', 'NewChat', '$state'];

