import { Validators } from '../../../config';
  
export class RegisterUnitDto {
  private constructor(
    public shipment_id: string,
    public description: string,
    public weight: string,
    public dimensions: string,
    public currentStatus: string
  ) { }

  static create( object: { [ key: string ]: any; } ): [ string?, RegisterUnitDto?] {
    const { shipment_id, description, weight, dimensions, currentStatus } = object;

    if ( !description ) return [ 'Missing description' ];
    if ( description.length < 6 ) return [ 'Description too short' ];
    if ( !weight ) return [ 'Missing weight' ];
    if ( weight.length < 6 ) return ['Weight too short'];
    if ( !dimensions ) return ['Missing dimensions'];
    if ( dimensions.length < 6 ) return ['Dimensions too short'];
    if ( !currentStatus ) return ['Missing current status'];
    if ( currentStatus.length < 6 ) return ['Current status too short'];

    return [
      undefined,
      new RegisterUnitDto(shipment_id, description, weight, dimensions, currentStatus) 
    ];
  }
}
