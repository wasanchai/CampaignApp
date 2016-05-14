import { Controller } from '../entities';

export default class ReportsCtrl extends Controller {
  constructor() {
    super(...arguments);
		var i=1;
		this.ck1 = true;
		this.labels = ["January", "February", "March", "April", "May", "June", "July"];
		this.series = ['Series A', 'Series B'];
    this.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
    ];
		this.$scope.xx=1;
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

ReportsCtrl.$inject = ['$scope', 'NewChat', '$reactive'];


