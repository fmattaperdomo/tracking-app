import { ShipmentEntity } from '../entities/shipment.entity';
import { RegisterShipmentDto } from '..';

export abstract class ShipmentRepository {
  abstract register( registerShipmentDto: RegisterShipmentDto ):Promise<ShipmentEntity>;
}
