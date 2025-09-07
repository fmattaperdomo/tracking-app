import { CustomError, UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]:any }) {
    const { id, _id, name, email, role, password, createdAt} = object;

    if ( !_id || !id ) {
      throw CustomError.badRequest('Missing id');
    }
    if ( !name ) throw CustomError.badRequest('Missing name');
    if ( !email ) throw CustomError.badRequest('Missing email');
    if ( !password ) throw CustomError.badRequest('Missing password');
    if ( !role ) throw CustomError.badRequest('Missing roles');
    if ( !createdAt ) throw CustomError.badRequest('Missing createAt');

    return new UserEntity(
      _id || id,
      name, 
      email,
      role,
      password,
      createdAt
    );
  }
}
