const fetch = require("node-fetch");

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;

const countries = {
  russia: "you want to go to russia",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

export default (req, res) => {
  // Add contact to sendinblue
  // Email contact
  console.log(sendinblueApiKey);

  const {
    name,
    email,
    citizenship,
    relocation_country,
    other_country,
  } = req.body;

  res.status(200).json({ success: true });
};
