const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Enrollment = sequelize.define(
  "enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "contracts",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
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
    status: {
      type: DataTypes.STRING(18),
      allowNull: false,
      defaultValue: "active",
    },
    enrolled_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "enrollments",
  }
);

Enrollment.associate = function (models) {
  Enrollment.belongsTo(models.Contract, {
    foreignKey: "contract_id",
    as: "contract",
  });
  Enrollment.belongsTo(models.Client, {
    foreignKey: "student_id",
    as: "student",
  });
  Enrollment.belongsTo(models.Course, {
    foreignKey: "course_id",
    as: "course",
  });
};

module.exports = Enrollment;
