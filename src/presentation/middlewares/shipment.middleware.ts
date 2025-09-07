import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { ShipmentModel } from '../../data/mongodb';
import { buildLogger } from "../plugins/logger.plugin";


export class ShipmentMiddleware {
  private static logger = buildLogger('ShipmentMiddleware');
  static validateJWT = async(req: Request, res: Response, next: NextFunction ) => {
    const authorization = req.header('Authorization');
    if ( !authorization ) return res.status(401).json({ error: 'No token provided' });
    if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';
    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if ( !payload ) return res.status(401).json({ error: 'Invalid token' });

      const shipment = await ShipmentModel.findById(payload.id);
      if ( !shipment ) return res.status(401).json({ error: 'Invalid token - shipment not found' })
      req.body.shipment = shipment;
      next();
    } catch (error) {
      this.logger.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
 }
}
