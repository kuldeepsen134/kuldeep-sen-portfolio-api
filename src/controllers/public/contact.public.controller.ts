import { Request, Response } from 'express';
import { contactService } from '../../services/contact.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class ContactPublicController {
  static submitContact = async (req: Request, res: Response): Promise<void> => {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await contactService.submitInquiry(req.body, ipAddress, userAgent);

    ResponseFormatter.success(
      res,
      null,
      Messages.CONTACT_SUBMIT_SUCCESS,
      HttpStatus.CREATED
    );
  };
}
