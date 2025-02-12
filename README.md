# NestJS DDD & CQRS Skeleton

Bu proje, Domain Driven Design (DDD) ve CQRS (Command Query Responsibility Segregation) pattern'lerini kullanarak geliştirilmiş bir NestJS uygulaması iskeletidir.

## 🏗️ Mimari Yapı

```
src/
├── core/               # Domain modellerimiz ve core business logic
├── infrastructure/     # Teknik implementasyonlar
├── modules/           # Uygulama modülleri
└── shared/           # Shared kernel ve utilities
```

## 🎯 Temel Prensipler

- **OOP (Object Oriented Programming)**
    - Güçlü encapsulation
    - Inheritance ve composition
    - SOLID prensipleri

- **AOP (Aspect Oriented Programming)**
    - Cross-cutting concerns yönetimi
    - Interceptor'lar
    - Decorator'lar

- **Repository Pattern**
    - Generic repository
    - Specification pattern
    - Query builder
    - Type-safe sorgular

- **Event-Driven Architecture**
    - Domain events
    - Event sourcing altyapısı
    - Event handler registry

- **CQRS Pattern**
    - Command ve Query ayrımı
    - Validation pipeline
    - Handler registry

## 🚀 Başlangıç

### Gereksinimler
- Node.js (v18+)
- PostgreSQL
- npm veya yarn

### Kurulum
```bash
# Repository'yi klonlayın
git clone <repo-url>

# Bağımlılıkları yükleyin
npm install

# Environment değişkenlerini ayarlayın
cp .env.example .env

# Development modunda başlatın
npm run start:dev
```

## 📦 Modüler Yapı

Her modül kendi içinde:
- Commands
- Queries
- Handlers
- Domain Models
- Repositories
  içerir.

## 🔧 Konfigürasyon

### Database
`infrastructure/database/config/database.config.ts` içinde veritabanı ayarlarını yapılandırabilirsiniz.

### Validation
Class-validator ile entegre edilmiş validation sistemi mevcuttur.

### Logging
Custom logger implementasyonu ile merkezi loglama yapısı.

## 🧪 Test

```bash
# Unit testleri çalıştır
npm run test

# E2E testleri çalıştır
npm run test:e2e

# Test coverage raporu
npm run test:cov
```

## 📝 Dokümantasyon

Detaylı dokümantasyon için her katmanın kendi README.md dosyasına bakınız:

- [Core Layer Documentation](./src/core/README.md)
- [Infrastructure Layer Documentation](./src/infrastructure/README.md)
- [Modules Documentation](./src/modules/README.md)

## 🛡️ Güvenlik

- Authentication ve Authorization yapısı
- Rate limiting
- Helmet integration
- CORS configuration

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - daha fazla detay için [LICENSE.md](LICENSE.md) dosyasına bakın.

## 🏛️ Mimari Prensipler

### Domain Driven Design (DDD)
- Bounded Contexts
- Aggregates
- Domain Events
- Value Objects
- Repositories

### Clean Architecture
- Bağımlılık Yönü: Dıştan İçe
- Core Domain İzolasyonu
- Infrastructure Soyutlaması

### SOLID Principles
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

## 📚 Kullanılan Teknolojiler

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- class-validator
- class-transformer
- Jest
- ESLint
- Prettier

## ⚙️ Ortam Değişkenleri

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=app_db

# JWT
JWT_SECRET=your-secret
JWT_EXPIRATION=24h

# App
PORT=3000
NODE_ENV=development
```