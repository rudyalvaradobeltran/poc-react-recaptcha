import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ReCaptchaMiddleware } from './common/middleware/recaptcha.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReCaptchaMiddleware).forRoutes('data');
  }
}
