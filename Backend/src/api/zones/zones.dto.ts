import { IsString, IsOptional } from 'class-validator';

export class CreateZoneDTO {
  @IsString()
  Agent: string;

  @IsString()
  Cap: string;
}

export class UpdateZoneDTO {
  @IsOptional()
  @IsString()
  Agent?: string;

  @IsOptional()
  @IsString()
  Cap?: string;
}
