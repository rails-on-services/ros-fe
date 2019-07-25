import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'policies'
})
export class IamPolicy extends JsonApiModel {
  @Attribute({ serializedName: 'policyname'})
  public policyname: string;

  @Attribute({ serializedName: 'urn'})
  public urn: string;

  // @Column({ name: 'Console Access' })
  // @Attribute({ serializedName: 'console' })
  // consoleAccess: boolean;
  //
  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Attribute({ serializedName: 'type' })
  public type: string;

  @Attribute({ serializedName: 'attachments' })
  public attachments: number;

  @Attribute({ serializedName: 'used_as' })
  public usedAs: string;

  @Attribute({ serializedName: 'creation_time' })
  public creationTime: string;

  @Attribute({ serializedName: 'edited_time' })
  public editedTime: string;

  @Attribute({ serializedName: 'description' })
  public description: string;

  @Attribute({ serializedName: 'json_summary' })
  public policy: {};
}
