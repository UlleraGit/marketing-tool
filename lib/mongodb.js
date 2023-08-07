const { MongoClient, ServerApiVersion } = require('mongodb');
export default async function connection(req) {
  const uri = "mongodb+srv://office:ZgefragtConnect@zgefragtcluster.n5rjhtw.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  let data;
  try {
    await client.connect();
    if (req.task == "get") {
      data = await client.db("zgefragtdb").collection(req.collection).find(req.find).project({}).toArray();
    }
    else if (req.task == "set") {
      await client.db("zgefragtdb").collection(req.collection).insertOne(req.data);
    }
    else if (req.task == "drop") {
      await client.db("zgefragtdb").collection(req.collection).deleteOne(req.data);
    }
    else if (req.task == "change") {
      await client.db("zgefragtdb").collection(req.collection).updateOne(req.find, { "$set": req.change });
    }
    else if (req.task == "push") {
      await client.db("zgefragtdb").collection(req.collection).updateOne(req.find, { "$push": req.change });
    }
  } catch (e) {
    client.close()
    console.error(e);
  } finally {
    await client.close();
    if (req.task == "get") {
      return data
    }
  }
}