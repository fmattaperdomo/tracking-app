import { ShipmentModel } from '../../data/mongodb';
import { ShipmentDatasource, CustomError, RegisterShipmentDto, ShipmentEntity } from '../../domain';
import { ShipmentMapper } from '../mappers/shipment.mapper';

export class ShipmentDatasourceImpl implements ShipmentDatasource {
  constructor() {}
  
  async register( registerShipmentDto: RegisterShipmentDto ): Promise<ShipmentEntity> {
    const { description, sender_contact, receiver_contact, user } = registerShipmentDto;
    try {
      const shipment = await ShipmentModel.create({
        description,
        sender_contact,
        receiver_contact,
        user
      });
      await shipment.save();
      return ShipmentMapper.shipmentEntityFromObject(shipment);
    } catch (error) {
      if( error instanceof CustomError ) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
