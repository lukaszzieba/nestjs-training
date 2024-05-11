import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesRepository {
  constructor(private readonly dbService: DbService) {}

  create(exercise: CreateExerciseDto) {
    try {
      this.dbService.runQuery(`

`);
    } catch (e: unknown) {}
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
