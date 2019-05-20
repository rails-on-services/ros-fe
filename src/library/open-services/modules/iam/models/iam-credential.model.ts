import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'credentials'
})
export class IamCredential extends JsonApiModel {

  @Attribute()
  urn: string;

  @Column({ name: 'Access Key ID' })
  @Attribute({ serializedName: 'access_key_id' })
  accessKeyId: string;

  @Column({ name: 'Secret Access Key' })
  @Attribute({ serializedName: 'secret_access_key' })
  secretAccessKey: string;

  @Attribute({ serializedName: 'schema_name' })
  schemaName: string;

  @Attribute({ serializedName: 'owner_type' })
  ownerType: string;

  @Attribute({ serializedName: 'owner_id' })
  ownerId: string;
}
