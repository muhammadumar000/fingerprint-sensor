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
        const collection2 = database.collection('UsersEntered');
        const query = { fingerprintId: req.params.id };
        const fingerprint = await collection.findOne(query);
        await collection2.insertOne(fingerprint);
        console.log(fingerprint)
        res.send(fingerprint);
    } catch (error) {
        console.log(error);
    }
};

const enteredUsersData = async(req,res) => {
    try{
        await client.connect();
        
        const database = client.db("Fyp");
        const collection2 = database.collection('UsersEntered');
        const data = await collection2.find().toArray();
        console.log(`data: ${data}`);
        res.send(data);
        
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    enteredUsersData,
    getFingerprintById,

};