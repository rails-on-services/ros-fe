import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';

@JsonApiModelConfig({
  type: 'credentials'
})
export class CognitoCredential extends JsonApiModel {

  @Attribute()
  urn: string;

  @Attribute({ serializedName: 'access_key_id' })
  accessKeyId: string;

  @Attribute({ serializedName: 'secret_access_key' })
  secretAccessKey: string;

  @Attribute({ serializedName: 'schema_name' })
  schemaName: string;

  @Attribute({ serializedName: 'owner_type' })
  ownerType: string;

  @Attribute({ serializedName: 'owner_id' })
  ownerId: string;
}
