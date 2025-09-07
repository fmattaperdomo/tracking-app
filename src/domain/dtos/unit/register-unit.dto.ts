import { Validators } from '../../../config';
  
export class RegisterUnitDto {
  private constructor(
    public description: string,
    public weight: string,
    public dimensions: string,
    public currentStatus: string,
    public readonly user: string,
    public readonly shipment: string
  ) { }

  static create( object: { [ key: string ]: any; } ): [ string?, RegisterUnitDto?] {
    const {description, weight, dimensions, currentStatus, user, shipment} = object;

    if ( !description ) return [ 'Missing description' ];
    if ( description.length < 6 ) return [ 'Description too short' ];
    if ( !weight ) return [ 'Missing weight' ];
    if ( !dimensions ) return ['Missing dimensions'];
    if ( dimensions.length < 6 ) return ['Dimensions too short'];
    if ( !currentStatus ) return ['Missing current status'];
    if ( currentStatus.length < 6 ) return ['Current status too short'];
    if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];
    if ( !shipment ) return [ 'Missing shipment ID' ];
    if ( !Validators.isMongoID(shipment) ) return ['Invalid shipment ID'];

    return [
      undefined,
      new RegisterUnitDto(description, weight, dimensions, currentStatus,user, shipment) 
    ];
  }
}
