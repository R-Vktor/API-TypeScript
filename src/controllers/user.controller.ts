import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";
import { Request, Response } from "express";
import { 
    createUser,
    getAll,
    getById,
    updateUser,
    deleteUser
} from "../repositorys/user.repository";

// Agora com a adicao do 'bcrypt' ao projeto vamos adicionar o metodo de criacao de 'hash' do 'bcrypt' para encriptar a senha do usuario que está sendo criado e posteriormente armazenar esse hash no banco de dados no lugar da senha explicita
export const create = async (req: Request, res: Response) => {
    try {
        await userValidation.validate(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 10); // neste ponto esta sendo criado o hash com adicao d e 10 caracteres aleatorios
        req.body.password = hashPassword; // neste ponto o hash esta sendo inserido no lugar da senha que vei da requisicao
        const user =  await createUser(req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(`erro na conexao com o banco ${e}`);
        console.log(e);
    }
}; 

export const get = async (req: Request, res: Response) => {
    // ao migrar para o typeScrypt foi necessário definir la no model/repository que o 'skip' e o 'take' sao numericos ou null quando estes nao receberem valores vindos do request
    try {
        const skip = Number(req?.query?.skip) || 0;
        const take = Number(req?.query?.take) || 20;
        const users = await getAll(skip, take);
        res.status(200).send(users)
    }catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
}

export const getId = async (req: Request, res: Response) => {
    try{
        const user = await getById(req.params.id);
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
        console.log(e);
    }
}

export const update = async (req: Request, res: Response) => {
    try{
        const user = await updateUser(req.params.id, req.body);
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e);
        console.log(e);
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).send('Registro excluido com sucesso!!!');
    }catch(e) {
        res.status(400).send(e);
        console.log(e)
    }
};