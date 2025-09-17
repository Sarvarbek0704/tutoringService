const {
  Admin,
  Certificate,
  Client,
  Contract,
  Course,
  Enrollment,
  Owner,
  Payment,
  Schedule,
  Subject,
} = require("./models");

function applyAssociations() {
  const models = {
    Admin,
    Certificate,
    Client,
    Contract,
    Course,
    Enrollment,
    Owner,
    Payment,
    Schedule,
    Subject,
  };

  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });
}

module.exports = applyAssociations;
