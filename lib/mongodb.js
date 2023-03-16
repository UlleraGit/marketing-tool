import { MongoClient } from 'mongodb'

export default async function connection(req) {
  const uri = "mongodb://localhost:27017/zgefragtdb";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    if (req.task == "get") {
      //collection.find()
    }
    else if (req.task == "set") {
     await client.db("zgefragtdb").collection(req.collection).insertOne(req.data);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}