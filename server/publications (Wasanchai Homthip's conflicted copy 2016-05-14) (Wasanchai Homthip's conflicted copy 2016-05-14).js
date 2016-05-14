
Meteor.publish('users', function () {
  return Meteor.users.find({}, { fields: { profile: 1 } });
});
console.log("Meteor.Campaigns.find()");
Meteor.publish('campaigns', function () {
   
      return Campaigns.find();
    
  }
// Meteor.publishComposite('campaigns', function () {
//   console.log("Meteor.Campaigns.find()");
//   return {
//     find() {
//       return Campaigns.find();
//     }
//   }
  
  
  //return Meteor.Campaigns.find({}, { fields: { name: 1 } });
  //  console.log(Meteor.Campaigns.find());
  //    return Meteor.Campaigns.find();
 );

Meteor.publishComposite('chats', function () {
  if (!this.userId) return;

  return {
    find() {
      return Chats.find({ userIds: this.userId });
    },
    children: [
      {
        find(chat) {
          return Messages.find({ chatId: chat._id });
        }
      },
      {
        find(chat) {
          const query = { _id: { $in: chat.userIds } };
          const options = { fields: { profile: 1 } };

          return Meteor.users.find(query, options);
        }
      }
    ]
  };
});


///

Meteor.publish("reportTotals", function() {
// Remember, ReactiveAggregate doesn't return anything
  console.log("reportTotals:" );
ReactiveAggregate(this, Campaigns, [{
    // assuming our Reports collection have the fields: hours, books
    $group: {
      
         '_id':    {$concat: ['$name','y']}   , //ok
      //    '_id':    {$hour: "$timestamp"}   , //ok
        // '_id': '$name',
          'test': {$max:'$isshow'},
        'visits': {
        // In this case, we're running summation. 
            $sum: '$test'
        },
         'isshow': {$sum:1},
        'budgets': {
            $sum: '$test'
        }
    }
}, {
    $project: {
        // an id can be added here, but when omitted, 
        // it is created automatically on the fly for you
       //  _id:'$_id',
        test:'$test',
        visits: '$visits',
          isshow1: '$isshow',
        budgets: '$budgets'
    } // Send the aggregation to the 'clientReport' collection available for client use
}], { clientCollection: "clientReport" });
});
/*
Meteor.publish('sales', function () {
     var self = this;
   var arr = ["1","1.2"]; //just a example
  Sales.find({sid:{$in:arr}}).forEach( function( newNode ){
    newNode["son"] = ArrayUtils.intersect(arr,newNode["son"]); //is this just repeating query criteria in the find?
    self.added( "sales", newNode._id, newNode ); //Svse is the name of collection the data will be sent to on client
  });
  self.ready();
  
//       return Sales.aggregate(
//    [
//       {
//         $group : {
//            _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
//            totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
//            averageQuantity: { $avg: "$quantity" },
//            count: { $sum: 1 }
//         }
//       }
//    ]
// )
    
  });
  */