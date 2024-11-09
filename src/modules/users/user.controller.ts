import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { randomUUID } from 'crypto';

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
}
