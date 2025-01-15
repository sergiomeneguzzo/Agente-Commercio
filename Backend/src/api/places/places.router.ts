import { Router } from 'express';
import {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
} from './places.controller';
import { validate } from '../../utils/validation-middleware';
import { CreatePlaceDTO, UpdatePlaceDTO } from './places.dto';

const router = Router();

router.get('/', getPlaces);
router.get('/:id', getPlace);
router.post('/', validate(CreatePlaceDTO), createPlace);
router.patch('/:id', validate(UpdatePlaceDTO), updatePlace);
router.delete('/:id', deletePlace);

export default router;
