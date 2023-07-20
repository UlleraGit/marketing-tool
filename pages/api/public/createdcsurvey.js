import connection from "../../../lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    try {
        const values = req.body;
        const intent = await stripe.paymentIntents.retrieve(values.paymentIntent);
        console.log(intent)
        if (intent.status === "succeeded" && intent.metadata.delivered == "false") {
            connection({ task: "set", collection: "dcSurveys", data: { title: values.data.title, survey: values.data.questions } });
            intent.metadata = {
                delivered: "true"
            };
            res.status(200).json("success");
        } else {
            console.log(intent.error);
            res.status(400).json({ error: intent.error });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}
