import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchema,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { ProfileUserUseCase } from './use-cases/profile-user.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user.usecase';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);

@Controller('/users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  @Post()
  @ApiBody({
    description: 'Criação de usuário',
    schema: schemaUserSwagger,
  })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);
    return CreateUserResponseSchemaDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatarUserUseCase.execute({
      file,
      idUser: req.user.sub,
    });
    return result;
  }
}
