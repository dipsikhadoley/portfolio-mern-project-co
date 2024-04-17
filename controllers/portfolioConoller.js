const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

// transport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);
const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    // email matter

    transporter.sendMail({
      to: "dipsikhad3@gemail.com",
      from: "dipsikhad3@gemail.com",
      subject: "regarding mern portfolio app",
      html: `
      <h5>detail information</h5>
      <ul><li>
      <p>Name : ${name}</p>
      </li>
      <li>
      <p>Email : ${email}</p>
      </li>
      <li>
      <p>Message : ${msg}</p>
      </li>
      </ul>`,
    });
    return res.status(200).send({
      success: true,
      message: "Your Message Send Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
