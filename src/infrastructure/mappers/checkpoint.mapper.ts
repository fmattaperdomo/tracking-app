import { CustomError, CheckpointEntity } from '../../domain';

export class CheckpointMapper {
  static checkpointEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, unit_id, state, comment, location, createdAt } = object;

    if ( !_id || !id ) {
      throw CustomError.badRequest('Missing id');
    }
 
    if ( !unit_id ) throw CustomError.badRequest('Missing unit_id');
    if ( !state ) throw CustomError.badRequest('Missing state');
    if ( !comment ) throw CustomError.badRequest('Missing comment');
    if ( !location ) throw CustomError.badRequest('Missing location');
    if ( !createdAt ) throw CustomError.badRequest('Missing createdAt');

    return new CheckpointEntity(
      _id || id,
      unit_id, 
      state,
      comment,
      location,
      createdAt
    );
  }
}
