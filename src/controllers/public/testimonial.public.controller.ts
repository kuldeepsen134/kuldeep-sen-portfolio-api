import { Request, Response } from 'express';
import { testimonialService } from '../../services/testimonial.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class TestimonialPublicController {
  static getTestimonials = async (req: Request, res: Response): Promise<void> => {
    const featuredOnly = req.query.featured === 'true';
    const testimonials = await testimonialService.getPublicTestimonials(featuredOnly);
    ResponseFormatter.success(res, testimonials, Messages.FETCHED);
  };
}
