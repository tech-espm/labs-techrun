class TelaTutorial {
    constructor(game) {
        this.init = function () {

            game.input.maxPointers = 1;
            // Deixar o jogo executando, mesmo se o browser mudar de aba?
            game.stage.disableVisibilityChange = false;
            if (game.device.desktop) {
                // Configurações específicas para desktop
                // Como criamos o CSS acima, não precisamos centralizar via código
                game.scale.pageAlignHorizontally = false;
            } else {
                // Configurações específicas para celulares
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                // Especifica o tamanho mímino e máximo para a área do jogo (de 400x300 até 800x600)
                game.scale.setMinMax(400, 300, 1280, 720);
                game.scale.forceLandscape = true;
                // Como criamos o CSS acima, não precisamos centralizar via código
                game.scale.pageAlignHorizontally = false;
            }
        };
        this.preload = function () {
            game.load.crossOrigin = "anonymous";
            game.load.image('Fundo', 'sprites/imgTuto.png', 1280, 720);
            game.load.image('btnJogar', 'sprites/btnJogar.png');
        };
        var btnJogar;
        this.create = function () {
            var fundo = game.add.sprite(0, 0, 'Fundo');
            btnJogar = game.add.sprite(900, 600, 'btnJogar');
            btnJogar.inputEnabled = true;
            btnJogar.events.onInputDown.add(telaJogar, this);
        };

        function telaJogar() {
            game.state.start("TelaInicial");
        }
        this.update = function () { };
    }

}