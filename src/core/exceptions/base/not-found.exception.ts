import { ApplicationException } from './application.exception';

export class NotFoundException extends ApplicationException {
  constructor(
    public readonly resourceName: string,
    public readonly resourceId?: string,
  ) {
    super(
      `${resourceName} not found${resourceId ? ` with ID: ${resourceId}` : ''}`,
    );
  }
}
