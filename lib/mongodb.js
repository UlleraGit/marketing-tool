import { MongoClient } from 'mongodb'

export default async function connection(data) {
  const uri = "mongodb://localhost:27017/zgefragtdb";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("zgefragtdb");
    const collection = db.collection('bidValues');

    if (data.task = "get") {
      
    }
    else if (data.task == "set") {

    }

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}