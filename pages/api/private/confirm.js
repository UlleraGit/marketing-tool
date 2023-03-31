import campagneCreator from "../../../util/campagne"
import connection from "../../../lib/mongodb";
export default async function handler(req, res) {
    const data = await JSON.parse(req.body)
    let locationData = { geo_locations: { countries: [], regions: [], cities: [] } };
    let gender;
    try {
        for (let i = 0; i < data.country.length; i++) {
            switch (data.country[i].type) {
                case 'country':
                    locationData.geo_locations.countries.push(data.country[i].country_code);
                    break
                case 'region':
                    locationData.geo_locations.regions.push({ key: data.country[i].key });
                    break
                case 'city':
                    locationData.geo_locations.cities.push({ key: data.country[i].key });
                    break
            }
        }
        switch (data.gender) {
            case 'Weiblich':
                gender = [2]
                break;
            case 'Männlich':
                gender = [1]
                break;
            case 'Alle':
                gender = [1, 2]
                break;
        }
        await campagneCreator({
            user: data.user,
            title: data.title,
            age_min: parseInt(data.ageMin),
            age_max: parseInt(data.ageMax),
            geo_locations: locationData.geo_locations,
            question_text: data.question,
            answerA: data.answerA,
            answerB: data.answerB,
            gender: gender
        })
        //await connection({ task: "change", find: data, change: { status: "INREVIEW" }, collection: "adRequests" });
        res.status(200).json({ "result": "success" });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "result" })
    }
}
