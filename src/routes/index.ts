// este vai ser o arquivo que vai receber e linkar as 
// rotas que chegam no express disponiveis em 'app' 
// com o arquivo index.ts 
// que vai fazer o encaminhamento para a 
// rota pertinente e dentro da rota será 
// feita a comunicacao com o controller pertinente
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

// neste ponto nao nomeamos a funcao pois ela será 
// usada de uma forma diferente, 
// ao inves de importarmos e atribuirmos um nome lá 
// no arquivo pertinente,
// vamo dar o import e ja passando o parametro que 
// a funcao deve receber entre parenteses.
// Dessa forma economizamos memória.

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app)
    
};
  
  export default routes;