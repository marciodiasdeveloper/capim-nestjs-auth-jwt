import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  FileValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { AuthGuard } from 'src/infra/providers/auth.guard.provider';

type ParamsUser = {
  id: string;
  idCompany: string;
};

type QueryUser = {
  p: string;
  r: string;
};

type BodyUser = {
  name: string;
  age: number;
};

@Controller()
export class UserController {
  constructor() {}

  @Get('/users/:id')
  findById(@Param() params: ParamsUser): string {
    return `Usuário do ID: ${params.id} da empresa ${params.idCompany}`;
  }

  @Get('/users/:id')
  findByPages(@Query() queries: QueryUser): string {
    return `Queries: ${queries.p}`;
  }

  @Post('/create')
  create(@Body() data: BodyUser) {
    return {
      ...data,
      id: randomUUID(),
    };
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile() {}

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {}
}
