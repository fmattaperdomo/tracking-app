export class CheckpointEntity {
  constructor( 
    public id: string,
    public state: string,
    public comment: string,
    public location: string,
    public createdAt: Date,
    public user: string,
    public unit: string
  ) {}


}