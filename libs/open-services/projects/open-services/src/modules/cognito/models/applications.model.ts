import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'applications'
})
export class CognitoApplication extends JsonApiModel {
  @Attribute()
  public applicationname: string;

  @Attribute()
  public urn: string;

  @Attribute({ serializedName: 'created_at'})
  public creationTime: Date;
}
