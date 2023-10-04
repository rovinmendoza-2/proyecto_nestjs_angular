/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { Role } from '../common/enums/role.enum';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createCatDto.breed);
    const newUser = await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    });
    return { newUser, message: 'Se registro con exito!'};
  }

  async findAll(user: UserActiveInterface) {
    if(user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    await this.findOne(id, user );
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email,
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user );
    const remove =  await this.catRepository.softDelete({ id });
    return {remove, message: 'Se elimino con exito!'}
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }
}