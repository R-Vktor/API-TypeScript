// aqui na rota '/user' será chamada a funcao de criaação de usuario que está no 
// controller que é responssável por fazer a comunicacao com o banco de dados.
import { create, get, getId, update, remove } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth"

// neste ponto as rotas serao definidas de uma forma diferente do padarao adotado ate hoje
// vamos fazer uma funcao ja sendo exportada e recebendo a instancia do express 
// que por padaro receb primeiro as requisicoes e dentro da funcao
// vai ficar o tipo da rota sendo acessada diretamente de 'app' 

const userRoutes = (app: any) => {
    // aqui dentro temos a rota e a funcionalidade que vai ser acessada através da rota.
    app.post("/user", create); // nao adicionamos token aqui pois o usuario nao existe ainda, só apos sua criacao que ele vai receber autenticacao
    app.get("/user", verifyToken, get);
    app.get("/user/:id", verifyToken, getId); // lembre-se que os dois pontos significa que estamos esperando um parametro
    app.put("/user/:id", verifyToken, update);
    app.delete("/user/:id", verifyToken, remove); 
};

export default userRoutes;