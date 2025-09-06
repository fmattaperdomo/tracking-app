import { CheckpointEntity } from '../entities/checkpoint.entity';
import { RegisterCheckpointDto } from '..';

export abstract class CheckpointDatasource {
  abstract register( registerCheckpointDto: RegisterCheckpointDto ):Promise<CheckpointEntity>
}
