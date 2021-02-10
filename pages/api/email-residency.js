const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const relocationDocs = {
  russia: "its russia bruhh",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

const url = "https://api.sendinblue.com/v3/contacts";
const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;

const sendEmail = async (sendTo, sentFrom, subject, body) => {
  console.log(process.env.EMAIL_ACCOUNT);
  const transporter = nodemailer.createTransport({
    host: "smtp.flockmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const res = await transporter.sendMail({
    from: sentFrom,
    to: sendTo,
    subject: subject,
    text: body,
  });

  transporter.close();

  return res;
};

export default async (req, res) => {
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

  const asdf = await sendEmail(
    "ashannon828@gmail.com",
    '"Expatriant" <info@expatriant.com>',
    relocate_to,
    relocationDocs[relocation_country]
  );

  console.log(asdf);

  res.status(200).json({ success: true });
};
