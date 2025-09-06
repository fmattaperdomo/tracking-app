import { Router } from 'express';
import { ShipmentController } from './controller';
import { ShipmentDatasourceImpl, ShipmentRepositoryImpl } from '../../infrastructure';
import { ShipmentMiddleware } from '../middlewares/shipment.middleware';

export class ShipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ShipmentDatasourceImpl();
    const shipmentRepository = new ShipmentRepositoryImpl(datasource);

    const controller = new ShipmentController(shipmentRepository);

    router.post('/register', controller.registerShipment)
    
    router.get('/', [ShipmentMiddleware.validateJWT] ,controller.getShipments );
    return router;
  }
}
