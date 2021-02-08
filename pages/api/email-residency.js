const fetch = require("node-fetch");

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;
const url = "https://api.sendinblue.com/v3/contacts";

const relocationDocs = {
  russia: "you want to go to russia",
  turkey: "you want to go to turkey",
  ukraine: "you want to go to ukraine",
  other: "we can help you go there",
};

export default (req, res) => {
  // Add contact to sendinblue
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

  res.status(200).json({ success: true });
};
