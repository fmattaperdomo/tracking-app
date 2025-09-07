import { UnitModel } from '../../data/mongodb';
import { UnitDatasource, CustomError, RegisterUnitDto, UnitEntity } from '../../domain';
import { UnitMapper } from '../mappers/unit.mapper';

export class UnitDatasourceImpl implements UnitDatasource {
  constructor() {}
  
  async register( registerUnitDto: RegisterUnitDto ): Promise<UnitEntity> {
    const { description, weight, dimensions, currentStatus,user,shipment } = registerUnitDto;
    try {
      const unit = await UnitModel.create({
        description,
        weight,
        dimensions,
        currentStatus,
        user,
        shipment
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
