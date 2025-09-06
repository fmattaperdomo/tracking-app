import { Router } from 'express';
import { CheckpointController } from './controller';
import { CheckpointDatasourceImpl, CheckpointRepositoryImpl } from '../../infrastructure';
import { CheckpointMiddleware } from '../middlewares/checkpoint.middleware';

export class CheckpointRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CheckpointDatasourceImpl();
    const checkpointRepository = new CheckpointRepositoryImpl(datasource);

    const controller = new CheckpointController(checkpointRepository);

    router.post('/register', controller.registerCheckpoint)
    
    router.get('/', [CheckpointMiddleware.validateJWT] ,controller.getCheckpoints );
    return router;
  }
}
