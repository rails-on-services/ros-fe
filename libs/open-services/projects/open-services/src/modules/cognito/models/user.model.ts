import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CognitoPool as Pool } from './pool.model';

@JsonApiModelConfig({
  type: 'users'
})
export class CognitoUser extends JsonApiModel {
  @Attribute()
  username: string;

  @Attribute()
  urn: string;

  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @Attribute({ serializedName: 'dashboard' })
  dashboardAccess: boolean;

  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @HasMany()
  pools: Pool[];
}
