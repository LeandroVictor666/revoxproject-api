import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { RevoxdbModule } from './revoxdb/revoxdb.module';
import { DataSource } from 'typeorm';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [RegisterModule, RevoxdbModule, AuthenticationModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
