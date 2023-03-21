import { MongoClient } from 'mongodb'

export default async function connection(req) {
  const uri = "mongodb://localhost:27017/zgefragtdb";
  const client = new MongoClient(uri);
  let data;
  try {
    await client.connect();
    if (req.task == "get") {
      data = await client.db("zgefragtdb").collection(req.collection).find(req.find).project({_id:0}).toArray();
    }
    else if (req.task == "set") {
      await client.db("zgefragtdb").collection(req.collection).insertOne(req.data);
    }
    else if(req.task == "drop"){
      await client.db("zgefragtdb").collection(req.collection).deleteOne(req.data);
    }
    else if(req.task == "change"){
      await client.db("zgefragtdb").collection(req.collection).updateOne(req.find, {"$set": {status:"ABGELEHNT"}});
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    if (req.task == "get") {
      return data
    }
  }
}