import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Publications } from 'src/database/entity/publication.entity';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { ServerResponseDto } from 'src/dto/server-response.dto';
import { ResponseStatus } from 'src/enum/response-status.enum';
import { ApiMessagerService } from 'src/api-messager/api-messager.service';
import { Repository } from 'typeorm';
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

  /**
   * This function will fix 'Publications' property object, if you don't use it, the object will look like this:
   *     "publications": [
        {
            "id": 57,
            ...
            "authorUsername": {
                "username": "Leandro1337"
            },
            "authorId": {
                "id": 27
            }
        },
    We wants to 'authorUsername' look like this: "authorUsername": "Leandro1337"
    the same for authorId
   * @param {Array<Publications>} publications
   */
  private fixPublicationForeignColumns(publications: Array<Publications>) {
    publications.map((publication) => {
      const authorUsernameFixer = publication.authorUsername as any;
      const authorIdFixer = publication.authorId as any;
      publication.authorUsername = authorUsernameFixer.username;
      publication.authorId = authorIdFixer.id;
    });
  }
  /**
   * This function will make a query that select all publications with a Limit of 25 (Whatever you want, just change the -
   * MAX_SELECT_PUBLICATION_QUERY constant) entities
   * @param {number} lastPublicationId
   * @returns
   */
  private async getPublicationsQuery(lastPublicationId: number) {
    const result = await this.publicationsRepository
      .createQueryBuilder('publications')
      .where('publications.id > :lastPublicationId', { lastPublicationId })
      .orderBy('publications.id', 'DESC')
      .take(this.MAX_SELECT_PUBLICATION_QUERY)
      .leftJoin('publications.authorUsername', 'author')
      .leftJoin('publications.authorId', 'authorId')
      .select([
        'publications.id',
        'publications.content',
        'publications.likesCounter',
        'publications.commentsCounter',
        'publications.sharesCounter',
        'publications.publicationDate',
        'author.username',
        'authorId.id',
      ])
      .getMany();
    return result;
  }
  /**
   * This function calls the 'getPublicationsQuery' function, which returns a list of publications
   * Then, it fixes the 'Publication' object properties by calling the 'fixPublicationForeignColumns' function, and then returns the result to the client
   * @param publicationRequest T
   * @returns
   */
  async getPublications(
    publicationRequest: PublicationsRequestDto,
  ): Promise<PublicationsDto> {
    const publications = await this.getPublicationsQuery(
      publicationRequest.lastPublicationId,
    );
    this.fixPublicationForeignColumns(publications);
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
