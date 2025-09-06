import { Request, Response } from 'express';
import { UnitRepository, CustomError, RegisterUnit, RegisterUnitDto } from '../../domain';
import { UnitModel } from '../../data/mongodb';
import { buildLogger } from "../plugins/logger.plugin";

export class UnitController {
  private logger = buildLogger(UnitController.name);

  constructor(
    private readonly unitRepository: UnitRepository,
  ) {}

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    this.logger.error({error});
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUnit = (req: Request, res: Response ) => {
    const [error, registerUnitDto] = RegisterUnitDto.create(req.body);
    if ( error ) return res.status(400).json({ error });
    
    new RegisterUnit(this.unitRepository)
      .execute( registerUnitDto! )
      .then( data => res.json(data) )
      .catch( error => this.handleError(error, res) );
  }

  getUnits = (req: Request, res: Response ) => {
    UnitModel.find()
      .then( units => {
        res.json({
          unit: req.body.unit
        }) 
      })
      .catch(()=> res.status(500).json({ error: 'Internal server error' }))
  }
}
