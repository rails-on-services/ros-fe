import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { IamGroup as Group } from './group.model';

@Tablify()
@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  @Column({ name: 'User Name', sortable: true })
  @Attribute()
  username: string;

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  type = 'user';

  @Column({ name: 'Console Access' })
  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @Column({ name: 'API Access' })
  @Attribute({ serializedName: 'api' })
  apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'display_properties' })
  displayProperties: {};

  @Column({ name: 'Groups' })
  @HasMany()
  groups: Group[];
}
