"use strict";

window.WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () {
        setTimeout(function () {
            game.state.start("TelaMenu");
        }, 1000);
    },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Indie+Flower']
    }

};


// https://github.com/photonstorm/phaser/blob/v2.6.2/src/core/Group.js#L2372
Phaser.Group.prototype.getRandomNotExists = function (startIndex, endIndex) {
    var list = this.getAll('exists', false, startIndex, endIndex);
    return this.game.rnd.pick(list);
};

// Essa não é a forma mais "profissional" de fazer, mas é a mais simples :)

// Vamos chamar a variável de game, para ficar igual ao sandbox!
var game = new Phaser.Game(1280, 720, Phaser.AUTO, "divJogo");

// variaveis globais
var username = sessionStorage.getItem('username');
var user_id = sessionStorage.getItem('user_id');
var highScore = undefined;
var distanciaMaior = 0;

game.state.add("TelaInicial", TelaInicial);
game.state.add("TelaMenu", TelaMenu);
game.state.add("TelaTutorial", TelaTutorial);
game.state.add("TelaCreditos", TelaCreditos);