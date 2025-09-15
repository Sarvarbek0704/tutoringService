const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Certificate = sequelize.define(
  "certificate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    issued_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    grade: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "certificates",
  }
);

Certificate.associate = function (models) {
  Certificate.belongsTo(models.Client, { foreignKey: "student_id" });
  Certificate.belongsTo(models.Course, { foreignKey: "course_id" });
};

module.exports = Certificate;
