const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const relocationDocs = {
  russia: `**Russia Residence Permit**

Thank you for reaching out to Expatriant about our residence permit services in Russia. We created Expatriant to make moving to Russia easier and to explain all of the options available in plain English. 



You can find a wealth of information for free on Expatriant.com about getting a residence permit in Russia, but we know that sometimes, personal circumstances are different. If you have a simple question, please comment on the most relevant article so our answer to your question helps others. 



If you need personalized advice on applying for a residence permit in Russia, we have a personalized consulting service available. We spend 30 or 60 minutes talking in-depth about your specific situation and the options available. Due to the sheer number of requests, we can no longer provide free consultations and the **cost is $50 for 30 minutes**.



In advance of the call, we will have you fill out a form so we can come prepared with all of the options that are potentially available to you. After the call, if you are interested in applying for a residence permit in Russia, we will put you in touch with a verified lawyer in Moscow. 



Full legal assistance with your residence permit application is $1200 and it includes the following:

- Consultation with a verified, English speaking lawyer based in Moscow at each step of the process
- Completion of the application on your behalf
- Notarization and translation of all required documents
- Accompaniment to the interview at the immigration center and consultation during the interview
- Accompaniment to pick up the complete residence permit at the immigration center 



This service is hands-off, you simply provide the documents and we handle the rest. 



Not included in $1200:

- State application fee - 5,000 RUB
- Medical exam - 3,500 RUB
- Notary and translation services - 5,000 RUB



Working with Expatriant, everything is done legally. The lawyers we work with support multinational companies in Russia on immigration compliance matters and you can be 100% sure that no bribes will be given or shortcuts taken with your application. This is a real problem with immigration-related matters in Russia and one of the reasons we started Expatriant. You also have a native English speaker who has studied Russian law to answer any of your questions throughout the entire process.



If you are interested in having an initial consultation, please follow the link to schedule a call. 



We hope to hear from you.
`,
  turkey: "<p>you want to go to turkey</p>",
  ukraine: "<p>you want to go to ukraine</p>",
  other: "<p>we can help you go there</p>",
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

  const emailRes = await transporter.sendMail({
    from: sentFrom,
    to: sendTo,
    bcc: "contact@expatriant.com",
    subject: subject,
    text: body,
  });

  console.log(emailRes.response);

  transporter.close();

  return emailRes;
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
