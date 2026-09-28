import { Request, Response } from 'express';
import { serviceService } from '../../services/service.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ServicePublicController {
  static getServices = async (_req: Request, res: Response): Promise<void> => {
    const services = await serviceService.getPublicServices();
    ResponseFormatter.success(res, services, Messages.FETCHED);
  };
}
