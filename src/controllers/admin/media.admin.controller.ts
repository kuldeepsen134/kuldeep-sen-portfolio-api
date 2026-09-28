import { Request, Response } from 'express';
import { mediaService } from '../../services/media.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { AppError } from '../../utils/apiError';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class MediaAdminController {
  static upload = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      throw AppError.badRequest('No file was uploaded. Please include a file in the "file" field.');
    }

    const folder = (req.body.folder as string) || 'portfolio';
    const result = await mediaService.uploadFile(req.file, folder);

    ResponseFormatter.success(
      res,
      result,
      'File uploaded successfully.',
      HttpStatus.CREATED
    );
  };
}
