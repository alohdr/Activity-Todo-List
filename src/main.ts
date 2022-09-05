import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5000'],
      methods: ['GET','POST', 'PUT', 'DELETE'],
    },
  });
  
  app.setGlobalPrefix('api/v1');  
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000);
}
bootstrap();
