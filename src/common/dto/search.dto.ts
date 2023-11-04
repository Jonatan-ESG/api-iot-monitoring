// search.dto.ts
import { IsOptional, IsArray, IsString, ValidateNested, IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SearchCondition)
  conditions?: SearchCondition[];
}

export class SearchCondition {
  @ApiProperty()
  @IsString()
  field: string;

  @ApiProperty({ enum: ['like', 'notLike', 'in', 'between', '=', '<', '>', '<=', '>=', '<>'] })
  @IsString()
  @IsIn(['like', 'notLike', 'in', 'between', '=', '<', '>', '<=', '>=', '<>'])
  operator: 'like' | 'notLike' | 'in' | 'between' | '=' | '<' | '>' | '<=' | '>=' | '<>';

  @ApiProperty()
  @IsNotEmpty()
  value: any;
}
