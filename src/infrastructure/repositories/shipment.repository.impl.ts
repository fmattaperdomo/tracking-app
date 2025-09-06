import { ShipmentDatasource, ShipmentRepository, RegisterShipmentDto, ShipmentEntity } from '../../domain';

export class ShipmentRepositoryImpl implements ShipmentRepository {
  constructor(
    private readonly shipmentDatasource: ShipmentDatasource,
  ) {}
  register( registerShipmentDto: RegisterShipmentDto ): Promise<ShipmentEntity> {
    return this.shipmentDatasource.register(registerShipmentDto);
  }
}
