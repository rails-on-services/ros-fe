import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'credentials'
})
export class IamCredential extends JsonApiModel {

  @Attribute()
  public urn: string;

  @Attribute({ serializedName: 'access_key_id' })
  public accessKeyId: string;

  @Attribute({ serializedName: 'secret_access_key' })
  public secretAccessKey: string;

  @Attribute({ serializedName: 'schema_name' })
  public schemaName: string;

  @Attribute({ serializedName: 'owner_type' })
  public ownerType: string;

  @Attribute({ serializedName: 'owner_id' })
  public ownerId: string;
}
