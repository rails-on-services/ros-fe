import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { IamUser } from './user.model';

@JsonApiModelConfig({
  type: 'groups'
})
export class IamGroup extends JsonApiModel {
  @Attribute()
  groupname: string;

  @HasMany()
  users: IamUser[];

  @Attribute()
  urn: string;

  type = 'group';

  // @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
