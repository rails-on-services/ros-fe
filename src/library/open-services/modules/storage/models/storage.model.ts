import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'storages'
})
export class StorageFile extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
