export class ShipmentEntity {
  constructor(
    public id: string,
    public description: string,
    public sender_contact: string,
    public receiver_contact: string,
    public createdAt: Date,
    public user: string
  ) {}
}
