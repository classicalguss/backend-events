const {getFloorById} = require("./backendAPIs");

async function extraInfoCollector(payload, req) {
    if (payload.details.type === "floor") {
        let floorDetails = await getFloorById(payload.details.floorId, req);
        delete floorDetails.rent_contracts;
        payload.extra_details = floorDetails;
    }
    return payload;
}

module.exports = extraInfoCollector;