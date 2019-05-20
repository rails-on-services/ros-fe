import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CognitoUser } from './user.model';

@Tablify()
@JsonApiModelConfig({
  type: 'pools'
})
export class CognitoPool extends JsonApiModel {
  @Column({ name: 'Pool Name', sortable: true })
  @Attribute()
  name: string;

  @Column({ name: 'Users' })
  @HasMany()
  users: CognitoUser[];

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  type = 'pool';

  @Column({ name: 'Inline Policies' })
  // @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Column({ name: 'Creation Time' })
  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
