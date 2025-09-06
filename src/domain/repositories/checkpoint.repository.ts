import { CheckpointEntity } from '../entities/checkpoint.entity';
import { RegisterCheckpointDto } from '..';

export abstract class CheckpointRepository {
  abstract register( registerCheckpointDto: RegisterCheckpointDto ):Promise<CheckpointEntity>;
}
 