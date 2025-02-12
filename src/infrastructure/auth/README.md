# Authentication & Authorization Module

Bu modül, uygulamanın kimlik doğrulama ve yetkilendirme işlemlerini yönetir. JWT tabanlı authentication, rol tabanlı yetkilendirme ve claim-based authorization özelliklerini içerir.

## 📁 Klasör Yapısı

```bash
auth/
├── commands/                # Command pattern implementasyonları
│   ├── login.command.ts
│   ├── register.command.ts
│   ├── assign-role.command.ts
│   └── handlers/
│       ├── login.handler.ts
│       └── register.handler.ts
├── queries/                 # Query pattern implementasyonları
│   ├── get-user.query.ts
│   └── handlers/
│       └── get-user.handler.ts
├── controllers/            # HTTP endpoint'leri
│   └── auth.controller.ts
├── guards/                 # Authentication guard'ları
│   └── jwt.guard.ts
├── decorators/            # Custom decoratorlar
│   ├── current-user.decorator.ts
│   └── roles.decorator.ts
├── dtos/                  # Data Transfer Objects
│   ├── login.dto.ts
│   └── register.dto.ts
└── services/             # Auth servisleri
    ├── jwt.service.ts
    └── user.service.ts
```

## 🚀 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install @nestjs/jwt bcrypt class-validator class-transformer
```

2. Environment değişkenlerini ayarlayın:
```env
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
```

3. Auth modülünü ana modüle import edin:
```typescript
@Module({
  imports: [
    AuthModule
  ]
})
export class AppModule {}
```

## 🔑 Özellikler

### Authentication
- JWT tabanlı authentication
- Refresh token desteği
- Session yönetimi
- Güvenli password hashing (bcrypt)

### Authorization
- Role-based access control (RBAC)
- Claim-based authorization
- Policy-based authorization
- Dynamic permission checking

### Security
- Password hashing (bcrypt)
- JWT token encryption
- Rate limiting
- Request validation

## 📝 API Endpoints

### Public Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Protected Endpoints

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Get User Roles
```http
GET /auth/roles
Authorization: Bearer <token>
```

#### Assign Role
```http
POST /auth/roles/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "uuid",
  "roleId": "uuid"
}
```

## 🛡️ Guards Kullanımı

### JWT Guard
```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get('profile')
  getProfile(@CurrentUser() user: ICurrentUser) {
    return user;
  }
}
```

### Role Guard
```typescript
@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Post('settings')
  @RequireRoles(['Admin'])
  updateSettings(@Body() settings: any) {
    // Only admins can access
  }
}
```

## 🎯 CQRS Pattern Kullanımı

### Command Örneği
```typescript
// Command
export class LoginCommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

// Handler
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  async execute(command: LoginCommand) {
    // Implementation
  }
}
```

### Query Örneği
```typescript
// Query
export class GetUserQuery {
  constructor(public readonly userId: string) {}
}

// Handler
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  async execute(query: GetUserQuery) {
    // Implementation
  }
}
```

## 🔒 Güvenlik Önlemleri

1. **Password Hashing**
```typescript
const hashedPassword = await this.passwordHasher.hash(password);
```

2. **JWT Configuration**
```typescript
const token = this.jwtService.sign({
  sub: user.id,
  email: user.email
}, {
  expiresIn: '1h'
});
```

3. **Rate Limiting**
```typescript
@UseGuards(ThrottlerGuard)
@Throttle(5, 60)
```

## 🧪 Test

### Unit Tests
```typescript
describe('AuthService', () => {
  it('should validate user credentials', async () => {
    // Test implementation
  });
});
```

### E2E Tests
```typescript
describe('AuthController (e2e)', () => {
  it('/auth/login (POST)', () => {
    // Test implementation
  });
});
```

## 🤝 Best Practices

1. **Token Management**
    - Access token'ları kısa ömürlü tutun
    - Refresh token kullanın
    - Token blacklist mekanizması ekleyin

2. **Password Security**
    - Minimum 8 karakter
    - Karmaşıklık kuralları
    - Bcrypt ile hashing

3. **Error Handling**
    - Detaylı hata mesajları
    - Güvenli error response'lar
    - Validation pipeline

4. **Validation**
    - DTO validation
    - Custom validators
    - Sanitization

## 📚 Örnek Kullanımlar

### Controller'da Kullanım
```typescript
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const command = new LoginCommand(dto.email, dto.password);
    return this.commandBus.execute(command);
  }
}
```

### Service'de Kullanım
```typescript
@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const isValid = await this.passwordHasher.verify(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}
```

## 🔍 Troubleshooting

1. **Invalid Token**
    - Token formatını kontrol edin
    - Token süresinin dolup dolmadığını kontrol edin
    - Secret key'in doğru olduğunu kontrol edin

2. **Authentication Failed**
    - Kullanıcı credentials'larını kontrol edin
    - Rate limit durumunu kontrol edin
    - Log'ları inceleyin

3. **Authorization Failed**
    - Kullanıcı rollerini kontrol edin
    - Policy'leri kontrol edin
    - Permission mapping'i kontrol edin

## 📝 Not

Bu modülü kullanırken dikkat edilmesi gerekenler:
- Environment variables'ları doğru yapılandırın
- Rate limiting ayarlarını optimize edin
- Error handling mekanizmasını özelleştirin
- Logging mekanizmasını configure edin