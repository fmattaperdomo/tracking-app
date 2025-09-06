import { Validators } from '../../../config';
 
export class RegisterCheckpointDto {
  private constructor(
    public unit_id: string,
    public state: string,
    public comment: string,
    public location: string,
  ) { }

  static create( object: { [ key: string ]: any; } ): [ string?, RegisterCheckpointDto?] {
    const { unit_id, state, comment, location } = object;

    if ( !unit_id ) return [ 'Missing unit Id' ];
    if ( !state ) return [ 'Missing state' ];
    if ( !comment ) return ['Missing comment'];
    if ( comment.length < 6 ) return ['comment too short'];
    if ( !location ) return ['Missing location'];
    if ( location.length < 6 ) return ['location too short'];

    return [
      undefined,
      new RegisterCheckpointDto(unit_id, state, comment, location) 
    ];
  }
}
