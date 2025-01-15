import { IsString, IsOptional, ValidateNested } from 'class-validator';

export class CreatePlaceDTO {
  @IsString()
  zone: string;

  @IsString()
  placeName: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;
}

export class UpdatePlaceDTO {
  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsString()
  placeName?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;
}
