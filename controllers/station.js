import { Station } from '../models/index.js';
import GeocoderArcGIS from 'geocoder-arcgis';

const geocoder = new GeocoderArcGIS({
    client_id: 'WCnuOto8agJh2chF', // optional, see below
    client_secret: 'dd256c1ca70043788843a4a1050bdfc9', // optional, see below
});

export const createStation = async (req, res) => {
    try {
        const { name, address } = req.body;
        const data = await geocoder.findAddressCandidates(address, {});
        const loc = data.candidates[0].location;

        const location = {
            type: 'Point',
            coordinates: [loc.y, loc.x],
        };

        const station = await Station.create({
            name,
            address,
            location,
        });

        return res.status(201).json({
            station,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const deleteStation = async (req, res) => {
    try {
        const { id } = req.params;
        await Station.findByIdAndUpdate(id, {
            $set: {
                deleted: true,
            },
        });
        return res.status(204).json({
            message: 'Event deleted',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const updateStation = async (req, res) => {
    try {
        const { _id, name, address, location } = req.body;
        await Station.findByIdAndUpdate(_id, {
            $set: { name, address, location },
        });
        return res.status(200).json({
            message: 'Event updated',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getStation = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Station.findById(id);
        return res.status(200).json({
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        return res.status(200).json({
            stations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
