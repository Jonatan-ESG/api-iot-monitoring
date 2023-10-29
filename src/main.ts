import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('IoT Monitoring')
    .setDescription(
      'The IoT Monitoring API provides access to real-time data from IoT devices, enabling the monitoring and management of connected devices.',
    )
    .setVersion('1.0')
    .addTag('cats')
    .addSecurity('token', {
      type: 'apiKey',
      scheme: 'api_key',
      in: 'header',
      name: 'auth-token',
    })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
