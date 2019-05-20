import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { IamUser } from './user.model';

@Tablify()
@JsonApiModelConfig({
  type: 'groups'
})
export class IamGroup extends JsonApiModel {
  @Column({ name: 'Group Name', sortable: true })
  @Attribute()
  name: string;

  @Column({ name: 'Users' })
  @HasMany()
  users: IamUser[];

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  type = 'group';

  @Column({ name: 'Inline Policies' })
  // @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Column({ name: 'Creation Time' })
  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
