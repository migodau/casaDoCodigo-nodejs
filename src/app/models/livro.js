const { check } = require('express-validator/check');

class Livro {
    static validacoes() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O titulo deve ter mais de 3 caracteres'), 
            check('preco').isCurrency().withMessage('O preço deve ser um valor monetário')
        ];
    }
}

module.exports = Livro;