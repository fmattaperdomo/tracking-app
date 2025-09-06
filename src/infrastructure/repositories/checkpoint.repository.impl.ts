import { CheckpointDatasource, CheckpointRepository, RegisterCheckpointDto, CheckpointEntity } from '../../domain';

export class CheckpointRepositoryImpl implements CheckpointRepository {
  constructor(
    private readonly checkpointDatasource: CheckpointDatasource,
  ) {}
  register( registerCheckpointDto: RegisterCheckpointDto ): Promise<CheckpointEntity> {
    return this.checkpointDatasource.register(registerCheckpointDto);
  }
}
