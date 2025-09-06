import { CustomError, UnitEntity } from '../../domain';

export class UnitMapper {
  static unitEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, shipment_id, description, weight, dimensions, currentStatus, createdAt } = object;

    if ( !_id || !id ) {
      throw CustomError.badRequest('Missing id');
    }

    if ( !shipment_id) throw CustomError.badRequest('Missing shipment id');
    if ( !description) throw CustomError.badRequest('Missing description');
    if ( !weight) throw CustomError.badRequest('Missing weight');
    if ( !dimensions) throw CustomError.badRequest('Missing dimensions');
    if ( !currentStatus) throw CustomError.badRequest('Missing current status');
    if ( !createdAt ) throw CustomError.badRequest('Missing createdAt');

    return new UnitEntity(
      _id || id,
      shipment_id,
      description, 
      weight,
      dimensions,
      currentStatus,
      createdAt
    );
  }
}
