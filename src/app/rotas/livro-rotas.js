const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController();

const Livro = require('../models/livro');

module.exports = (app) => {
    const rotasLivro = LivroController.rotas();

    app.get(rotasLivro.lista, livroController.lista());

    app.route(rotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.validacoes(), livroController.cadastra())
        .put(Livro.validacoes(), livroController.edita());

    app.get(rotasLivro.edicao, livroController.formularioEdicao());

    app.delete(rotasLivro.remocao, livroController.remove());
};