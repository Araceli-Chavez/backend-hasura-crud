import { body, param } from "express-validator";
import { validationErrores } from "./validationResult.js";


export const validacionBodyTarjeta = [
    body("tarjeta", "La tarjeta no cumple con el formato de Tiendas Garces")
        .trim()
        .isNumeric()
        .isLength({min: 13, max: 13})
        .custom((value) => {
            if (!value.startsWith("71") && !value.startsWith("75") && !value.startsWith("77")) {
                throw new Error("Verifica que el número de tarjeta inicie con 71, 75, o 77");
            }
            return true;
        }), 
    validationErrores
];

export const validacionParamTarjeta = [
    param("tarjeta", "La tarjeta no cumple con el formato de Tiendas Garces")
        .trim()
        .isNumeric()
        .isLength({min: 13, max: 13})
        .custom((value) => {
            if (!value.startsWith("71") && !value.startsWith("75") && !value.startsWith("77")) {
                throw new Error("Verifica que el número de tarjeta inicie con 71, 75, o 77");
            }
            return true;
        }), 
    validationErrores
]