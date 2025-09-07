import { JwtAdapter } from '../../../config';
import { RegisterCheckpointDto } from '../../dtos/checkpoint/register-checkpoint.dto';
import { CustomError } from '../../errors/custom.error';
import { CheckpointRepository } from '../../repositories/checkpoint.repository';

interface CheckpointToken {
  token: string;
  checkpoint: {
    id: string;
    state: string;
    comment: string;
    location: string;
    user: string;
    unit: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterCheckpointUseCase {
  execute( registerCheckpointDto: RegisterCheckpointDto ): Promise<CheckpointToken>;
}

export class RegisterCheckpoint implements RegisterCheckpointUseCase {

  constructor(
    private readonly checkpointRepository: CheckpointRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}

  async execute( registerCheckpointDto: RegisterCheckpointDto ): Promise<CheckpointToken> {

    const checkpoint = await this.checkpointRepository.register(registerCheckpointDto);

    const token = await this.signToken({ id: checkpoint.id }, '2h');
    if ( !token ) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      checkpoint: {
        id: checkpoint.id,
        state: checkpoint.state,
        comment: checkpoint.comment,
        location: checkpoint.location,
        user: checkpoint.user,
        unit: checkpoint.unit
      }
    };
  }
}
