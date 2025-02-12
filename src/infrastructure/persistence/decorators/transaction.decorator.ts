import { EntityManager } from 'typeorm';

export function Transactional() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const entityManager = this.manager as EntityManager;

      try {
        await entityManager.queryRunner?.startTransaction();
        const result = await originalMethod.apply(this, args);
        await entityManager.queryRunner?.commitTransaction();
        return result;
      } catch (error) {
        await entityManager.queryRunner?.rollbackTransaction();
        throw error;
      }
    };

    return descriptor;
  };
}
