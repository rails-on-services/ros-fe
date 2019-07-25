import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'policies'
})
export class IamPolicy extends JsonApiModel {
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

  @Attribute({ serializedName: 'type' })
  type: string;

  @Attribute({ serializedName: 'attachments' })
  attachments: number;

  @Attribute({ serializedName: 'used_as' })
  usedAs: string;

  @Attribute({ serializedName: 'creation_time' })
  creationTime: string;

  @Attribute({ serializedName: 'edited_time' })
  editedTime: string;

  @Attribute({ serializedName: 'description' })
  description: string;

  @Attribute({ serializedName: 'json_summary' })
  policy: {};
}
