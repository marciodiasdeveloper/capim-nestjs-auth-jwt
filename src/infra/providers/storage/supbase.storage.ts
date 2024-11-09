import { SupbaseClient, createClient } from '@supabase/supabase-js';
import { FileDTO } from 'src/modules/users/dto/user.dto';
import { IStorage } from './storage';

export class SupbaseStorage implements IStorage {
  private client: SupbaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPBASE_URL ?? '',
      process.env.SUPBASE_KEY ?? '',
    );
  }

  async upload(file: FileDTO, folder: string): Promise<any> {
    await this.client.storage
      .from(process.env.SUPBASE_BUCKER ?? '')
      .upload(`${folder}/${file.originalName}`, file.buffer, {
        upsert: true,
      });
  }
}
