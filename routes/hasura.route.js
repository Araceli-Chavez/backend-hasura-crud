import { Router } from 'express';
import { actualizarDatosPreactivaciontarjeta, eliminarPreactivaciontarjeta, insertarDatosPreactivaciontarjetas, obtenerPreactivaciontarjeta, obtenerPreactivaciontarjetas } from '../controllers/hasura.controller.js';
import { validacionBodyTarjeta, validacionParamTarjeta } from '../middlewares/validatorManager.js';


const router = Router();

router.post("/insertar-preactivaciontarjeta", validacionBodyTarjeta, insertarDatosPreactivaciontarjetas);
router.get("/consultar-preactivaciontarjetas", obtenerPreactivaciontarjetas);
router.get("/:tarjeta", validacionParamTarjeta, obtenerPreactivaciontarjeta);
router.delete("/:tarjeta", validacionParamTarjeta, eliminarPreactivaciontarjeta);
router.put("/actualizar-preactivaciontarjeta", validacionBodyTarjeta, actualizarDatosPreactivaciontarjeta);


export default router;