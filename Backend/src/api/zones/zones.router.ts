import { Router } from 'express';
import {
  createZone,
  getZones,
  getZone,
  updateZone,
  deleteZone,
} from './zones.controller';
import { validate } from '../../utils/validation-middleware';
import { CreateZoneDTO, UpdateZoneDTO } from './zones.dto';

const router = Router();

router.get('/', getZones);
router.get('/:id', getZone);
router.post('/', validate(CreateZoneDTO), createZone);
router.patch('/:id', validate(UpdateZoneDTO), updateZone);
router.delete('/:id', deleteZone);

export default router;
