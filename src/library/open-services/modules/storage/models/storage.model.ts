import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'files'
})
export class StorageFile extends JsonApiModel {
  @Attribute({ serializedName: 'filename' })
  name: string;

  @Attribute({ serializedName: 'urn' })
  urn: string;

  @Attribute({ serializedName: 'extension' })
  extension: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: Date;

}
