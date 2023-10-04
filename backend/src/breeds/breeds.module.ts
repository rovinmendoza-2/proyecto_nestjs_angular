import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  providers: [BreedsService],
  controllers: [BreedsController],
  exports: [TypeOrmModule],
})
export class BreedsModule {}
