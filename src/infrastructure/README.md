# Infrastructure Layer

Infrastructure katmanı, uygulamanın teknik detaylarını ve dış dünya ile olan etkileşimlerini yönetir. Core katmandaki soyutlamaların somut implementasyonlarını içerir.

## 📁 Klasör Yapısı

```
infrastructure/
├── database/           # Veritabanı konfigürasyonu ve bağlantıları
│   ├── config/        # Database config
│   ├── migrations/    # DB migrations
│   └── providers/     # Database providers
├── persistence/        # Repository implementasyonları
│   ├── repositories/  # Concrete repositories
│   └── specifications/# Query specifications
├── events/            # Event altyapısı
│   ├── bus/          # Event bus implementation
│   ├── store/        # Event store
│   └── handlers/     # Event handlers
├── cqrs/              # CQRS implementasyonu
│   ├── commands/     # Command handlers
│   └── queries/      # Query handlers
└── common/            # Cross-cutting concerns
    ├── interceptors/ # NestJS interceptors
    ├── filters/      # Exception filters
    └── decorators/   # Custom decorators
```

## 🗃️ Database Layer

### Database Provider
```typescript
export class PostgresProvider extends DatabaseProvider {
    async createConnection(): Promise<DataSource> {
        // PostgreSQL connection implementation
    }
}
```

### Configuration
```typescript
export const createDatabaseConfig = (): IDatabaseConfig => {
    return {
        type: process.env.DB_TYPE as 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
};
```

## 💾 Repository İmplementasyonları

### Base Repository
```typescript
export abstract class BaseRepository<T extends AggregateRoot<TId>, TId> 
    implements IRepository<T, TId> {
    
    async findById(id: TId): Promise<T | null> {
        // Implementation
    }
    
    async create(entity: T): Promise<void> {
        // Implementation
    }
}
```

### Specification Pattern
```typescript
export abstract class Specification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(item: T): boolean;
}
```

## 🔄 Event Infrastructure

### Event Bus
```typescript
@Injectable()
export class EventBus implements IEventBus {
    async publish<TEvent extends BaseEvent>(event: TEvent): Promise<void> {
        // Event publishing implementation
    }
}
```

### Event Store
```typescript
@Injectable()
export class EventStore implements IEventStore {
    async saveEvent<TEvent extends DomainEvent>(event: TEvent): Promise<void> {
        // Event persistence implementation
    }
}
```

## ⚡ CQRS Implementation

### Command Handling
```typescript
export abstract class BaseCommandHandler<TCommand extends BaseCommand, TResult> {
    async execute(command: TCommand): Promise<TResult> {
        // Base command handling logic
    }
}
```

### Query Handling
```typescript
export abstract class BaseQueryHandler<TQuery extends BaseQuery, TResult> {
    async execute(query: TQuery): Promise<TResult> {
        // Base query handling logic
    }
}
```

## 🛡️ Cross-Cutting Concerns

### Logging
```typescript
@Injectable()
export class LoggerService implements LoggerService {
    log(message: string, context?: string): void {
        // Logging implementation
    }
}
```

### Cache Manager
```typescript
@Injectable()
export class CacheManager implements ICacheManager {
    async get<T>(key: string): Promise<T | null> {
        // Cache retrieval implementation
    }
}
```

### Exception Filters
```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void {
        // Global exception handling
    }
}
```

## 🔧 Konfigürasyon

### Environment Variables
Infrastructure katmanı için gereken environment variables:

```env
# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=app_db

# Cache
CACHE_TTL=3600
CACHE_MAX_ITEMS=1000

# Event Store
EVENT_STORE_TYPE=postgres
```

## 📚 Kullanılan Teknolojiler

- TypeORM / Prisma
- PostgreSQL
- Redis (opsiyonel)
- class-validator
- class-transformer

## 🚀 Başlangıç

1. Environment değişkenlerini ayarlayın
2. Database migration'ları çalıştırın
3. Event store'u initialize edin
4. Cache service'i başlatın

```bash
# Migration'ları çalıştır
npm run migration:run

# Yeni migration oluştur
npm run migration:create

# Migration'ları geri al
npm run migration:revert
```

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Database Transactions**
    - Unit of Work pattern kullanın
    - Transaction boundary'leri doğru belirleyin
    - Deadlock'lardan kaçının

2. **Event Handling**
    - Event'leri asenkron işleyin
    - Event sourcing için audit tutun
    - Failed event'leri handle edin

3. **Caching**
    - Cache invalidation stratejisi belirleyin
    - Cache key'leri standartlaştırın
    - TTL değerlerini optimize edin

4. **Error Handling**
    - Domain exception'ları HTTP status'lara map edin
    - Error loglamayı standartlaştırın
    - Client'a dönen hata mesajlarını sanitize edin

## 🔍 Monitoring & Logging

- Request/Response logging
- Performance metrics
- Error tracking
- Audit logging

## 🧪 Testing

Infrastructure katmanı için test yazarken:

1. **Integration Tests**
    - Database operations
    - External service calls
    - Event handling

2. **Repository Tests**
    - CRUD operations
    - Complex queries
    - Transaction handling

3. **Event Tests**
    - Event publishing
    - Event handling
    - Event store operations

## 📝 Best Practices

1. **Repository Pattern**
    - Generic repository kullanın
    - Specification pattern ile query'leri encapsulate edin
    - Bulk operations için özel metodlar ekleyin

2. **Error Handling**
    - Domain exception'ları infrastructure exception'lara çevirmeyin
    - Infrastructure-specific exception'ları handle edin
    - Logging stratejisi belirleyin

3. **Performance**
    - N+1 query problemi çözün
    - Eager/Lazy loading stratejisi belirleyin
    - Caching kullanın

4. **Security**
    - SQL injection'dan korunun
    - Input validation yapın
    - Sensitive data'yı encrypt edin