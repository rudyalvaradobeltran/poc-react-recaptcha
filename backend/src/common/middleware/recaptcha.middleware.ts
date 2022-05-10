import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export const ReCaptchaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const http = new HttpService();
  const validReCaptcha = await lastValueFrom(
    http.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LdssNkfAAAAAFbxH3QRJ6at4TuCDKpfG1Bs44NP&response=${req.headers.token}`,
      {
        method: 'POST',
      },
    ),
  );
  if (validReCaptcha.data.success) return next();
  res.sendStatus(401).send('Invalid token');
};
