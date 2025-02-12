import { BaseQuery } from 'src/infrastructure/cqrs/queries/base.query';

export class GetUserClaimsQuery extends BaseQuery {
  constructor(public readonly userId: string) {
    super();
  }
}
