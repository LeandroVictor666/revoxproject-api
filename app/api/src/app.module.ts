import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { RevoxdbModule } from './revoxdb/revoxdb.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [RegisterModule, RevoxdbModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
