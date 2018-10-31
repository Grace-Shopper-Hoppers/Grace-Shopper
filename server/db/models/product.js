const db = require('../db')
const Sequelize = require ('sequelize')

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        // get() {
        //     return () => this.getDataValue('password')
        // }
    },
    inventory: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
        //defaultValue: defaultPic
    },
})

module.exports = Product