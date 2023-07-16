import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/database.js';

// CREATE TABLE productsImages (
//     imageID INT AUTO_INCREMENT,
//     productID INT NOT NULL,
//     isFront BIT DEFAULT 0 NOT NULL,
//     imageURL varchar(500) NOT NULL,
//     CONSTRAINT `PK_imageID` PRIMARY KEY (imageID),
//     CONSTRAINT `FK_productID_productsImages` FOREIGN KEY (productID) REFERENCES products(productID)
// );

const ProductImage = sequelize.define('ProductImage', {
    imageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isFront: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imageURL: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'productsImages',
    timestamps: false,
});

export default ProductImage;
