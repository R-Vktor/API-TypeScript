// fluxo da aplicacao
/* 
    A requisicao chega no express e fica disponivel para acesso 
    através da instancia do express contida na constante 'app'.
    A logica das rotas usada para este projeto será um arquivo que vai receber o 'app' - (lembrando que o metodo app do express vai conter as requisicoes e as respostas) e dentro dele o app(contendo os req e o re) será passado para a rota pertinente e dentro dessa rota será encaminhado para o controller pertinente.
    Entao fica index.js > ./routes/index.js > rotaEspecifica.routes.js > controllerEspecifico.controller.js e este por sua vez faz as acoes necessarias, seja comunicacao com o banco, entre outras coisas  etc...
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); //  para fazer o parse das informacoes para o formato JSON

// Aqui terminamos de fazer o link das requisicoes que chegam para o arquivo de rotas.
routes(app); // desta forma nao precisamos atribuir nome ao import e depois passar o 'app' como parametro, economizamos memória e funciona da mesma forma que a tradicional

app.listen(3001, () => {
    console.log("API iniciada na porta 3001");
})