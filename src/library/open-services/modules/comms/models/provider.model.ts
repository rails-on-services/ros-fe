import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsEvent } from './event.model';

@Tablify()
@JsonApiModelConfig({
  type: 'providers'
})
export class CommsProvider extends JsonApiModel {
  @Column({ name: 'Name', sortable: true })
  @Attribute()
  name: string;

  @Column({ name: 'Encrypted Secret' })
  @Attribute({ serializedName: 'encrypted_secret' })
  encryptedSecret: string;

  @Column({ name: 'Encrypted Secret IV' })
  @Attribute({ serializedName: 'encrypted_secret_iv' })
  encryptedSecretIv: string;

  @Column({ name: 'Key' })
  @Attribute()
  key: string;

  @Column({ name: 'Created At' })
  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @HasMany()
  events: CommsEvent[];
}
