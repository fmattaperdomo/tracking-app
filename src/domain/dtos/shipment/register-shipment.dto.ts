import { Validators } from '../../../config';
  
export class RegisterShipmentDto {
  private constructor(
    public description: string,
    public sender_contact: string,
    public receiver_contact: string,
    public readonly user: string 
  ) { }

  static create( object: { [ key: string ]: any; } ): [ string?, RegisterShipmentDto?] {
    const { description, sender_contact, receiver_contact,user} = object;

    if ( !description ) return [ 'Missing description' ];
    if ( !sender_contact ) return [ 'Missing sender contact' ];
    if ( sender_contact.length < 6 ) return ['sender_contact too short'];
    if ( !receiver_contact ) return ['Missing receiver contact'];
    if ( receiver_contact.length < 6 ) return ['receiver contact too short'];
    if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];
    
    return [
      undefined,
      new RegisterShipmentDto(description, sender_contact, receiver_contact,user) 
    ];
  }
}
