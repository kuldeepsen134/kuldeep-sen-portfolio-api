import { Request, Response } from 'express';
import { contactService } from '../../services/contact.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ContactAdminController {
  static getInquiries = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, status } = req.query;
    const result = await contactService.getAdminInquiries(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
      status as string | undefined
    );
    ResponseFormatter.success(res, result, Messages.FETCHED);
  };

  static getInquiryById = async (req: Request, res: Response): Promise<void> => {
    const inquiry = await contactService.getInquiryById(req.params.id);
    ResponseFormatter.success(res, inquiry, Messages.FETCHED);
  };

  static updateStatus = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body;
    const updated = await contactService.updateStatus(req.params.id, status);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteInquiry = async (req: Request, res: Response): Promise<void> => {
    await contactService.deleteInquiry(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
