import jwt from "jsonwebtoken";
import { Request, Response } from "express"

export const verifyToken = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send({ message: "Token Obrigatório"})
    }

    // por padrao o token é do tipo 'bearer', ou seja, 
    // esse nome vai vir concatenado na chave secreta portanto precisamos
    // retirar ele antes de jogaar no metodo que vai comparar se a chave 
    // secreta que esta vindo da requisicao é a mesma que definimos, confirmando portanto a autenticacao.
    try {
        // aqui estamos retirando a palavra 'Bearer' no primeiro parametro e substituindo por nada "" no segundo parametro
        const replace = token.replace("Bearer ", ""); // cuidado como o primeiro parametro do metodo replace pois espacos em branco tem significado e nesse caso é intencional que o metodo retive o espaço depois da palavra tambem
        jwt.verify(replace, String(process.env.TOKEN_KEY)) // neste ponto estamos verificando se o token enviado no request que ja foi devidademente tratado é igual com o que foi definido lá no 'Dotenvi, nao atribuimos a uma variável pois se der erro ja vai subir um alerta, caso de tudo certo a execucao continua normalmente e vai para 'next()'
        next();
    } catch (e) {
        res.status(401).send({ message: "Credenciais inválidas"  })
        console.log(e)
    }
}