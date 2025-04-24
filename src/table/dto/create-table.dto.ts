import { IsString, IsInt, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsNumber()
  zoneId: number; // ID of the zone to which the table belongs
}
