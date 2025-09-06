import { JwtAdapter } from '../../../config';
import { RegisterShipmentDto } from '../../dtos/shipment/register-shipment.dto';
import { CustomError } from '../../errors/custom.error';
import { ShipmentRepository } from '../../repositories/shipment.repository';

interface ShipmentToken {
  token: string;
  shipment: {
    id: string;
    description: string;
    sender_contact: string;
    receiver_contact: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterShipmentUseCase {
  execute( registerShipmentDto: RegisterShipmentDto ): Promise<ShipmentToken>;
}

export class RegisterShipment implements RegisterShipmentUseCase {

  constructor(
    private readonly shipmentRepository: ShipmentRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}

  async execute( registerShipmentDto: RegisterShipmentDto ): Promise<ShipmentToken> {

    const shipment = await this.shipmentRepository.register(registerShipmentDto);

    const token = await this.signToken({ id: shipment.id }, '2h');
    if ( !token ) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      shipment: {
        id: shipment.id,
        description: shipment.description,
        sender_contact: shipment.sender_contact,
        receiver_contact: shipment.receiver_contact
      }
    };
  }
}
