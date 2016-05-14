Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);

    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    const chatId = Chats.insert(chat);

    return chatId;
  },
  SaleGroup(id) {
    //var Sales = new Mongo.Collection('Sales');
// var pipeline = [
//   {$group: {_id: null, resTime: {$sum: "$price"}}}
// ];
// var result = Sales.aggregate(pipeline);

// return result;
      return Sales.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
)
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }

    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
  ,
  SaveCampaign(data) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in to update his picture.');
    // }

    //check(data, String);
    console.log(data);
    //debugger;
      // check(taskId, String);
   // check(setChecked, Boolean);
   var id = data._id;
   //Campaigns.update(id,data); //ok
   if(id && id != "") {
    
   console.log("update _id=" + id);
   delete data._id;
   Campaigns.update(id,{$set:data}); 
   }else {
      console.log("add  "  );
     id = Campaigns.insert(data);
   }
   //ok
    console.log("_id=" + id);
    //Tasks.update(taskId, { $set: { checked: setChecked } });
   //  throw new Meteor.Error(404, "Please enter your name");
     //  debugger;
    return id;
   // return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
   ,
  RemoveCampaign(data) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in to update his picture.');
    // }

    //check(data, String);
    console.dir(data);
      // check(taskId, String);
   // check(setChecked, Boolean);
   var id = data._id;
   //Campaigns.update(id,data); //ok
   Campaigns.update(id,{$set:{'Status':'D'}}); //ok
    console.log("_id=" + id);
    //Tasks.update(taskId, { $set: { checked: setChecked } });
   //  throw new Meteor.Error(404, "Please enter your name");
    return id;
   // return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});