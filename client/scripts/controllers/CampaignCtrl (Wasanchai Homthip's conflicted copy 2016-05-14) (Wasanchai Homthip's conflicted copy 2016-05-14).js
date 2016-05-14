import { Controller } from '../entities';

export default class CampaignCtrl extends Controller {
  constructor() {
    super(...arguments);
    //$reactive(this).attach($scope);
    this.campaignId = this.$stateParams.campaignId;
    this.subscribe('campaigns');
    this.SaveCampaign = function (cam) {
      // var tmpCam;
      // tmpCam =angular.copy(campaign );
      //  debugger;
      this.callMethod('SaveCampaign', angular.copy(campaign));
      //alert("Save");

    }
    this.RemoveMedia = function (campaign, index) {
      //  var tmpCam;
      //  tmpCam =angular.copy(cam )
      //   debugger;
      //  this.callMethod('SaveCampaign', tmpCam);
      delete campaign.medias[index];
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

    // this.currMedia= {};
    this.SelectMedia = function (campaign, curObj, curIndex) {
      //  this.currMedia  = curObj;
      // Show the action sheet
      var mediaCodes = ["facebook", "twitter", "think"];
      var hideSheet = this.$ionicActionSheet.show({
        buttons: [
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
          campaign.medias = campaign.medias.splice(curIndex, 1);
          return true;
          // alert(curObj.mediacode);
        },
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {

          curObj.mediacode = mediaCodes[index];
          return true;
        }
      });
    }

    console.log("id:" + this.campaignId);
    this.helpers({



      data() {
        return Campaigns.findOne(this.campaignId);
      }
    });
  }

}

CampaignCtrl.$inject = ['$scope', '$stateParams', '$ionicActionSheet'];

