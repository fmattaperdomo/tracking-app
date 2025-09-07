export class UnitEntity {
  constructor(
    public id: string,
    public description: string,
    public weight: string,
    public dimensions: string,
    public currentStatus: string,
    public createAt: Date,
    public user: string,
    public shipment: string,
  ) {}
}
