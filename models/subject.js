const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Subject = sequelize.define(
  "subject",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(70),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "subjects",
  }
);

Subject.associate = function (models) {
  Subject.hasMany(models.Course, {
    foreignKey: "subject_id",
    as: "courses",
  });
};

module.exports = Subject;
