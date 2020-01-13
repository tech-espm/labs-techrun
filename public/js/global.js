var Global = {

    distanciaMaior: 0,

    getHighScore: function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/getHighscore?idusuario=' + parseInt(sessionStorage.getItem('user_id')),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (resp) {
                Global.distanciaMaior = parseInt(resp);
            },
            error: function (err) {
                console.error(err, ' erro');
            }
        });
    },

    newScore: function (value) {
        var datas = {
            idusuario: parseInt(sessionStorage.getItem('user_id')),
            score: value
        };

        $.ajax({
            async: false,
            type: 'POST',
            url: '/newScore',
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (resp) {
            },
            error: function (err) {
                console.error(err, ' erro');
            }
        });
    }
};
