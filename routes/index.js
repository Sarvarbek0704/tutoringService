const adminRouter = require("./admin.routes");
const certificateRouter = require("./certificate.routes");
const clientRouter = require("./client.routes");
const contractRouter = require("./contract.routes");
const courseRouter = require("./course.routes");
const enrollmentRouter = require("./enrollment.routes");
const ownerRouter = require("./owner.routes");
const paymentRouter = require("./payment.routes");
const scheduleRouter = require("./schedule.routes");
const subjectRouter = require("./subject.routes");

const router = require("express").Router();

router.use("/admin", adminRouter);
router.use("/certificate", certificateRouter);
router.use("/client", clientRouter);
router.use("/contract", contractRouter);
router.use("/course", courseRouter);
router.use("/enrollment", enrollmentRouter);
router.use("/owner", ownerRouter);
router.use("/payment", paymentRouter);
router.use("/schedule", scheduleRouter);
router.use("/subject", subjectRouter);

module.exports = router;
