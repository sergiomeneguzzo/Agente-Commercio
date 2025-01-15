import { Router } from 'express';
import {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  getPlacesByZone,
  deletePlacesByZone,
} from './places.controller';
import { validate } from '../../utils/validation-middleware';
import { CreatePlaceDTO, UpdatePlaceDTO } from './places.dto';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = Router();

router.get('/', isAuthenticated, getPlaces);
router.get('/:id', isAuthenticated, getPlace);
router.post('/', isAuthenticated, validate(CreatePlaceDTO), createPlace);
router.patch('/:id', isAuthenticated, validate(UpdatePlaceDTO), updatePlace);
router.delete('/:id', isAuthenticated, deletePlace);
router.get('/placesbyZone/:zoneId', isAuthenticated, getPlacesByZone);
router.delete('/deleteByZone/:zoneId', isAuthenticated, deletePlacesByZone);

export default router;
