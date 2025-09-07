import { Request, Response } from 'express';
import { CheckpointRepository, CustomError, RegisterCheckpoint, RegisterCheckpointDto } from '../../domain';
import { CheckpointModel } from '../../data/mongodb';
import { buildLogger } from "../plugins/logger.plugin";


export class CheckpointController {
  private logger = buildLogger('CheckpointController');
  constructor(
    private readonly checkpointRepository: CheckpointRepository,
  ) {}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    this.logger.error(error); 
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerCheckpoint = (req: Request, res: Response ) => {
    const [error, registerCheckpointDto] = RegisterCheckpointDto.create(req.body);
    if ( error ) return res.status(400).json({ error });
    
    new RegisterCheckpoint(this.checkpointRepository)
      .execute( registerCheckpointDto! )
      .then( data => res.json(data) )
      .catch( error => this.handleError(error, res) );
  }

  getCheckpoints = (req: Request, res: Response ) => {
    CheckpointModel.find()
      .then( checkpoints => {
        res.json({
          checkpoint: req.body.checkpoint
        }) 
      })
      .catch(()=> res.status(500).json({ error: 'Internal server error' }))
  }
}
