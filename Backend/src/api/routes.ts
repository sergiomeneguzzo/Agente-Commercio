import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import zoneRouter from './zones/zones.router';
import placeRouter from './places/places.router';

const router = Router();

router.use('/users', userRouter);
router.use('/zones', zoneRouter);
router.use('/places', placeRouter);
router.use(authRouter);

export default router;
