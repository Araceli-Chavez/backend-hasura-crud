import axios from "axios";


const BASE_URL_HASURA = process.env.BASE_URL_HASURA;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

/*const probarConexionHasura = async () => {
  
  const query = `
    query {
      tbl_users {
        id_user
        name
      }
    }
  `;
  try {
    const response = await axios.post(
      BASE_URL_HASURA,
      { query },
      {
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.data && response.data.data.tbl_users) {
      console.log("La conexión con Hasura se realizó correctamente");
      console.log("Datos de la tabla tbl_users:", response.data.data.tbl_users);
    } else {
      console.error("Error en la conexión con Hasura:", response.data);
    }
  } catch (error) {
    console.error("Error en la conexión con Hasura:", error.response.data);
  }
};*/

export const insertarDatosPreactivaciontarjetas = async (req, res) => {
    try {
      const datos = req.body;
      const rutaInsertarPreactivacionTarjetasHasura =
      process.env.BASE_URL_HASURA + 
      process.env.URL_INSERTAR_PREACTIVACIONTARJETAS_HASURA;
      const respuesta = await axios({
          method: "post",
          url: rutaInsertarPreactivacionTarjetasHasura,
          data: datos,
          headers: {
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json'
          }
        });
        console.log(respuesta.data);
        if (respuesta.status === 200) {
            res.status(200).json({ status: 200, message: "Datos insertados correctamente" });
        }
    } catch (error) {
        console.error("Error al insertar datos:", error);
        if (error.response && error.response.data && error.response.data.error.includes('Uniqueness violation')) {
          return res.status(500).json({ status: 500, message: "La tarjeta ya existe en la base de datos", error: error.response.data.error });
        } else {
          return res.status(400).json({ status: 400, message: "Error al insertar los datos", error: error.response.data.error });
        }
    } 
};

export const obtenerPreactivaciontarjetas = async (req, res) => {
  try {
    const rutaObtenerPreactivacionTarjetasHasura =
    process.env.BASE_URL_HASURA +
    process.env.URL_OBTENER_PREACTIVACIONTARJETAS_HASURA;
    const respuesta = await axios({
      method: "get",
      url: rutaObtenerPreactivacionTarjetasHasura,
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        'Content-Type': 'application/json'
      }
    });
    console.log(respuesta.data);
    if (respuesta.status === 200 && respuesta.data.dbo_PreactivacionTarjetas.length > 0) {
      res.status(200).json(respuesta.data.dbo_PreactivacionTarjetas);
    } else {
      res.status(404).json({ status: 404, message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ status: 500, message: "Error al obtener datos" });
  }
};

export const obtenerPreactivaciontarjeta = async (req, res) => {
  try {
    const { tarjeta } = req.params;
    const rutaObtenerPreactivacionTarjetaHasura = 
    process.env.BASE_URL_HASURA + 
    process.env.URL_OBTENER_PREACTIVACIONTARJETA_HASURA;
    const respuesta = await axios({
      method: "get",
      url: rutaObtenerPreactivacionTarjetaHasura,
      params: {
        tarjeta: tarjeta
      },
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        'Content-Type': 'application/json'
      }
    });
    console.log(respuesta.data);
    if (respuesta.status && respuesta.data.dbo_PreactivacionTarjetas.length > 0) {
      res.status(200).json(respuesta.data.dbo_PreactivacionTarjetas);
    } else {
      res.status(404).json({ status:404, message: "No se encontraron datos para la tarjeta proporcionada" });
    }
  } catch (error) {
    console.error("Error al obtener datos de la tarjeta:", error);
    res.status(500).json({ status: 500, message: "Error al obtener datos de la tarjeta" });
  }
};

export const eliminarPreactivaciontarjeta = async (req, res) => {
  try {
    const tarjeta = req.params.tarjeta;
    const rutaEliminarPreactivacionTarjetaHasura = 
    process.env.BASE_URL_HASURA +
    process.env.URL_ELIMINAR_PREACTIVACIONTARJETA_HASURA;
    const respuesta = await axios({
      method: "delete",
      url: rutaEliminarPreactivacionTarjetaHasura,
      headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
          'Content-Type': 'application/json'
      },
      params: {
        tarjeta: tarjeta
      }
    });
    console.log(respuesta.data);
    if (respuesta.status === 200 && respuesta.data.delete_dbo_PreactivacionTarjetas.affected_rows === 1) {
       res.status(200).json({ status: 200, message: "Tarjeta eliminada correctamente" });
    } else {
      res.status(404).json({ status: 404, message: "La tarjeta no existe en la base de datos"});
    }
  } catch (error) {
    console.error("Error al eliminar tarjeta", error);
    res.status(500).json({ status: 500, message: "Error al eliminar la tarjeta", error: error.response.data.error });
  }
};


export const actualizarDatosPreactivaciontarjeta = async (req, res) => {
  try {
    const nuevosDatos = req.body;
    const rutaActualizarPreactivacionTarjetaHasura = 
    process.env.BASE_URL_HASURA +
    process.env.URL_ACTUALIZAR_PREACTIVACIONTARJETA_HASURA;
    const respuesta = await axios({
      method: "put",
      url: rutaActualizarPreactivacionTarjetaHasura,
      data: nuevosDatos,
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        'Content-Type': 'application/json'
      }
    });
    console.log(respuesta.data);

    if (respuesta.status === 200 && respuesta.data.update_dbo_PreactivacionTarjetas.affected_rows === 1) {
      res.status(200).json({ status: 200, message: "Datos actualizados correctamente" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró el registro de la tarjeta" });
    }
  } catch (error) {
    console.error("Error al actualizar datos", error);
    res.status(500).json({ status: 500, mensaje: "Error al actualizar datos", error: error.response.data.error });
  }
};

export { /*probarConexionHasura,*/ };