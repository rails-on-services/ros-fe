import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CognitoUser } from './user.model';

@JsonApiModelConfig({
  type: 'pools'
})
export class CognitoPool extends JsonApiModel {
  @Attribute()
  poolname: string;

  @HasMany()
  users: CognitoUser[];

  @Attribute()
  urn: string;

  type = 'pool';

  // @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
