import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { IamUser } from './user.model';

@JsonApiModelConfig({
  type: 'groups'
})
export class IamGroup extends JsonApiModel {
  @Attribute()
  name: string;

  @HasMany()
  users: IamUser[];

  @Attribute()
  urn: string;

  type: string = 'group';

  // @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
