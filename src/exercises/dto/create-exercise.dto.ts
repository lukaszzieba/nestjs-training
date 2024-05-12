import { IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
