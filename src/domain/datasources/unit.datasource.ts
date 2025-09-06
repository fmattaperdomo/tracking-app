import { UnitEntity } from '../entities/unit.entity';
import { RegisterUnitDto } from '..';

export abstract class UnitDatasource {
  abstract register( registerUnitDto: RegisterUnitDto ):Promise<UnitEntity>
}
