import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';import { CreateUserDTO } from '../dto/user.dto';
om 'stream';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform({ name, email, username, password }: , metadata: ArgumentMetadata) {
    if(!name || !email || !username || !password) {
      throw new HttpException(`[name, email, username, password] are required`, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return { name, email, username, password };
  }
}
