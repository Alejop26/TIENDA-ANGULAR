import User from "../models/user.models.js";

const pingController = async (req, res) => {
    try {
        const results = await User.findAll();
        console.log(results);
        res.json(results);//se envia la respuesta en formato json 
    } catch (error) {
        console.log(error);
    }
};

export default pingController;

//este código muestra un controlador para una ruta específica que realiza una consulta a la base de datos para obtener todos los registros de usuarios y los envía como respuesta en formato JSON.