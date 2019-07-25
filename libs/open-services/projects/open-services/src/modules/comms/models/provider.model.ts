import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CommsEvent } from './event.model';

@JsonApiModelConfig({
  type: 'providers'
})
export class CommsProvider extends JsonApiModel {
  @Attribute()
  public providername: string;

  @Attribute({ serializedName: 'encrypted_secret' })
  public encryptedSecret: string;

  @Attribute({ serializedName: 'encrypted_secret_iv' })
  public encryptedSecretIv: string;

  @Attribute()
  public key: string;

  @Attribute({ serializedName: 'created_at' })
  public createdAt: string;

  @HasMany()
  public events: CommsEvent[];
}
