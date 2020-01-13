class TelaMenu {
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
            game.load.image('Fundo', 'sprites/Menu.png', 1280, 720);
        };
        var txtLogo;
        var txtJogar;
        var txtTutorial;
        var txtCreditos;
        
        this.create = function () {
            var fundo = game.add.sprite(0, 0, 'Fundo');
            txtLogo = game.add.text(-200, 340, '', {
                font: '110px KidsZone',
                fill: '#fff'
            });
            txtLogo.anchor.set(0.5);
            txtLogo.stroke = "#000000";
            txtLogo.strokeThickness = 6;
            game.add.tween(txtLogo).to({
                x: game.world.centerX
            }, 500).start();
            txtJogar = game.add.text(1480, 440, '', {
                font: '60px KidsZone',
                fill: '#fff'
            });
            txtJogar.anchor.set(0.5);
            txtJogar.stroke = "#000000";
            txtJogar.strokeThickness = 6;
            txtJogar.inputEnabled = true;
            txtJogar.events.onInputDown.add(play, this);
            game.add.tween(txtJogar).to({
                x: game.world.centerX
            }, 500).start();
            txtTutorial = game.add.text(-200, 520, '', {
                font: '45px KidsZone',
                fill: '#fff'
            });
            txtTutorial.anchor.set(0.5);
            txtTutorial.stroke = "#000000";
            txtTutorial.strokeThickness = 6;
            txtTutorial.inputEnabled = true;
            txtTutorial.events.onInputDown.add(telaTutorial, this);
            game.add.tween(txtTutorial).to({
                x: game.world.centerX
            }, 500).start();

            txtCreditos = game.add.text(-200, 600, '', {
                font: '45px KidsZone',
                fill: '#fff'
            });
            
            txtCreditos.anchor.set(0.5);
            txtCreditos.stroke = "#000000";
            txtCreditos.strokeThickness = 6;
            txtCreditos.inputEnabled = true;
            txtCreditos.events.onInputDown.add(telaCreditos, this);
            game.add.tween(txtCreditos).to({ x: game.world.centerX }, 500).start();

        };

        function play() {
            game.state.start('TelaInicial');
        }

        function telaTutorial() {
            game.state.start('TelaTutorial');
        }

        function telaCreditos(){
            game.state.start('TelaCreditos');
        }

        this.update = function () {
            txtLogo.setText("Tech Run");
            txtJogar.setText("Jogar");
            txtTutorial.setText("Como jogar");
            txtCreditos.setText("Créditos");
        };
    }
}