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
      `${process.env.google_verify}?secret=${process.env.secret}&response=${req.headers.token}`,
      {
        method: 'POST',
      },
    ),
  );
  if (validReCaptcha.data.success) {
    next();
    return;
  }
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Invalid token');
};

export const OriginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.origin === process.env.frontend_url) {
    next();
    return;
  }
  res.statusCode = 401;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Unauthorized');
};
