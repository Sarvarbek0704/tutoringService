const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    activation_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    activation_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "clients",
  }
);

Client.associate = function (models) {
  Client.hasMany(models.Enrollment, {
    foreignKey: "student_id",
    as: "enrollments",
  });
  Client.hasMany(models.Payment, {
    foreignKey: "student_id",
    as: "payments",
  });
  Client.hasMany(models.Certificate, {
    foreignKey: "student_id",
    as: "certificates",
  });
};

module.exports = Client;
