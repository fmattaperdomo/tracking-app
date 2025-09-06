import { Router } from 'express';
import { UnitController } from './controller';
import { UnitDatasourceImpl, UnitRepositoryImpl } from '../../infrastructure';
import { UnitMiddleware } from '../middlewares/unit.middleware';

export class UnitRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UnitDatasourceImpl();
    const unitRepository = new UnitRepositoryImpl(datasource);

    const controller = new UnitController(unitRepository);

    router.post('/register', controller.registerUnit)
    
    router.get('/', [UnitMiddleware.validateJWT] ,controller.getUnits );
    return router;
  }
}
