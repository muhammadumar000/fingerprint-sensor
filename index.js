const fastify = require('fastify')({logger:true})
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.URI;
const client  = new MongoClient(uri);

const fastifyCors = require('@fastify/cors');

fastify.register(fastifyCors, {
  // Set the CORS options
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
});

fastify.register(require('./Routes/fingerprintRoute'))

const PORT = process.env.PORT || 3000;

fastify.get('/',(req,res) => {
    res.send(' My fingerprint API is running')
})

async function run(){
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        // insert a document 
        console.log("Connected successfully to server");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

run().catch(console.dir);
fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
    if (err) {
     fastify.log.error(err);
     process.exit(1);
    }
    console.log(`server running at ${fastify.server.address().port}`)
   })


