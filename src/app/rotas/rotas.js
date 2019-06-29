const db = require('../../config/database');
const LivroDao = require('../infra/livros-dao')

module.exports = (app) => {
    app.get('/', function(req, res){
        res.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Casa do Código</h1>
            </body>
        </html>`);
    });
    
    app.get('/livros', function(req, res){
        const livroDao = new LivroDao(db);
        livroDao.lista().
        then((livros) => {
            res.marko(
                require('../views/livros/lista/lista.marko'),
                { livros }
            );
        })
        .catch(err => console.log(err));
    });

    app.get('/livros/form', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko'), { livro: {} }
        );
    });

    app.post('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then((livros) => {
            res.redirect('/livros');
        })
        .catch(err => console.log(err));
    });

    app.put('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
        .then((livros) => {
            res.redirect('/livros');
        })
        .catch(err => console.log(err));
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
        .then(res.status(200).end())
        .catch(err => console.log(err));
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });
}
