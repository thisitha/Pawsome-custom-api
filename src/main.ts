import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'https://multivendor-seller-remake.vercel.app',
      'https://multivendor-remake.vercel.app',
      'https://multivendor-admin-remake.vercel.app',
      'http://localhost:3000', // Add localhost as allowed origin
    ], // Allow only the specified domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow all necessary HTTP methods
    allowedHeaders: '*',
    credentials: true, // Optional: Enable sending credentials (cookies, etc.) if needed
  });
  const config = new DocumentBuilder()
    .setTitle('Marvel')
    .setDescription('Marvel Mock API')
    .setVersion('1.0')
    .addTag('marvel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(4000);
}
bootstrap();
