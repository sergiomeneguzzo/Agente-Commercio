import { Request, Response, NextFunction } from 'express';
import zoneService from './zones.service';
import { CreateZoneDTO, UpdateZoneDTO } from './zones.dto';
import axios from 'axios';
import placeService from '../places/places.service';

export const getZones = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zones = await zoneService.getAllZones();
    res.json(zones);
  } catch (error) {
    next(error);
  }
};

export const getZone = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zone = await zoneService.getZoneById(req.params.id);
    if (!zone) {
      res.status(404).json({ message: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    next(error);
  }
};

export const createZone = async (
  req: Request<{}, {}, CreateZoneDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { Agent, Cap } = req.body;

    const existingZone = await zoneService.zoneExists(Agent, Cap);
    if (existingZone) {
      res.status(400).json({
        message: 'Zona già esistente per questo agente e CAP',
      });
    }

    // Creazione della nuova zona
    const newZone = await zoneService.createZone(req.body);

    const apiUrl = `https://api.zippopotam.us/it/${Cap}`;
    const response = await axios.get(apiUrl);

    if (response.status !== 200 || !response.data.places) {
      res.status(500).json({
        message: 'Failed to retrieve places from external API.',
      });
    }

    const places = response.data.places;

    // Creazione posti
    for (const place of places) {
      await placeService.createPlace({
        zone: newZone.id,
        placeName: place['place name'],
        longitude: place['longitude'],
        latitude: place['latitude'],
      });
    }

    res.status(201).json(newZone);
  } catch (error) {
    next(error);
  }
};

export const getCapsByUser = async (
  req: Request<{}, {}, { userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'UserId is required.' });
    }

    const caps = await zoneService.getCapsByUser(userId);

    if (!caps.length) {
      res.status(404).json({ message: 'No CAPs found for this user.' });
    }

    res.json(caps);
  } catch (error) {
    next(error);
  }
};

export const updateZone = async (
  req: Request<{ id: string }, {}, UpdateZoneDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedZone = await zoneService.updateZone(req.params.id, req.body);
    if (!updatedZone) {
      res.status(404).json({ message: 'Zone not found' });
    }
    res.json(updatedZone);
  } catch (error) {
    next(error);
  }
};

export const deleteZone = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zoneId = req.params.id;

    await zoneService.deleteZone(zoneId);

    res.status(204).send();
  } catch (error) {
    if (
      (error as Error).message ===
      'Cannot delete zone. There are places associated with this zone.'
    ) {
      res.status(400).json({
        message:
          'Cannot delete zone. There are places associated with this zone.',
      });
    } else {
      next(error);
    }
  }
};
