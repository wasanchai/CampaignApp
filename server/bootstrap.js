import moment from 'moment';

Meteor.startup(function() {
  

 LDAP_DEFAULTS.url = "ldap://batman2008.scasset.com";
 LDAP_DEFAULTS.port = "389";
 LDAP_DEFAULTS.createNewUser = true;
  console.log("Start:" + Campaigns.find().count());
  if (Campaigns.find().count() == 0) {
    
     let campaigns = [
       {
         name: 'You on your way?',
          timestamp: moment().subtract(1, 'hours').toDate()
        },
       {
         name: 'Hey, it\'s me',
         timestamp: moment().subtract(2, 'hours').toDate()
       },
       {
         name: 'I should buy a boat',
         timestamp: moment().subtract(1, 'days').toDate()
       },
       {
         name: 'Look at my mukluks!',
         timestamp: moment().subtract(4, 'days').toDate()
       },
       {
         name: 'This is wicked good ice cream.',
         timestamp: moment().subtract(2, 'weeks').toDate()
       },{
    
    "name" : "ทดสอบ 6663",
    "campaigncode" : "test1",
     timestamp: moment().subtract(4, 'days').toDate(),
    "test" : 214,
    "isshow" : false,
    "medias" : [ 
        {
            "mediacode" : "facebook",
            "medianame" : "facebook",
            "targetvisit" : 20001,
            "targetgoal" : 102
        }, 
        {
            "mediacode" : "think",
            "medianame" : "thinkofliving.com",
            "targetvisit" : 5000,
            "targetgoal" : 301
        }
    ]
}
     ];
     campaigns.forEach((m) => {
       Campaigns.insert(m);
     });

   }
  
 
});