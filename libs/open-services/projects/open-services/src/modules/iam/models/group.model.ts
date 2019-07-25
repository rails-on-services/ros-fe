import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { IamUser } from './user.model';

@JsonApiModelConfig({
  type: 'groups'
})
export class IamGroup extends JsonApiModel {
  @Attribute()
  public name: string;

  @HasMany()
  public users: IamUser[];

  @Attribute()
  public urn: string;

  public type: string = 'group';

  // @Attribute({ serializedName: 'attached_policies' })
  public attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  public attachedActions: {};

  @Attribute({ serializedName: 'created_at'})
  public creationTime: Date;
}
