import { UnitDatasource, UnitRepository, RegisterUnitDto, UnitEntity } from '../../domain';

export class UnitRepositoryImpl implements UnitRepository {
  constructor(
    private readonly unitDatasource: UnitDatasource,
  ) {}
  register( registerUnitDto: RegisterUnitDto ): Promise<UnitEntity> {
    return this.unitDatasource.register(registerUnitDto);
  }
}
