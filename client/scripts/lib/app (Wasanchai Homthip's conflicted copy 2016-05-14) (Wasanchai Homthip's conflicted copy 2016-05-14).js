// Libs
import angular from 'angular';
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import 'angular-chart.js';
//import  'ionic-datepicker';

// Modules
import Definer from '../definer';
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import LoginCtrl from '../controllers/login.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import ChatNameFilter from '../filters/chat-name.filter';
import ChatPictureFilter from '../filters/chat-picture.filter';
import NewChatService from '../services/new-chat.service';
import { RoutesConfig, RoutesRunner } from '../routes';

import CampaignsCtrl from '../controllers/CampaignsCtrl';
 import ReportsCtrl from '../controllers/ReportsCtrl';
  import CampaignCtrl from '../controllers/CampaignCtrl';
 


// App
const App = angular.module('CampaignApp', [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic', 'chart.js'//,'ionic-datepicker'
]);

new Definer(App)
  .define(CampaignsCtrl)
  .define(ReportsCtrl)
   .define(CampaignCtrl)
//
  .define(ChatsCtrl)
  .define(ChatCtrl)
  .define(ConfirmationCtrl)
  .define(LoginCtrl)
  .define(NewChatCtrl)
  .define(ProfileCtrl)
  .define(SettingsCtrl)
  .define(InputDirective)
  .define(CalendarFilter)
  .define(ChatNameFilter)
  .define(ChatPictureFilter)
  .define(NewChatService)
  .define(RoutesConfig)
  .define(RoutesRunner);

// Startup
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['CampaignApp']);
}
