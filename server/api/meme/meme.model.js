'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Meme', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    imgLink: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    comments: DataTypes.STRING
  });
}
