import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publications } from 'src/database/entity/publication.entity';
import NewPublicationDto from 'src/dto/new-publication-dto';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publications)
    private readonly publicationsRepository: Repository<Publications>,
  ) {}
  makeNewPublication(newPublicationDto: NewPublicationDto) {
    this.publicationsRepository.insert(newPublicationDto);
  }
}
