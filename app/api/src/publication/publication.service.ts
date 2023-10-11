import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Publications } from 'src/database/entity/publication.entity';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
import { MoreThan, Repository } from 'typeorm';
import PublicationsDto from 'src/dto/publications-dto';
import PublicationsRequestDto from 'src/dto/publications-request-dto';
import AccountJwtDto from 'src/dto/account-jwt-dto';
@Injectable()
export class PublicationService {
  private MAX_SELECT_PUBLICATION_QUERY = 25;
  constructor(
    @InjectRepository(Publications)
    private readonly publicationsRepository: Repository<Publications>,
    private readonly jwtService: JwtService,
    private readonly apiMessagerService: ApiMessagerService,
  ) {}
  async makeNewPublication(
    newPublicationDto: NewPublicationDto,
    Request: Request,
  ): Promise<ServerResponseDto> {
    const payload = this.getTokenPayload<AccountJwtDto>(Request).accountData;
    if (payload == null) {
      return this.callToDispatchAuthError();
    }
    try {
      await this.createNewPublication(
        Number(payload.id),
        payload.username,
        newPublicationDto.content,
      );
      return this.apiMessagerService.createSuccessResponse(
        'Published Sucessfully',
        ResponseStatus.Success,
      );
    } catch (error) {
      return this.apiMessagerService.dispatchPostreSQLError(Number(error.code));
    }
  }
  getTokenPayload<T>(request: Request): T | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type != 'Bearer' || !token) {
      return null;
    }
    const payload = this.jwtService.decode(token);
    return payload as T;
  }

  private async createNewPublication(
    authorId: number,
    authorUsername: string,
    publicationContent: string,
  ) {
    return await this.publicationsRepository.insert({
      authorId: authorId,
      authorUsername: authorUsername,
      content: publicationContent,
    });
  }

  private async getPublicationsQuery(lastPublicationId: number) {
    return await this.publicationsRepository.find({
      where: { id: MoreThan(lastPublicationId) },
      order: { id: 'ASC' },
      take: this.MAX_SELECT_PUBLICATION_QUERY,
    });
  }

  async getPublications(
    publicationRequest: PublicationsRequestDto,
  ): Promise<PublicationsDto> {
    const publications = await this.getPublicationsQuery(
      publicationRequest.lastPublicationId,
    );
    return {
      publications: publications,
      count: publications.length,
    };
  }

  private callToDispatchAuthError() {
    return this.apiMessagerService.createErrorResponse(
      'Invalid authentication, please authenticate',
      ResponseStatus.NeedAuthorization,
    );
  }
}
