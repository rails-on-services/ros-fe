import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'applications'
})
export class CognitoApplication extends JsonApiModel {
  @Attribute()
  applicationname: string;

  @Attribute()
  urn: string;

  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
