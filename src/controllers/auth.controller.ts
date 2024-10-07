import { prisma } from "../services/prisma";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// neste ponto definimos qual ou quais dos parametros 
// que sao recebidos no request serao requisitado pela autenticacao.
export const authenticate = async (req: Request, res: Response) => {
    try {
        const { email, password} = req.body;

        if(!(email && password)) {
            return res              // o Status e o send fazem parte do 'res' so estao com quebra de linha para poder visualizar melhor
                .status(400)
                .send({ message: "Usuário e senha são obrigatório" })
        }
            // neste ponto acessamos o banco de dados e pegamos o primeiro usuari que der match com o/ou so dados passados dentro do where
        const user = await prisma.usuarios.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(401).send({ message: "Email e/ou senha estao incorretos"}); 
        }
            // neste ponto que chamamos o metodo do bcrypt 'compare' 
            //para verificar se  que o usuario digitou possui 
            // correspondencia com o dado que esta encriptado lá no banco de dados
            
            // Além disso temos nesse 'if' a verificacao se a constante user esta 
            //com algum dado e em seguida acessamos ele e usamosoas dados pertinentes para 
            //jogar no metodo 'compare'
        if (user && bcrypt.compareSync(password, user.password)) { // Aqui usamos o metodo 'compareSync' pois a funcao que o contém já é assíncrona, estamos comparando o password digitado pelo usuario com o password que ja esta encriptado no banco
            
            // se tudo estiver correto entao vamos gerar um 'token'

            // Comecamos pelo 'data'  que sao as informacoes que queremos que percorra 
            // para serem verificadas sempre que houver necessidade
             const token = jwt.sign(  
                    {
                        id: user.id,
                        email,
                        name:user.name
                    },
                    String(process.env.TOKEN_KEY), // aqui colocamos a sequencia de caracteres que adicionamos para ser a chave privada, devemos colocar no 'dotEnv' para garantir a seguranca dessa informacao. É necessário converter para 'String' quando usamos o TypeScript pois ele só entende dessa forma essa sequencia
                    {
                        expiresIn: "3h" // nesso ponto definimos o tempo que o token vai durar
                    }
                )
                // depois da verificacao  e posterior criacao do 'token' agora enviamos ele através do metodo 'sen()'
                return res.status(200).send({ token })
        } else {
            return res.status(401).send({ message: "Email e/ou senha estao incorretos" })
        }
    } catch (e) {
        res.status(400).send(e)
    }
}