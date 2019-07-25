import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'files'
})
export class StorageFile extends JsonApiModel {
  @Attribute({ serializedName: 'filename' })
  public name: string;

  @Attribute({ serializedName: 'urn' })
  public urn: string;

  @Attribute({ serializedName: 'extension' })
  public extension: string;

  @Attribute({ serializedName: 'created_at' })
  public createdAt: Date;
}
