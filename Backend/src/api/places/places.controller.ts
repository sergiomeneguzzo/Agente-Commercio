import { Request, Response, NextFunction } from 'express';
import placeService from './places.service';
import { CreatePlaceDTO, UpdatePlaceDTO } from './places.dto';

export const getPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const places = await placeService.getAllPlaces();
    res.json(places);
  } catch (error) {
    next(error);
  }
};

export const getPlace = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const place = await placeService.getPlaceById(req.params.id);
    if (!place) {
      res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    next(error);
  }
};

export const createPlace = async (
  req: Request<{}, {}, CreatePlaceDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newPlace = await placeService.createPlace(req.body);
    res.status(201).json(newPlace);
  } catch (error) {
    next(error);
  }
};

export const updatePlace = async (
  req: Request<{ id: string }, {}, UpdatePlaceDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedPlace = await placeService.updatePlace(
      req.params.id,
      req.body,
    );
    if (!updatedPlace) {
      res.status(404).json({ message: 'Place not found' });
    }
    res.json(updatedPlace);
  } catch (error) {
    next(error);
  }
};

export const deletePlace = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await placeService.deletePlace(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Place not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
