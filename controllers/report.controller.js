const { Op } = require("sequelize");
const { Enrollment, Client, Course, Owner, Payment } = require("../models");

//=======================================    1    =================================================

exports.getUsedServices = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const enrollments = await Enrollment.findAll({
      where: {
        enrolled_at: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "name"],
          include: [
            { model: Owner, as: "owner", attributes: ["id", "full_name"] },
          ],
        },
      ],
    });
    res.json({ data: enrollments });
  } catch (error) {
    next(error);
  }
};

//=======================================    2    =================================================

exports.getClientsUsedServices = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const clients = await Client.findAll({
      include: [
        {
          model: Enrollment,
          as: "enrollments",
          where: {
            enrolled_at: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
          include: [
            { model: Course, as: "course", attributes: ["id", "name"] },
          ],
        },
      ],
    });

    res.json({ data: clients });
  } catch (error) {
    next(error);
  }
};

//=======================================    3    =================================================

exports.getClientsCanceledServices = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const clients = await Client.findAll({
      include: [
        {
          model: Enrollment,
          as: "enrollments",
          where: {
            status: "cancelled",
            canceled_at: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          },
          include: [
            { model: Course, as: "course", attributes: ["id", "name"] },
          ],
        },
      ],
    });

    res.json({ data: clients });
  } catch (error) {
    next(error);
  }
};

//=======================================    4    =================================================

exports.getTopOwnersByService = async (req, res, next) => {
  try {
    const { serviceName } = req.query;

    const owners = await Owner.findAll({
      include: [
        {
          model: Course,
          as: "courses",
          where: { name: serviceName },
          include: [{ model: Enrollment, as: "enrollments" }],
        },
      ],
    });

    const result = owners.map((o) => ({
      owner: o.full_name,
      courses: o.courses.map((c) => c.name),
      total_enrollments: o.courses.reduce(
        (sum, c) => sum + (c.enrollments ? c.enrollments.length : 0),
        0
      ),
    }));

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

//=======================================    5    =================================================

exports.getPaymentsByClient = async (req, res, next) => {
  try {
    const { clientId } = req.query;

    const payments = await Payment.findAll({
      where: { student_id: clientId },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "name"],
          include: [
            { model: Owner, as: "owner", attributes: ["id", "full_name"] },
          ],
        },
      ],
    });

    res.json({ data: payments });
  } catch (error) {
    next(error);
  }
};
