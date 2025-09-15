const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(18),
      defaultValue: "process",
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "contracts",
  }
);

Contract.associate = function (models) {
  Contract.hasMany(models.Enrollment, {
    foreignKey: "contract_id",
    as: "enrollments",
  });
  Contract.hasMany(models.Payment, {
    foreignKey: "contract_id",
    as: "payments",
  });
};

module.exports = Contract;
