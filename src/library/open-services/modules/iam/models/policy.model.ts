import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'policies'
})
export class IamPolicy extends JsonApiModel {
  @Column({ name: 'Policy Name', sortable: true })
  @Attribute({ serializedName: 'policyname'})
  policyname: string;

  @Attribute({ serializedName: 'urn'})
  urn: string;

  // @Column({ name: 'Console Access' })
  // @Attribute({ serializedName: 'console' })
  // consoleAccess: boolean;
  //
  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Column({ name: 'Type' })
  @Attribute({ serializedName: 'type' })
  type: string;

  @Column({ name: 'Attachments', sortable: true })
  @Attribute({ serializedName: 'attachments' })
  attachments: number;

  @Column({ name: 'Used as' })
  @Attribute({ serializedName: 'used_as' })
  usedAs: string;

  @Column({ name: 'Creation time', sortable: true })
  @Attribute({ serializedName: 'creation_time' })
  creationTime: string;

  @Column({ name: 'Edited time', sortable: true })
  @Attribute({ serializedName: 'edited_time' })
  editedTime: string;

  @Column({ name: 'Description' })
  @Attribute({ serializedName: 'description' })
  description: string;

  @Attribute({ serializedName: 'json_summary' })
  policy: {};
}
