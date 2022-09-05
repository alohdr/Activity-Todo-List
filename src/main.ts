import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  
  app.setGlobalPrefix('api/v1');  
  app.useGlobalPipes(new ValidateInputPipe());
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
