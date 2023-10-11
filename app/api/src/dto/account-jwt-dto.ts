import { AccountDto } from './account-dto';

export default class AccountJwtDto {
  accountData: AccountDto;
  originIp: string;
  iat: number;
  exp: number;
}
