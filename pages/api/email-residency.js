const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const relocationDocs = {
  russia: "its russia bruhh",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

const addToSendinblue = async (contact, listId) => {
  const { citizenship, email, name, relocate_to } = contact;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  try {
    let newContact = new SibApiV3Sdk.CreateContact();

    newContact.email = email;
    newContact.updateEnabled = true;
    newContact.listIdsls = [listId];
    newContact.attributes = {
      NATIONALITY: citizenship,
      NAME: name,
      RELOCATE_TO: relocate_to,
    };

    const data = await apiInstance.createContact(newContact);
    console.log(data);
  } catch (err) {
    return err;
  }
};

const sendEmail = async (sendTo, sentFrom, subject, body) => {
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
    bcc: "contact@expatriant.com",
    subject: subject,
    text: body,
  });

  transporter.close();

  return res;
};

export default async (req, res) => {
  const {
    name,
    email,
    citizenship,
    relocation_country,
    other_country,
    message,
  } = req.body;

  console.log(`email: ${process.env.EMAIL_ACCOUNT}`);
  console.log(`${process.env.EMAIL_PASSWORD}`);

  const relocate_to = !other_country ? relocation_country : other_country;

  const contact = { email, citizenship, name, relocate_to };

  // post OR update to sendinblue
  const addContact = await addToSendinblue(contact, 4);

  // send email
  const sendEmailRes = await sendEmail(
    email,
    '"Expatriant" <info@expatriant.com>',
    relocate_to,
    `${relocationDocs[relocation_country]}\n\n\n>>Name: ${name}\n>>Email: ${email}\n>>Nationality: ${citizenship}\n>>Relocate to: ${relocate_to}\n>>Message:\n${message}`
  );

  res.status(200).json({ success: true });
};
