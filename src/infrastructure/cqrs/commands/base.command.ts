export abstract class BaseCommand {
  constructor(public readonly id: string = crypto.randomUUID()) {}
}
