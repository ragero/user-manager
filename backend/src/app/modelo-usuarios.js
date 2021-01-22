const { check } = require('express-validator')

class UserModel {



    static validacoes() {
        return [
            [
                check('email').isEmail().withMessage('Formato de e-mail inválido').trim(),
                check('nome').trim().isLength({ min: 3, max: 45 }).withMessage('O nome deve ter entre 3 e 45 caracteres.').trim().escape(),
                check('senha',).trim().isLength({ min: 3, max: 15 }).withMessage('A senha deve ter entre 6 e 15 caracteres.'),
                check('imagem')
                    .custom((value, { req }) => {
                        
                        if(req.file !== undefined){
                            if (req.file.mimetype.startsWith('image')) {
                                return true; 
                            } else {
                                return false; 
                            }
                        }else{ 
                            req.file = {path: ''}
                            return true
                        }
                        
                        
                    })
                    .withMessage('São aceitos apenas arquivos em formato de imagem (ex: png, jpg e jpeg).'), // custom error message that will be send back if the file in not a pdf. 
            ]
        ]
    }



}

module.exports = UserModel

