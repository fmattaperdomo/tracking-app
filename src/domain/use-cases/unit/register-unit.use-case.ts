import { JwtAdapter } from '../../../config';
import { RegisterUnitDto } from '../../dtos/unit/register-unit.dto';
import { CustomError } from '../../errors/custom.error';
import { UnitRepository } from '../../repositories/unit.repository';

interface UnitToken {
  token: string;
  unit: {
    id: string;
    description: string;
    weight: string;
    dimensions: string;
    currentStatus: string;
    user:string;
    shipment:string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUnitUseCase {
  execute( registerUnitDto: RegisterUnitDto ): Promise<UnitToken>;
}

export class RegisterUnit implements RegisterUnitUseCase {

  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}

  async execute( registerUnitDto: RegisterUnitDto ): Promise<UnitToken> {

    const unit = await this.unitRepository.register(registerUnitDto);

    const token = await this.signToken({ id: unit.id }, '2h');
    if ( !token ) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      unit: {
        id: unit.id,
        description: unit.description,
        weight: unit.weight,
        dimensions: unit.dimensions,
        currentStatus: unit.currentStatus,
        user: unit.user,
        shipment: unit.shipment
      }
    };
  }
}
