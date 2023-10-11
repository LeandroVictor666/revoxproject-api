import { Publications } from 'src/database/entity/publication.entity';

export default class PublicationsDto {
  publications: Array<Publications>;
  count: number;
}
