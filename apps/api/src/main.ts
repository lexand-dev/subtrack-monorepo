import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
    bodyParser: false,
  });

  const configService = app.get(ConfigService);

  // Global prefix
  const apiPrefix = configService.get('app.apiPrefix');
  app.setGlobalPrefix(apiPrefix);

  // CORS
  const corsEnabled = configService.get('app.cors.enabled');
  if (corsEnabled) {
    app.enableCors({
      origin: configService.get('app.cors.origins'),
      credentials: true,
    });
  }

  // Security - Helmet
  app.use(helmet());

  // Compression
  app.use(compression());

  /**
   * CONCEPTO: API Documentation (Swagger/OpenAPI)
   * - Auto-documentación de API
   * - Genera UI interactiva
   * - Sincronizada con código
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SubTrack API')
    .setDescription('Subscription tracking and management API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get('app.port', 3002);
  await app.listen(port);

  console.log(
    `🚀 Application is running on: http://localhost:${port}/${apiPrefix}`,
  );
  console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
}
bootstrap();
