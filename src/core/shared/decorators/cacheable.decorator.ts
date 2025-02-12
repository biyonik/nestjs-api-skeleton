export interface ICacheManager {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
}

export function Cacheable(ttlSeconds: number = 3600) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheManager = (this as any).cacheManager as ICacheManager;
      if (!cacheManager) {
        return await originalMethod.apply(this, args);
      }

      const cacheKey = `${target.constructor.name}-${propertyKey}-${JSON.stringify(args)}`;
      const cachedValue = await cacheManager.get(cacheKey);

      if (cachedValue !== null) {
        return cachedValue;
      }

      const result = await originalMethod.apply(this, args);
      await cacheManager.set(cacheKey, result, ttlSeconds);

      return result;
    };

    return descriptor;
  };
}
