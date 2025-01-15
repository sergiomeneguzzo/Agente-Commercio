import { Router } from 'express';
import {
  createZone,
  getZones,
  getZone,
  updateZone,
  deleteZone,
  getCapsByUser,
} from './zones.controller';
import { validate } from '../../utils/validation-middleware';
import { CreateZoneDTO, UpdateZoneDTO } from './zones.dto';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = Router();

router.get('/', isAuthenticated, getZones);
router.get('/:id', isAuthenticated, getZone);
router.post('/', isAuthenticated, validate(CreateZoneDTO), createZone);
router.patch('/:id', isAuthenticated, validate(UpdateZoneDTO), updateZone);
router.delete('/:id', isAuthenticated, deleteZone);
router.post('/caps', isAuthenticated, getCapsByUser);

export default router;
