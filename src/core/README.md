# Core Layer

Core katmanı, uygulamanın domain modellerini ve temel iş mantığını içerir. Bu katman, dış dünyadan ve teknik detaylardan tamamen izole edilmiştir.

## 📁 Klasör Yapısı

```
core/
├── domain/           # Domain modeller ve logic
│   ├── base/        # Base entity ve value objects
│   ├── models/      # Domain modeller
│   └── events/      # Domain events
├── interfaces/      # Soyutlamalar ve contracts
├── exceptions/      # Domain-specific exceptions
└── shared/         # Shared kernel
```

## 🏛️ Mimari Bileşenler

### Domain Models

Domain modeller rich domain model yaklaşımı ile implemente edilmiştir:

```typescript
export class Product extends AggregateRoot<string> {
    private _name: string;
    private _price: Money;
    private _stock: number;

    private constructor(id: string, name: string, price: Money) {
        super(id);
        this._name = name;
        this._price = price;
    }

    public static create(name: string, price: Money): Product {
        // Business logic & validation
    }
}
```

### Value Objects

İmmutable value objects ile domain logic encapsulation:

```typescript
export class Money extends ValueObject {
    private constructor(
        private readonly amount: number,
        private readonly currency: string
    ) {
        super();
    }

    public static create(amount: number, currency: string): Money {
        // Validation logic
    }
}
```

### Domain Events

Event-driven mimari için domain events:

```typescript
export class ProductCreatedEvent extends DomainEvent {
    constructor(
        public readonly productId: string,
        public readonly name: string
    ) {
        super();
    }
}
```

## 🔧 Repository Interfaces

Repository pattern için interface'ler:

```typescript
export interface IRepository<T extends AggregateRoot<TId>, TId> {
    findById(id: TId): Promise<T | null>;
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: TId): Promise<void>;
}
```

## 🎯 Best Practices

1. **Immutability**
    - Value objects immutable olmalı
    - Entity state değişiklikleri metodlar aracılığıyla yapılmalı

2. **Encapsulation**
    - Private fields
    - Public interface'ler aracılığıyla erişim
    - Business logic entity içinde

3. **Validation**
    - Domain rules entity içinde
    - Value objects self-validating
    - Guard clauses

4. **Event-Driven**
    - Domain events için support
    - Event sourcing hazırlığı
    - Event-driven state changes

## 🚫 Kısıtlamalar

Core katmanında:
- Framework bağımlılığı olmamalı
- Infrastructure concerns olmamalı
- UI/Presentation logic olmamalı
- External service calls olmamalı

## 📝 Exceptions

Domain-specific exception hierarchy:

```typescript
export class DomainException extends Error {
    constructor(message: string) {
        super(`Domain Exception: ${message}`);
    }
}
```

## 🔍 Validation Rules

Domain validation kuralları:
- Business rule validations
- Invariants
- Domain constraints

## 📚 Örnekler

### Entity Örneği
```typescript
export class Order extends AggregateRoot<string> {
    private _items: OrderItem[] = [];
    private _status: OrderStatus;

    public addItem(product: Product, quantity: number): void {
        if (this._status !== OrderStatus.Draft) {
            throw new OrderException("Cannot add items to non-draft order");
        }
        // Business logic
    }
}
```

### Value Object Örneği
```typescript
export class Email extends ValueObject {
    private constructor(private readonly value: string) {
        super();
        this.validate();
    }

    private validate(): void {
        // Validation logic
    }
}
```

## 🤝 Katkıda Bulunma

Core katmanına katkıda bulunurken:
1. Domain model zenginleştirilmeli
2. Business rules entity'lerde olmalı
3. Value objects immutable olmalı
4. Exception handling geliştirilmeli