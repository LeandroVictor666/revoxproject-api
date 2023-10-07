import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/database/entity/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async getPassword(username: string): Promise<string | false> {
    this.accountRepository.findOne({
      select: ['password'],
      where: { username: username },
    });
    const account = await this.accountRepository.findOneBy({
      username: username,
    });
    if (account === null) {
      return Promise.reject(false);
    }
    return Promise.resolve(account.password);
  }
  async getSecureAccountDataByUsername(
    username: string,
  ): Promise<Account | false> {
    const result = await this.accountRepository.findOne({
      select: ['id', 'nickname', 'email', 'isPfpSet', 'birthday'],
      where: {
        username: username,
      },
    });
    if (result === null) {
      return Promise.reject(false);
    }
    return Promise.resolve(result);
  }
}
