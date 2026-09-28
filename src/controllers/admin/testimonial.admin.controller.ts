import { Request, Response } from 'express';
import { testimonialService } from '../../services/testimonial.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class TestimonialAdminController {
  static getTestimonials = async (_req: Request, res: Response): Promise<void> => {
    const testimonials = await testimonialService.getAdminTestimonials();
    ResponseFormatter.success(res, testimonials, Messages.FETCHED);
  };

  static getTestimonialById = async (req: Request, res: Response): Promise<void> => {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    ResponseFormatter.success(res, testimonial, Messages.FETCHED);
  };

  static createTestimonial = async (req: Request, res: Response): Promise<void> => {
    const created = await testimonialService.createTestimonial(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateTestimonial = async (req: Request, res: Response): Promise<void> => {
    const updated = await testimonialService.updateTestimonial(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
    await testimonialService.deleteTestimonial(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
