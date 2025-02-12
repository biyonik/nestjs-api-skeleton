import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatus } from 'src/core/common/enums/http-status.enum';
import { BaseController } from 'src/infrastructure/common/base/base-controller';
import { LoginCommand } from '../commands/login.command';
import { RegisterCommand } from '../commands/register.command';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ICurrentUser } from 'src/core/interfaces/auth/current-user.interface';
import { GetUserQuery } from '../queries/get-user.query';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUserRolesQuery } from '../queries/get-user-roles.query';
import { GetUserClaimsQuery } from '../queries/get-user-claims.query';
import { AssignRoleCommand } from '../commands/assign-role.command';
import { AssignClaimCommand } from '../commands/assign-claim.command';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { AssignClaimDto } from '../dto/assign-claim.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() dto: LoginDto) {
    const command = new LoginCommand(dto.email, dto.password);
    return this.executeCommand<{ accessToken: string }>(command);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration successful',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async register(@Body() dto: RegisterDto) {
    const command = new RegisterCommand(dto.email, dto.password, dto.name);
    return this.executeCommand<string>(command);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully',
  })
  async getCurrentUser(@CurrentUser() user: ICurrentUser) {
    const query = new GetUserQuery(user.id);
    return this.executeQuery(query);
  }

  @Get('roles')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Roles retrieved successfully',
  })
  async getUserRoles(@CurrentUser() user: ICurrentUser) {
    const query = new GetUserRolesQuery(user.id);
    return this.executeQuery(query);
  }

  @Get('claims')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user claims' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Claims retrieved successfully',
  })
  async getUserClaims(@CurrentUser() user: ICurrentUser) {
    const query = new GetUserClaimsQuery(user.id);
    return this.executeQuery(query);
  }

  @Post('roles/assign')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role assigned successfully',
  })
  async assignRole(
    @CurrentUser() user: ICurrentUser,
    @Body() dto: AssignRoleDto,
  ) {
    const command = new AssignRoleCommand(dto.userId, dto.roleId);
    return this.executeCommand(command);
  }

  @Post('claims/assign')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign claim to user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Claim assigned successfully',
  })
  async assignClaim(
    @CurrentUser() user: ICurrentUser,
    @Body() dto: AssignClaimDto,
  ) {
    const command = new AssignClaimCommand(
      dto.userId,
      dto.claimType,
      dto.claimValue,
    );
    return this.executeCommand(command);
  }
}
