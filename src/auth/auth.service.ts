import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Permission } from './entities/permission.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Get the permission based on the role
      const permission = await this.permissionRepository.findOne({
        where: { name: registerDto.permission },
      });

      if (!permission) {
        throw new Error('Invalid permission type');
      }

      // Create new user
      const user = this.userRepository.create({
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        permissions: [permission],
        is_active: true,
      });

      // Save the user
      const savedUser = await this.userRepository.save(user);

      // Remove password from response
      delete savedUser.password;
      //   return {
      //     token,
      //     permissions: user.permissions.map((p) => p.name),
      //   };
      return {
        success: true,
        message: 'Registration successful',
        data: savedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed',
        error: error.response || error,
      };
    }
  }
}
