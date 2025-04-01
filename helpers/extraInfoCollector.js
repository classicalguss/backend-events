const {getFloorById, getZoneById} = require("./backendAPIs");

async function extraInfoCollector(payload, req) {
    if (payload.details.type === "floor") {
        let floorDetails = await getFloorById(payload.details.floorId, req);
        delete floorDetails.rent_contracts;
        payload.extra_details = floorDetails;
    } else if (payload.details.type === "zone") {
        payload.extra_details = await getZoneById(payload.details.zoneId, req);
    }

    return payload;
}

module.exports = extraInfoCollector;