import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationInterceptor } from './publication.interceptor';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { PublicationService } from './publication.service';
import { Request } from 'express';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
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

  @UseInterceptors(PublicationInterceptor)
  @UseGuards(AuthenticationGuard)
  @Post('fire-publication')
  async firePublication(
    @Body() bodyRequest: NewPublicationDto,
    @Req() req: Request,
  ) {
    return await this.publicationService.makeNewPublication(bodyRequest, req);
  }
}
