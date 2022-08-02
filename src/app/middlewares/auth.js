import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authCofig from '../../config/auth'


export default async (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders) {
        return res.status(401).json({
            message: 'Para acessar este serviço é necessário estar logado'
        })
    }

    const [ , token] = authHeaders.split(' ')  // o split pega umas string e faz uma divisão a partir do cacter indicado dentro do paranteses, que neste caso é um 'espaço'

    try {

        const decoded = await promisify(jwt.verify)(token, authCofig.secret)
        req.useId = decoded.id;
        next()

    } catch (error) {
    return res.status(401).json({
        message: 'Token inválido'
    })
    }

    next();
}  