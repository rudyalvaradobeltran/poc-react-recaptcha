import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  save(data: string): string {
    // save
    return `Hello ${data} from the server`;
  }
}
