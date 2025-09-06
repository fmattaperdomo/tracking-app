export class UnitEntity {
  constructor(
    public id: string,
    public shipment_id: string,
    public description: string,
    public weight: string,
    public dimensions: string,
    public currentStatus: string,
    public createAt: Date
  ) {}
}
