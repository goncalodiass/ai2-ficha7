const express = require('express');
const app = express();

const filmesRouters = require('./routes/filmesRoutes');
const generoRouters = require('./routes/generoRoutes');

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Rotas
app.use('/filmes', filmesRouters);
app.use('/genero', generoRouters);

app.listen(app.get('port'), () => {
    console.log("Start server on port "+app.get('port'));
});
