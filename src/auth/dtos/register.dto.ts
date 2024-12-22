import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'StrongP@ssword123',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'The role of the user',
    example: UserRole.CUSTOMER,
    enum: UserRole,
  })
  role?: UserRole; // Optional role with a default set in the entity
}
