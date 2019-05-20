import 'reflect-metadata';

const COLUMN_METADATA_KEY = 'ColumMetadata';

export function Tablify(): ClassDecorator {
  return (target: any) => {
    target.prototype.getColumnProperties = function() {
      const metadata = (
        Reflect.getMetadata(COLUMN_METADATA_KEY, this) || {}
      );

      return metadata;
    };
  };
}

export function Column(properties: { name?: string; sortable?: boolean; } = {}): PropertyDecorator {
  return (target: any, propertyName: string) => {
    const metadata = (
      Reflect.getMetadata(COLUMN_METADATA_KEY, target) || {}
    );

    const name = !!properties.name ? properties.name : propertyName;
    const columnProperties = {
      name,
      sortable: !!properties.sortable
    };

    metadata[propertyName] = columnProperties;

    Reflect.defineMetadata(
      COLUMN_METADATA_KEY,
      metadata,
      target,
    );
  };
}
