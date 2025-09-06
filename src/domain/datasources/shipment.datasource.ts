import { ShipmentEntity } from '../entities/shipment.entity';
import { RegisterShipmentDto } from '..';

export abstract class ShipmentDatasource {
  abstract register( registerShipmentDto: RegisterShipmentDto ):Promise<ShipmentEntity>
}
