import { Request, Response } from 'express';
import { serviceService } from '../../services/service.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class ServiceAdminController {
  static getServices = async (_req: Request, res: Response): Promise<void> => {
    const services = await serviceService.getAdminServices();
    ResponseFormatter.success(res, services, Messages.FETCHED);
  };

  static getServiceById = async (req: Request, res: Response): Promise<void> => {
    const service = await serviceService.getServiceById(req.params.id);
    ResponseFormatter.success(res, service, Messages.FETCHED);
  };

  static createService = async (req: Request, res: Response): Promise<void> => {
    const created = await serviceService.createService(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateService = async (req: Request, res: Response): Promise<void> => {
    const updated = await serviceService.updateService(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteService = async (req: Request, res: Response): Promise<void> => {
    await serviceService.deleteService(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
