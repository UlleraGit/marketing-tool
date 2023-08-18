import register from "../../../util/register";
import connection from "../../../lib/mongodb";
var bcrypt = require('bcryptjs');

export default async function handler(req, res) {
  const values = JSON.parse(req.body)
  var salt = bcrypt.genSaltSync(13);
  var temp = values.firstName + values.lastName + values.email
  var hash = bcrypt.hashSync(temp, salt);
  await register(values.firstName, values.lastName, values.password, values.email)
    .then(async (response) => {
     await connection({
        collection: "users",
        task: 'set',
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          job: values.selectedBeruf,
          birthday: values.birthday,
          university: values.selectedUniversity,
          address: values.address,
          plz: values.plz,
          place: values.place,
          hash: hash,
          answeredSurveys: [],
          numberOfAnsweredSurveys: 0
        }
      })
    }).then((user) => {
      res.status(201).json({ message: 'User registered successfully', user: values.email });
    }).catch((error) => {
      res.status(500).json({ error: 'Failed to register user' });
    });
}
