import { CustomError, ShipmentEntity } from '../../domain';

export class ShipmentMapper {
  static shipmentEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, description, sender_contact, receiver_contact, createdAt } = object;

    if ( !_id || !id ) {
      throw CustomError.badRequest('Missing id');
    }
 
    if ( !description ) throw CustomError.badRequest('Missing description');
    if ( !sender_contact ) throw CustomError.badRequest('Missing sender contact');
    if ( !receiver_contact ) throw CustomError.badRequest('Missing receiver contact');
    if ( !createdAt ) throw CustomError.badRequest('Missing createdAt');

    return new ShipmentEntity(
      _id || id,
      description, 
      sender_contact,
      receiver_contact,
      createdAt
    );
  }
}
