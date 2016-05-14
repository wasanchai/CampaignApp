import { Config, Runner } from './entities';

export class RoutesConfig extends Config {
  constructor() {
    super(...arguments);

    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }

  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html',
        resolve: {
          user: this.isAuthorized,
          chats() {
            return Meteor.subscribe('chats');
          }
        }
      })
 .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'client/templates/Home.html',
          controller: 'HomeCtrl as home'
        }
      }
    })
 .state('tab.campaigns', {
      url: '/campaigns',
      views: {
        'tab-campaigns': {
          templateUrl: 'client/templates/campaigns.html',
          controller: 'CampaignsCtrl as campaigns'
        }
      }
    })
 .state('tab.campaign', {
        url: '/campaigns/:CampaignID',
        views: {
          'tab-campaigns': {
            templateUrl: 'client/templates/campaign.html',
            controller: 'CampaignCtrl as campaign'
          }
        }
      })    
	.state('tab.reports', {
      url: '/reports',
      views: {
        'tab-reports': {
          templateUrl: 'client/templates/reports.html',
          controller: 'ReportsCtrl as rep'
        }
      }
    })    
     .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chats.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chat.html',
            controller: 'ChatCtrl as chat'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/templates/login.html',
        controller: 'LoginCtrl as logger'
      })
      .state('confirmation', {
        url: '/confirmation/:phone',
        templateUrl: 'client/templates/confirmation.html',
        controller: 'ConfirmationCtrl as confirmation'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'client/templates/profile.html',
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'client/templates/settings.html',
            controller: 'SettingsCtrl as settings',
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/campaigns');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

export class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
RoutesRunner.$inject = ['$rootScope', '$state'];