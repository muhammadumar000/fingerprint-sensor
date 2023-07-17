
const FingerprintController = require('../Controllers/fingerprintController.js');

const getFingerprintById = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties: {
                    fingerprintName: {type:'string'},
                    LicensePlate: {type:'string'},
                }
            }
        },
        params: { 
            type: 'object',
            additionalProperties: false,
            required: [ 'id' ],
            properties: { id: { type: 'string' }
        }
    }
    },
    handler: FingerprintController.getFingerprintById
}

const enteredUsersData = {
    schema:{
        response:{
            200:{
                type: 'array',
                properties: {
                    fingerprintName: {type:'string'},
                    LicensePlate: {type:'string'},
                }
            }
        }  
},
handler: FingerprintController.enteredUsersData
};


async function fingerprintRoutes(fastify,options,done){
    fastify.get('/users',enteredUsersData);  // 
    fastify.get('/fingerprint/:id',getFingerprintById) // http://localhost:3000/fingerprint/1

    done();
}

module.exports = fingerprintRoutes;

