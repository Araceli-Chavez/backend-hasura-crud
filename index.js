
import 'dotenv/config';
import express  from 'express';
//import { probarConexionHasura }  from './controllers/hasura.controller.js';

import preactivaciontarjetasRouter from './routes/hasura.route.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use("/api/v1/preactivaciontarjetas", preactivaciontarjetasRouter);

app.listen(PORT, () => { console.log("Servidor activado http://localhost:" + PORT);
//probarConexionHasura();
});
