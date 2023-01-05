const sgMail = require("@sendgrid/mail");

const { FROM_BASE_EMAIL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: FROM_BASE_EMAIL,
  };
  console.log(email);
  await sgMail.send(email);

  return true;
}

module.exports = sendEmail;