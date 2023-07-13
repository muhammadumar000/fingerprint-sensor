
const FingerprintController = require('../Controllers/fingerprintController.js');

const fingerprint = {
    type :  'object',
    properties: {
        _id: {type: 'string'},
        fingerprintId: {type: 'string'},
        fingerprintName: {type: 'string'},
        LicensePlate : {type: 'string'}
    }
}

const getFingerprintById = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties: {
                    _id: {type: 'string'},
                    fingerprintId: {type: 'string'},
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


async function routes(fastify,options,done){
    fastify.get('/fingerprint/:id',getFingerprintById) // http://localhost:3000/fingerprint/1

    done();
}

module.exports = routes;

