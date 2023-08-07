export default async function handler(req, res) {
    const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=Yhp3A6RVbBuol7W4g1g0GzJJbaLHtr6uMCywp-GlJ2U`;
    const data = await JSON.parse(req.body)
    console.log(data)
    try {
        let test
        const url = `${API_URL}&query=${data.search}`;
        await fetch(url)
            .then((response) => response.json())
            .then((result) => { test = result.results });
        test = test.map((n) => ({ image: n.urls.regular, creator: n.user.name }))
        res.status(200).json(test)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}