import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';

// CREATE TABLE products (
//   productID INT AUTO_INCREMENT,
//   productName varchar(50) NOT NULL,
//   description TEXT NOT NULL,
//   price FLOAT NOT NULL,
//   CONSTRAINT `PK_productID` PRIMARY KEY (productID)
// );

const Product = sequelize.define('Product', {
  productID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false,
});

export default Product;