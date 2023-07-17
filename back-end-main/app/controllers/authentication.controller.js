import jwt from "jsonwebtoken";//Esta librería es comúnmente utilizada para trabajar con JSON Web Tokens (JWT)

const loginController = async (req, res) => {
  return res.send(
    jwt.sign({ test: "payload" }, "secretKey", { expiresIn: "1h" })//Dentro de la función loginController, se está utilizando jwt.sign() para crear un nuevo token JWT. El método sign toma tres argumentos:
  );
};

export default loginController; //Finalmente, la función loginController se exporta como valor predeterminado para que pueda ser utilizada en otros archivos de la aplicación
