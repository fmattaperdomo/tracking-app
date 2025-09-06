import { Request, Response } from 'express';
import { ShipmentRepository, CustomError, RegisterShipment, RegisterShipmentDto } from '../../domain';
import { ShipmentModel } from '../../data/mongodb';
import { buildLogger } from "../plugins/logger.plugin";

export class ShipmentController {
  private logger = buildLogger(ShipmentController.name);
  constructor(
    private readonly shipmentRepository: ShipmentRepository,
  ) {}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    this.logger.error({error});
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerShipment = (req: Request, res: Response ) => {
    const [error, registerShipmentDto] = RegisterShipmentDto.create(req.body);
    if ( error ) return res.status(400).json({ error });
    
    new RegisterShipment(this.shipmentRepository)
      .execute( registerShipmentDto! )
      .then( data => res.json(data) )
      .catch( error => this.handleError(error, res) );
  }

  getShipments = (req: Request, res: Response ) => {
    ShipmentModel.find()
      .then( shipments => {
        res.json({
          shipment: req.body.shipment
        }) 
      })
      .catch(()=> res.status(500).json({ error: 'Internal server error' }))
  }
}
