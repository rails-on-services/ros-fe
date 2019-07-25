import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CognitoPool as Pool } from './pool.model';

@JsonApiModelConfig({
  type: 'users'
})
export class CognitoUser extends JsonApiModel {
  @Attribute()
  public username: string;

  @Attribute()
  public urn: string;

  @Attribute({ serializedName: 'console' })
  public consoleAccess: boolean;

  @Attribute({ serializedName: 'dashboard' })
  public dashboardAccess: boolean;

  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  public attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  public attachedActions: {};

  @HasMany()
  public pools: Pool[];
}
