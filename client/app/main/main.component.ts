const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeMemes = [];
  newMeme = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('meme');
    });
  }

  $onInit() {
    this.$http.get('/api/memes').then(response => {
      this.awesomeMemes = response.data;
      this.socket.syncUpdates('meme', this.awesomeMemes);
    });
  }

  addMeme() {
    if (this.newMeme) {
      this.$http.post('/api/memes', { name: this.newMeme });
      this.newMeme = '';
    }
  }

  deleteMeme(meme) {
    this.$http.delete('/api/memes/' + meme._id);
  }
}

export default angular.module('ahMemeporiumApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
