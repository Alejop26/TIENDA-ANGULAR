import Sequelize from 'sequelize';
import sequelize from '../../config/db/database.js';

// CREATE TABLE users (
//     userID INT AUTO_INCREMENT,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     fullName VARCHAR(50) NOT NULL,
//     email VARCHAR(120) NOT NULL UNIQUE,
//     phone VARCHAR(20),
//     role ENUM('client', 'admin') NOT NULL DEFAULT 'client',
//     address TEXT,
//     registrationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT `PK_userID` PRIMARY KEY (userID)
// );

const User = sequelize.define('user', {
    userID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    fullName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING(20)
    },
    role: {
        type: Sequelize.ENUM('client', 'admin'),
        allowNull: false,
        defaultValue: 'client'
    },
    address: {
        type: Sequelize.TEXT
    },
    registrationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
});

export default User;
