import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../decorators/column.decorator';
import { IamUser } from './user.model';

@Tablify()
@JsonApiModelConfig({
  type: 'groups'
})
export class IamGroup extends JsonApiModel {
  @Column({ name: 'Group Name', sortable: true })
  @Attribute()
  groupname: string;

  @Column({ name: 'Users' })
  @Attribute()
  users: IamUser[];

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  // @Column({ name: 'Console Access' })
  // @Attribute({ serializedName: 'console' })
  // consoleAccess: boolean;
  //
  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'creation_time'})
  creationTime: {};
}
