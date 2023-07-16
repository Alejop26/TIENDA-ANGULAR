import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB_HOST
      : process.env.DEV_DB_HOST,
  username: process.env.DB_USER,
  password:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB_PASSWORD
      : process.env.DEV_DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    port: dbConfig.port,
    define: {
      timestamps: false,
    },
  }
)

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

export default sequelize;
