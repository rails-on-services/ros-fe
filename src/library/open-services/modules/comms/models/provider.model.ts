import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsEvent } from './event.model';

@JsonApiModelConfig({
  type: 'providers'
})
export class CommsProvider extends JsonApiModel {
  @Attribute()
  providername: string;

  @Attribute({ serializedName: 'encrypted_secret' })
  encryptedSecret: string;

  @Attribute({ serializedName: 'encrypted_secret_iv' })
  encryptedSecretIv: string;

  @Attribute()
  key: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @HasMany()
  events: CommsEvent[];
}
