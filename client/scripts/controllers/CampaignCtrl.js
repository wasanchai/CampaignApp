import { Controller } from '../entities';

export default class CampaignCtrl extends Controller {
  constructor() {
    super(...arguments);
    //$reactive(this).attach($scope);
    this.CampaignID = this.$stateParams.CampaignID;
   // alert(this.CampaignID);
    this.subscribe('campaigns');
    this.SaveCampaign2 = function (objCam) {
         var  CampaignID = '55mNtrpAYtcJ4GJQu';
         // alert(CampaignID);
     //    alert(CampaignID);
           this.$state.go('tab.campaign',{CampaignID});  
  } 
    this.TestReport = function () {
      // alert("Save1");
      // var tmpCam;
      // tmpCam =angular.copy(campaign );
      //  debugger;
        this.testResult = {};
      this.callMethod('SaleGroup', 99, function (error, result) {
        
        if (error) {
          alert('error:' + error.reason);

        } else {
         this.testResult = result; 
         alert(result);
        }
      });

    }
    this.SaveCampaign = function (objCam) {
      // alert("Save1");
      // var tmpCam;
      // tmpCam =angular.copy(campaign );
      //  debugger;
      this.callMethod('SaveCampaign', angular.copy(objCam), function (error, result) {
        
        if (error) {
          alert('error:' + error.reason);

        } else {
          this.CampaignID = result;
          var CampaignID = this.CampaignID;
          
        // var  CampaignID = '55mNtrpAYtcJ4GJQu';
         // alert(CampaignID);
          //this.$state.go('tab.campaign',{CampaignID}); // ok
           this.$state.go('tab.campaigns.m',{CampaignID});
        }
      });

    }
      this.RemoveCampaign = function (objCam) {
      // alert("Save1");
      // var tmpCam;
      // tmpCam =angular.copy(campaign );
      //  debugger;
      this.callMethod('RemoveCampaign', angular.copy(objCam), function (error, result) {
        if (error) {
          alert('error:' + error.reason);

        } else {
           this.$state.go('tab.campaigns');
        // alert(result);
        }
      });

    }
    
    this.ShowURL = function (campaign,media) {
     //debugger;
    var myPopup = this.$ionicPopup.show({
    template: '<textarea style="height:50px" onclick="this.select()" >' 
    + campaign.URL
    + '?utm_medium=banner'
    + '&utm_campaign=' + campaign.CampaignCode
    + '&utm_source=' +  media.MediaCode + "</textarea>",
    title: 'URL Add Google Analytic',
    subTitle: 'Please select all and copy.',
   // scope: $scope,
    buttons: [
      { text: 'Cancel' } 
    ]
  });

    }
    this.RemoveMedia = function (campaign, index) {
       
      campaign.Medias.splice(index, 1);
   

    }
    this.NewMedia = function (campaign) {
      var newMedia = {};
      campaign.Medias.splice(campaign.Medias.length, 0,newMedia);
        this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
      //   delete campaign.Medias[index];
      //  alert(index);

    }
    this.addBenefit = function (index) {
      var newBenefit = {};
      //newBenefit.BenefitNo  =  index + 2;
      $scope.progress.TaskBenefits.splice(index + 1, 0, newBenefit);
      for (var i = 0; i < $scope.progress.TaskBenefits.length; i++) {
        $scope.progress.TaskBenefits[i].BenefitNo = i + 1;
      }
      // alert(index);a
      // toaster.pop('success',"123", "456");
    }
    this.removeBenefit = function (index) {
      var newBenefit = {};
      //newBenefit.BenefitNo  =  index + 2;
      $scope.progress.TaskBenefits.splice(index, 1);
      for (var i = 0; i < $scope.progress.TaskBenefits.length; i++) {
        $scope.progress.TaskBenefits[i].BenefitNo = i + 1;
      }
      // alert(index);
    }
//  var myPopup = this.$ionicPopup.show({
//     template: '<textarea  rows="2" cols="80" style="height:50px" onclick="this.select()">xxxx'   + "</textarea>",
//     title: 'URL Add Google Analytic',
//     subTitle: 'Please select all and copy.',
//     //scope: $scope,
//     buttons: [
//       { text: 'Cancel' } 
//     ]
//   });
    // this.currMedia= {};
    this.SelectMedia = function (thisCtrl,campaign, curObj, curIndex) {
      //  this.currMedia  = curObj;
      // Show the action sheet
      var MediaCodes = ["facebook", "twitter", "think"];
      var hideSheet = this.$ionicActionSheet.show({
        buttons: [
          { text: 'Show URL' },
          { text: 'FaceBook' },
          { text: 'Twitter' }
          ,
          { text: 'Think' }
        ],
        destructiveText: 'Delete',
        titleText: 'Select Media',
        cancelText: 'Cancel',
        destructiveButtonClicked: function () {
          // debugger;
          // this.$scope.RemoveMedia(curObj, curIndex);
          campaign.Medias.splice(curIndex, 1);
          return true;
          // alert(curObj.MediaCode);
        },
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
            if(index==0) {
               thisCtrl.ShowURL(campaign,curObj);
            }else {
          curObj.MediaCode = MediaCodes[index-1];
          }
          return true;
        }
      });
    }
    // this.data = Campaigns.findOne(this.campaignId);
    console.log("id:" + this.CampaignID);
    if(this.CampaignID=="NEW" ){
      
      this.data = {Status:'A',Medias:[{}]};
    }else {
    this.helpers({

      data() {
        return Campaigns.findOne(this.CampaignID);
      }
    });
    }
  }

}

CampaignCtrl.$inject = ['$scope', '$stateParams', '$ionicActionSheet','$state','$timeout', '$ionicScrollDelegate','$ionicPopup'];

