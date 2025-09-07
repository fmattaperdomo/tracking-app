import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CheckpointRoutes } from './checkpoint/routes';
import { ShipmentRoutes } from './shipment/routes';
import { UnitRoutes } from './unit/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/auth', AuthRoutes.routes )
    router.use('/api/v1/checkpoint', CheckpointRoutes.routes )
    router.use('/api/v1/shipment', ShipmentRoutes.routes )  
    router.use('/api/v1/unit', UnitRoutes.routes ) 

    return router;
  }
}
