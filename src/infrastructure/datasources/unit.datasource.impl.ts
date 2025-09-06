import { UnitModel } from '../../data/mongodb';
import { UnitDatasource, CustomError, RegisterUnitDto, UnitEntity } from '../../domain';
import { UnitMapper } from '../mappers/unit.mapper';

export class UnitDatasourceImpl implements UnitDatasource {
  constructor() {}
  
  async register( registerUnitDto: RegisterUnitDto ): Promise<UnitEntity> {
    const { shipment_id, description, weight, dimensions, currentStatus } = registerUnitDto;
    try {
      const unit = await UnitModel.create({
        shipment_id,
        description,
        weight,
        dimensions,
        currentStatus
      });
      await unit.save();
      return UnitMapper.unitEntityFromObject(unit);
    } catch (error) {
      if( error instanceof CustomError ) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
