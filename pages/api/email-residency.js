require("dotenv").config();

const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

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
    subject: subject,
    text: body,
  });

  transporter.close();

  return res;
};

const relocationDocs = {
  russia: "its russia bruhh",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

const addToSendinblue = async (contact, listId) => {
  const { citizenship, email, name, relocate_to } = contact;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  // if contact:
  // update
  // else
  // create

  // if contact
  const contactExists = await apiInstance.getContactInfo(email);
  console.log(JSON.stringify(contactExists));

  // create contact
  // try {
  //   let newContact = new SibApiV3Sdk.CreateContact();

  //   newContact.email = email;
  //   newContact.listIds = [listId];
  //   newContact.attributes = {
  //     NATIONALITY: citizenship,
  //     NAME: name,
  //     RELOCATE_TO: relocate_to,
  //   };

  //   const data = await apiInstance.createContact(newContact);
  //   const res = JSON.stringify(data);
  // } catch (err) {
  //   return err;
  // }
};

export default async (req, res) => {
  const {
    name,
    email,
    citizenship,
    relocation_country,
    other_country,
  } = req.body;

  const relocate_to = !other_country ? relocation_country : other_country;

  const contact = { email, citizenship, name, relocate_to };
  // // post to sendinblue
  addToSendinblue(contact, 4);

  // send email
  // const sendEmailRes = await sendEmail(
  //   email,
  //   '"Expatriant" <info@expatriant.com>',
  //   relocate_to,
  //   relocationDocs[relocation_country]
  // );

  // console.log(sendEmailRes);

  res.status(200).json({ success: true });
};
