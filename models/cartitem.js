'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  CartItem.associate = function(models) {
      CartItem.belongsTo(models.Product);
      CartItem.belongsTo(models.User);
  };
  return CartItem;
};