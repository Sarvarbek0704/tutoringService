const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "owners",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration_weeks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "courses",
  }
);

Course.associate = function (models) {
  Course.belongsTo(models.Subject, {
    foreignKey: "subject_id",
    as: "subject",
  });
  Course.belongsTo(models.Owner, {
    foreignKey: "owner_id",
    as: "owner",
  });
  Course.hasMany(models.Enrollment, {
    foreignKey: "course_id",
    as: "enrollments",
  });
  Course.hasMany(models.Schedule, {
    foreignKey: "course_id",
    as: "schedules",
  });
  Course.hasMany(models.Payment, {
    foreignKey: "course_id",
    as: "payments",
  });
  Course.hasMany(models.Certificate, {
    foreignKey: "course_id",
    as: "certificates",
  });
};

module.exports = Course;
