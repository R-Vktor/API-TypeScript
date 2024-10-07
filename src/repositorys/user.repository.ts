// aqui vamos importar a instancia do prisma para poder fazer-mos acesso ao banco de dados
import { prisma } from "../services/prisma";

// User vai ser um type para definir as propriedades que irao chegar no request
import  User  from "../types/user.types"


export const createUser = async( data: User ): Promise<[]> => { 
    // Quando um usuario for criado vamos usar ess funcao async 
    // para criar o registro na tabela, os dados para preenchimento 
    // estao dentro do parametro data.

    // O prisma possui o metodo 'select' que recebe um objeto como parametro
    // para definir quais informacoes serao exibidas no retorno de um consulta.
    // Precisamos definir esse objeto em todas as funcoes que vao acessar  banco de dados. 
    // perceba o poder dessa abstracao, em uma mesma funcao, mandamos dados para o 
    // banco de dados e ja pedimos os dados para poder devolver posteriormente na
    // resposta à aplicacao cliente.
    const user = await prisma.usuarios.create({
        data,
        select: {
            id: true,
            name: true,
            password: false,
            email: true
        }
    });
    return user;
}


// Para adicionar paginacao precisaremos usar dois parametros, 
// um que vai conter a posicao do registro de inicio da 
// busca e o segundo vai conter o valor da posicao do 
// ultimo resgistro a ser retornado criando assim um 
// intervalo. Entao a busca fica assim 'busque(iniciando na posicao tal, ate posicao tal)'

//  Como estamos tipando com o typeScript será necessario tipar 
// esses dois parametros e como os mesmos vao receber numeros para 
// montar as estratégia de paginacao precisamos definir um type para 
// eles pois no request poder vir um dado numerico ou pode ser nulo,
// conforme foi definido previamente no controller, eles podem ser "numeros ou null"
// como no controller ja foi definido essa estratégia de valores por padrao, aqui 
//vamos apenas definir o tipo 'number' para cocntinuar em conformidade
export const getAll = async (skip: number, take: number) => {
    const [users, total] = await prisma.$transaction([
        // note estamos usando 'destructuring' entao a funcao findMany() e todo seu corpo representam apenas o primeiro parametro
        // e ficarao contidad na constante 'users', já o prisma.usuarios.count() 
        // vai ficar contido na constante 'total'
        prisma.usuarios.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                password: false
            },
            skip,
            take,
        }),

        prisma.usuarios.count(),
    ]);

    const totalPage = Math.ceil(total / take);

    return { total, totalPage, users };
//    const users = await prisma.usuarios.findMany({
//        select: {
//            id: true,
//            name: true,
//            email: true,
//            password: false
//
//        }
//    });
//    return users; 
}

// neste ponto definimos o " ID " como string pois é assim que o mesmo chega da request e tambem foi assim que ele foi definido no lá no arquivo de schemma do prisma
export const getById = async (id: string) => {
    const user = await prisma.usuarios.findUnique({
        where: {
            id, 
        },
        select: {
            id: true,
            name: true,
            password: false,
            email: true
        }
    });
    return user;
}

export const updateUser = async (id: string, data: User) => {
    const user = await prisma.usuarios.update({
        where: {  
            id
        },
        data,
        select: {
            id: true,
            name: true,
            password: false,
            email: true
        }
    })
    return user;
}

// neste caso em especifico com a acao de deletar nao exige 
// que capturemos o registro que vai ser excluido, portanto nao atribuimos
//  a acaho a uma constante e nem retornamos nada além de um status code
//  sinalizando a operacao concluida com sucesso
export const deleteUser = async (id: string) => {
    await prisma.usuarios.delete({
        where: {
            id
        },
    });
    return;
}