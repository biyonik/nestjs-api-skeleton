import { LogLevel } from '../../common/constants/log-level.constant';

export function Log(level: LogLevel = LogLevel.INFO) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        // Logging implementation will be added in infrastructure layer
        return await originalMethod.apply(this, args);
      } catch (error) {
        // Error logging implementation
        throw error;
      }
    };

    return descriptor;
  };
}
