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
  }

  showNewChatModal() {
    this.NewChat.showModal();
  }
 
  remove(chat) {
    this.callMethod('removeChat', chat._id);
  }
}

CampaignsCtrl.$inject = ['$scope', 'NewChat'];

 