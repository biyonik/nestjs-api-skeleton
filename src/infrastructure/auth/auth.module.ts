import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/core/domain/auth/user.entity';
import { Role } from 'src/core/domain/auth/role.entity';
import { UserClaim } from 'src/core/domain/auth/user-claim.entity';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { BcryptPasswordHasher } from './services/password-hasher.service';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';
import { LoginCommandHandler } from './handlers/login.handler';
import { AssignRoleCommandHandler } from './handlers/assign-role.handler';
import { GetUserQueryHandler } from './handlers/get-user.handler';
import { GetUserRolesQueryHandler } from './handlers/get-user-roles.handler';
import { GetUserClaimsQueryHandler } from './handlers/get-user-claims.handler';
import { RegisterCommandHandler } from './handlers/register.handler';
import { AssignClaimCommandHandler } from './handlers/assign-claim.handler';
import { Permission } from 'src/core/domain/auth/permission.entity';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role, UserClaim, Permission]),
  ],
  controllers: [AuthController],
  providers: [
    // Services
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
    {
      provide: 'IPasswordHasher',
      useClass: BcryptPasswordHasher,
    },

    // Repositories
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository,
    },

    // Guards
    JwtAuthGuard,

    // Command Handlers
    LoginCommandHandler,
    RegisterCommandHandler,
    AssignRoleCommandHandler,
    AssignClaimCommandHandler,

    // Query Handlers
    GetUserQueryHandler,
    GetUserRolesQueryHandler,
    GetUserClaimsQueryHandler,
  ],
  exports: [
    'IUserService',
    'IJwtService',
    'IPasswordHasher',
    'IUserRepository',
    'IRoleRepository',
    JwtAuthGuard,
  ],
})
export class AuthModule {}
