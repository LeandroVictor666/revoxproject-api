import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Publications } from 'src/database/entity/publication.entity';
import { AccountDto } from 'src/dto/account-dto';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
import { Repository } from 'typeorm';
@Injectable()
export class PublicationService {
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
    const payload = this.getTokenPayload<AccountDto>(Request);
    if (payload == null) {
      return this.callToDispatchAuthError();
    }
    try {
      await this.createNewPublication(
        payload.id,
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
  private callToDispatchAuthError() {
    return this.apiMessagerService.createErrorResponse(
      'Invalid authentication, please authenticate',
      ResponseStatus.NeedAuthorization,
    );
  }
}
