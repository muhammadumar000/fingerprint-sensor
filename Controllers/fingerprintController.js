require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri);

const getFingerprintById =  async (req, res) => { 
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const database = client.db("Fyp");
        const collection = database.collection("Fingerprint_data");
        const query = { fingerprintId: req.params.id };
        const fingerprint = await collection.findOne(query);
        res.send(fingerprint);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {getFingerprintById};