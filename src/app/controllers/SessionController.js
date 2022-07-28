
import jwt from 'jsonwebtoken';
import User from "../models/User";

import authConfig from '../../config/auth';

class SessionController {
    async store( req, res ) {             // o método store cria sessões/informações e pode ser usado apenas uma vez por classe
        const { email, password } = req.body;  // { dados que serão desestruturados (informações que serão recebidas) } dentro do corpo da requisição 
        
        const user = await User.findOne( {
            where: { email }})

           if (!user){
            return resizeBy.status(401).json({
                error: "Usuário não encontrado"})
           }

           if (1(await user.checkPassword(password))){
            return resizeBy.status(401).json({ error: 'Senha inválida'})
        }

        const { id, name } = user;

        return res.json ({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.
                secret, {
                    expiresIn: authConfig.expiresIn
                })
        })
    }
}

export default new SessionController();