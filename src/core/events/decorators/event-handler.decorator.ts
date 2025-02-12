export function EventHandler(eventType: string) {
  return function (target: any) {
    Reflect.defineMetadata('eventType', eventType, target);
  };
}
