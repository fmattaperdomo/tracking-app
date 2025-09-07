import { Validators } from '../../../config';
 
export class RegisterCheckpointDto {
  private constructor(
    public state: string,
    public comment: string,
    public location: string,
    public readonly user: string, 
    public readonly unit: string
  ) { }

  static create( object: { [ key: string ]: any; } ): [ string?, RegisterCheckpointDto?] {
    const { state, comment, location, user, unit } = object;

    if ( !state ) return [ 'Missing state' ];
    if ( !comment ) return ['Missing comment'];
    if ( comment.length < 6 ) return ['comment too short'];
    if ( !location ) return ['Missing location'];
    if ( location.length < 6 ) return ['location too short'];

    
    if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];
    
    if ( !unit ) return [ 'Missing unit ID' ];
    if ( !Validators.isMongoID(unit) ) return ['Invalid Unit ID'];


    return [
      undefined,
      new RegisterCheckpointDto(state, comment, location, user, unit) 
    ];
  }
}
