// services/analyticsService.js
const db = require("../config/db");

const getServicesUsedInPeriod = async (startDate, endDate) => {
  try {
    const query = `
      SELECT 
        c.name as course_name,
        s.name as subject_name,
        COUNT(e.id) as usage_count,
        COALESCE(SUM(p.amount), 0) as total_revenue
      FROM enrollments e
      INNER JOIN courses c ON e.course_id = c.id
      INNER JOIN subjects s ON c.subject_id = s.id
      LEFT JOIN payments p ON e.course_id = p.course_id AND e.student_id = p.student_id
      WHERE e.enrolled_at BETWEEN ? AND ?
      GROUP BY c.id, c.name, s.name
      ORDER BY usage_count DESC
    `;

    const result = await db.query(query, [startDate, endDate]);
    return result.rows;
  } catch (error) {
    console.error("SQL Xatosi:", error);
    throw new Error(`Xizmatlar ro'yxatini olishda xatolik: ${error.message}`);
  }
};

const getClientsUsedServiceInPeriod = async (startDate, endDate) => {
  try {
    const query = `
      SELECT DISTINCT
        cl.id,
        cl.full_name,
        cl.email,
        cl.phone,
        c.name as course_name,
        e.enrolled_at
      FROM clients cl
      INNER JOIN enrollments e ON cl.id = e.student_id
      INNER JOIN courses c ON e.course_id = c.id
      WHERE e.enrolled_at BETWEEN ? AND ?
      ORDER BY e.enrolled_at DESC
    `;

    const result = await db.query(query, [startDate, endDate]);
    return result.rows;
  } catch (error) {
    console.error("SQL Xatosi:", error);
    throw new Error(`Clientlar ro'yxatini olishda xatolik: ${error.message}`);
  }
};

const getClientsCancelledServiceInPeriod = async (startDate, endDate) => {
  try {
    const query = `
      SELECT 
        cl.id,
        cl.full_name,
        cl.email,
        cl.phone,
        c.name as course_name,
        e.enrolled_at,
        e.canceled_at,
        EXTRACT(EPOCH FROM (e.canceled_at - e.enrolled_at)) / 86400 as usage_duration_days
      FROM clients cl
      INNER JOIN enrollments e ON cl.id = e.student_id
      INNER JOIN courses c ON e.course_id = c.id
      WHERE e.canceled_at IS NOT NULL 
        AND e.canceled_at BETWEEN ? AND ?
      ORDER BY e.canceled_at DESC
    `;

    const result = await db.query(query, [startDate, endDate]);
    return result.rows;
  } catch (error) {
    console.error("SQL Xatosi:", error);
    throw new Error(
      `Bekor qilgan clientlar ro'yxatini olishda xatolik: ${error.message}`
    );
  }
};

const getTopOwnersByService = async (serviceName) => {
  try {
    const query = `
      SELECT 
        o.id,
        o.full_name,
        o.email,
        o.specialization,
        COUNT(e.id) as completed_courses,
        COALESCE(AVG(CAST(cert.grade AS NUMERIC)), 0) as average_grade
      FROM owners o
      INNER JOIN courses c ON o.id = c.owner_id
      INNER JOIN subjects s ON c.subject_id = s.id
      INNER JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN certificates cert ON e.course_id = cert.course_id AND e.student_id = cert.student_id
      WHERE s.name = ? AND e.status = 'completed'
      GROUP BY o.id, o.full_name, o.email, o.specialization
      ORDER BY completed_courses DESC
    `;

    const result = await db.query(query, [serviceName]);
    return result.rows;
  } catch (error) {
    console.error("SQL Xatosi:", error);
    throw new Error(`Ownerlar ro'yxatini olishda xatolik: ${error.message}`);
  }
};

const getClientPaymentsWithOwners = async (clientId) => {
  try {
    const query = `
      SELECT 
        p.id as payment_id,
        p.amount,
        p.payment_date,
        p.status as payment_status,
        c.name as course_name,
        s.name as subject_name,
        o.full_name as owner_name,
        o.email as owner_email,
        o.specialization
      FROM payments p
      INNER JOIN courses c ON p.course_id = c.id
      INNER JOIN subjects s ON c.subject_id = s.id
      INNER JOIN owners o ON c.owner_id = o.id
      WHERE p.student_id = ?
      ORDER BY p.payment_date DESC
    `;

    const result = await db.query(query, [clientId]);
    return result.rows;
  } catch (error) {
    console.error("SQL Xatosi:", error);
    throw new Error(`Paymentlar ro'yxatini olishda xatolik: ${error.message}`);
  }
};

module.exports = {
  getServicesUsedInPeriod,
  getClientsUsedServiceInPeriod,
  getClientsCancelledServiceInPeriod,
  getTopOwnersByService,
  getClientPaymentsWithOwners,
};
