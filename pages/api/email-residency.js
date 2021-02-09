const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const relocationDocs = {
  russia: "you want to go to russia",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

const url = "https://api.sendinblue.com/v3/contacts";
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;

const sendEmail = async (sendTo, sentFrom, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "email",
      pass: "pass",
    },
  });

  const info = await transporter.sendMail({
    from: sentFrom,
    to: sendTo,
    subject: subject,
    text: body,
  });

  return info;
};

export default (req, res) => {
  // Email contact

  const {
    name,
    email,
    citizenship,
    relocation_country,
    other_country,
  } = req.body;

  const relocate_to = !other_country ? relocation_country : other_country;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": sendinblueApiKey,
    },
    body: JSON.stringify({
      attributes: {
        NATIONALITY: citizenship,
        NAME: name,
        RELOCATE_TO: relocate_to,
      },
      listIds: [4],
      updateEnabled: true,
      email: email,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));

  sendEmail(
    "ashannon828@gmail.com",
    "ashannon@expatriant.com",
    relocate_to,
    relocationDocs[relocation_country]
  );

  res.status(200).json({ success: true });
};
