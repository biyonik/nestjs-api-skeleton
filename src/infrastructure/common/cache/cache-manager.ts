import { ICacheManager } from 'src/core/shared/decorators/cacheable.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheManager implements ICacheManager {
  private cache: Map<string, { value: any; expiresAt: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T>(
    key: string,
    value: T,
    ttlSeconds: number = 3600,
  ): Promise<void> {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
}
