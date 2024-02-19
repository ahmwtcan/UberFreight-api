import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import {SwaggerConfig} from "./swagger.config";

export function createDocument(app: INestApplication): OpenAPIObject {
    const builder = new DocumentBuilder()
        .setDescription(SwaggerConfig.description)
        .setTitle(SwaggerConfig.title)
        .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header'}, 'access-token')
        .setVersion(SwaggerConfig.version)

    const options = builder.build();

    return SwaggerModule.createDocument(app, options);
}