import { CheckpointModel } from '../../data/mongodb';
import { CheckpointDatasource, CustomError, RegisterCheckpointDto, CheckpointEntity } from '../../domain';
import { CheckpointMapper } from '../mappers/checkpoint.mapper';

export class CheckpointDatasourceImpl implements CheckpointDatasource {
  constructor() {}
  
  async register( registerCheckpointDto: RegisterCheckpointDto ): Promise<CheckpointEntity> {
    const { state, comment, location, user, unit } = registerCheckpointDto;
    try {
      const checkpoint = await CheckpointModel.create({
        state,
        comment,
        location,
        user,
        unit
      });
      await checkpoint.save();
      return CheckpointMapper.checkpointEntityFromObject(checkpoint);
    } catch (error) {
      if( error instanceof CustomError ) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
