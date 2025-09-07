import { CustomError, CheckpointEntity } from '../../domain';

export class CheckpointMapper {
  static checkpointEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, state, comment, location, createdAt,user,unit } = object;

    if ( !_id || !id ) {
      throw CustomError.badRequest('Missing id');
    }
 
    if ( !state ) throw CustomError.badRequest('Missing state');
    if ( !comment ) throw CustomError.badRequest('Missing comment');
    if ( !location ) throw CustomError.badRequest('Missing location');
    if ( !createdAt ) throw CustomError.badRequest('Missing createdAt');
    if ( !user ) throw CustomError.badRequest('Missing user ID');
    if ( !unit ) throw CustomError.badRequest('Missing unit ID');    

    return new CheckpointEntity(
      _id || id,
      state,
      comment,
      location,
      createdAt,
      user,
      unit
    );
  }
}
