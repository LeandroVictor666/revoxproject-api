import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationInterceptor } from './publication.interceptor';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { PublicationService } from './publication.service';
import { Request } from 'express';
import PublicationsRequestDto from 'src/dto/publications-request-dto';
// import PublicationsRequestDto from 'src/dto/publications-request-dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get('get-publications')
  async getPublications(@Query() query: PublicationsRequestDto) {
    return this.publicationService.getPublications(query);
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
