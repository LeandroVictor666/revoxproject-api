import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { PublicationInterceptor } from './publication.interceptor';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

@Controller('publication')
export class PublicationController {
  /**
   * Just a test route. ignore.
   * @returns
   */
  @UseInterceptors(PublicationInterceptor)
  @UseGuards(AuthenticationGuard)
  @Get('test')
  testFunction() {
    return {
      message: 'hello!',
    };
  }
}
