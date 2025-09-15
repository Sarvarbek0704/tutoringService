const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Schedule = sequelize.define(
  "schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    day_of_week: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "schedules",
  }
);

Schedule.associate = function (models) {
  Schedule.belongsTo(models.Course, {
    foreignKey: "course_id",
    as: "course",
  });
};

module.exports = Schedule;
