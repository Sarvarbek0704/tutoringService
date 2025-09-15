const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(18),
      defaultValue: "unpaid",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "payments",
  }
);

Payment.associate = function (models) {
  Payment.belongsTo(models.Client, {
    foreignKey: "student_id",
    as: "student",
  });
  Payment.belongsTo(models.Course, {
    foreignKey: "course_id",
    as: "course",
  });
  Payment.belongsTo(models.Contract, {
    foreignKey: "contract_id",
    as: "contract",
  });
};

module.exports = Payment;
