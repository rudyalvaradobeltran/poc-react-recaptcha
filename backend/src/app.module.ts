import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {
  OriginMiddleware,
  ReCaptchaMiddleware,
} from './common/middleware/recaptcha.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReCaptchaMiddleware)
      .forRoutes({ path: '/data/save', method: RequestMethod.ALL });
    consumer
      .apply(OriginMiddleware)
      .forRoutes({ path: '/data/**', method: RequestMethod.ALL });
  }
}
