const sendgrid = require("@sendgrid/mail")
const { environment } = require("../config/environment")
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = environment;

sendgrid.setApiKey(SENDGRID_API_KEY);
const emailService = async ({ to, templateId, dynamic_template_data }) => {
  console.log("emailService")
  return new Promise(async (resolve, reject) => {
    try {
      await sendgrid.send({
        from: SENDGRID_EMAIL_FROM,
        to: to,
        templateId: templateId,
        dynamic_template_data: dynamic_template_data,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
};
module.exports = emailService;
