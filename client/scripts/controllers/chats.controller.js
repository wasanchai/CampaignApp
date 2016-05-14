import { Controller } from '../entities';

export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('chats');
    this.helpers({

      campaigns() {
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

ChatsCtrl.$inject = ['$scope', 'NewChat'];