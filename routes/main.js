const express = require("express");
const Sql = require("../infra/sql");

const router = express.Router();

function jsonRes(res, statusCodeFalha, resultado){
	let r;
	if (!resultado) {
		res.sendStatus(204);
	} else if (!isNaN(r = parseInt(resultado)) && r.toString() === resultado) {
		res.json(r);
	} else {
		res.statusCode = statusCodeFalha;
		res.json(resultado);
	}
}

router.get('/', (req, res) => {
	res.render('index', { title: 'GameLab' });
});

router.get('/login', (req,res) => {
    res.render('login', { title: 'GameLab' });
});

router.get('/game', (req,res) => {
    res.render('game', { title: 'GameLab' });
});

router.post('/newUser', async (req, res) => {
	try {
		let u = req.body;
		if (!u || !u.login || !u.email) {
			jsonRes(res, 400, "Dados inválidos!");
		} else {
			u.login = u.login.trim().toLowerCase();
			u.email = u.email.trim().toLowerCase();

			await Sql.conectar(async (sql) => {
				try {
					await sql.query("insert into usuario (login, email) values (?, ?)", [u.login, u.email]);
					jsonRes(res, 200, await sql.scalar("select last_insert_id()"));
				} catch (ex) {
					if (ex.code) {
						switch (ex.code) {
							case "ER_DUP_ENTRY":
								jsonRes(res, 500, "Esse nome de usuário ou e-mail já existem :(");
								break;
							default:
								jsonRes(res, 500, ex.message || ex.toString());
								break;
						}
					} else {
						jsonRes(res, 500, ex.message || ex.toString());
					}
				}
			});
		}
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}
});

router.get('/getUser', async (req, res) => {
	try {
		let login = req.query["login"];
		if (!login) {
			jsonRes(res, 400, "Dados inválidos!");
		} else {
			login = login.trim().toLowerCase();

			await Sql.conectar(async (sql) => {
				try {
					let id = parseInt(await sql.scalar("select id from usuario where login = ?", [login]));
					if (isNaN(id))
						jsonRes(res, 400, "Usuário não encontrado :(");
					else
						jsonRes(res, 200, id.toString());
				} catch (ex) {
					jsonRes(res, 500, ex.message || ex.toString());
				}
			});
		}
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}
});

router.post('/newScore', async (req, res) => {
	try {
		let h = req.body;
		h.idusuario = parseInt(h.idusuario);
		h.score = parseInt(h.score);
		if (!h || !h.idusuario || isNaN(h.idusuario) || !h.score || isNaN(h.score)) {
			jsonRes(res, 400, "Dados inválidos!");
		} else {
			await Sql.conectar(async (sql) => {
				try {
					await sql.query("insert into highscore (idusuario, score, data) values (?, ?, curdate())", [h.idusuario, h.score]);
					jsonRes(res, 200, "1");
				} catch (ex) {
					if (ex.code) {
						switch (ex.code) {
							case "ER_NO_REFERENCED_ROW":
							case "ER_NO_REFERENCED_ROW_2":
								jsonRes(res, 500, "Usuário não existe :(");
								break;
							default:
								jsonRes(res, 500, ex.message || ex.toString());
								break;
						}
					} else {
						jsonRes(res, 500, ex.message || ex.toString());
					}
				}
			});
		}
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}
});

router.get('/getHighscore', async(req,res) => {
	try {
		let idusuario = req.query["idusuario"];
		await Sql.conectar(async (sql) => {
			try {
				jsonRes(res, 200, await sql.scalar("select max(score) from highscore where idusuario = " + idusuario));
			} catch (ex) {
				if (ex.code) {
					switch (ex.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							jsonRes(res, 500, "Usuário não existe :(");
							break;
						default:
							jsonRes(res, 500, ex.message || ex.toString());
							break;
					}
				} else {
					jsonRes(res, 500, ex.message || ex.toString());
				}
			}
		});
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}	
});

router.get('/todayScore', async (req, res) => {
	try {
		await Sql.conectar(async (sql) => {
			try {
				jsonRes(res, 200, await sql.query("select max(h.score) score, u.login, count(u.login) vezes from highscore h inner join usuario u on u.id = h.idusuario where h.data = curdate() group by u.login order by max(h.score) desc, u.login asc"));
			} catch (ex) {
				if (ex.code) {
					switch (ex.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							jsonRes(res, 500, "Usuário não existe :(");
							break;
						default:
							jsonRes(res, 500, ex.message || ex.toString());
							break;
					}
				} else {
					jsonRes(res, 500, ex.message || ex.toString());
				}
			}
		});
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}
});
 
router.get('/scoreDiario', async (req,res) => {
	try {
		await Sql.conectar(async (sql) => {
			try {
				sql.query("select max(h.score) score, u.login, count(u.login) vezes from highscore h inner join usuario u on u.id = h.idusuario where h.data = curdate() group by u.login order by max(h.score) desc, u.login asc", function(error,result){
					res.render('scoreDiario', { title: 'GameLab', scores: result });	
				});
				
			} catch (ex) {
				if (ex.code) {
					switch (ex.code) {
						case "ER_NO_REFERENCED_ROW":
						case "ER_NO_REFERENCED_ROW_2":
							jsonRes(res, 500, "Usuário não existe :(");
							break;
						default:
							jsonRes(res, 500, ex.message || ex.toString());
							break;
					}
				} else {
					jsonRes(res, 500, ex.message || ex.toString());
				}
			}
		});
	} catch (ex) {
		jsonRes(res, 500, ex.message || ex.toString());
	}


    
});

module.exports = router;
