import { Controller } from '../entities';

export default class ReportsCtrl extends Controller {
  constructor() {
    super(...arguments);
		var i = 1;
		this.ck1 = true;
		this.labels = ["Facebook", "Think of living", "instagram", "Google Ad", "Gold Traders", "bangkok biz news", "Email"];
		this.series = ['Visit', 'Goal'];
		    this.data = [
		[2, 1.5, 1.2, 0.6, 2, 1, 3] 
    ];
		this.dataGoal = [
			[65, 59, 80, 81, 56, 65, 82]
    ];
		this.options =  {
        tooltipTemplate: "<%= value %>",
        
        showTooltips: true,
        
        onAnimationComplete: function()
        {    
            this.showTooltip(this.datasets[0].bars, true);          
        },
        tooltipEvents: []
    };

		this.$scope.xx = 1;
		this.testLogin = testLogin;
		function testLogin() {
			if (i == 1) {
				i = 0;
				this.data = [
					[28, 48, 40, 19, 86, 27, 90],
					[65, 59, 80, 81, 56, 55, 40],
				];
			} else {
				i = 1;
				this.data = [
					[65, 59, 80, 81, 56, 55, 40],
					[28, 48, 40, 19, 86, 27, 90]
				];

			}
		}



		Meteor.subscribe("clientReport");
		Meteor.subscribe("reportTotals");
		this.helpers({

      data2() {
        console.log("I'm working");
				return ClientReport.find();
				// this.getReactivley('ck1');
				//   return clientReport.find({ test: this.getReactively('ck1')==true?1:0 });
      }
			/*,sales() {
				  console.log("Sales");
				 return Sales.find();
				
			}*/
    });


		Meteor.subscribe("sales");
	}




}

ReportsCtrl.$inject = ['$scope', 'NewChat'];


