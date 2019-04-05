import 'reflect-metadata';

const COLUMN_NAME_METADATA_KEY = 'ColumNameMetadata';

export function Tablify(): ClassDecorator {
  return (target: any) => {
    target.prototype.getColumnProperties = function() {
      const metadata = (
        Reflect.getMetadata(COLUMN_NAME_METADATA_KEY, this) || {}
      );

      return metadata;
    };
  };
}

export function ColumnName(name?: string): PropertyDecorator {
  return (target: any, propertyName: string) => {
    const metadata = (
      Reflect.getMetadata(COLUMN_NAME_METADATA_KEY, target) || {}
    );

    const columnName = !!name ? name : propertyName;
    metadata[propertyName] = columnName;

    Reflect.defineMetadata(
      COLUMN_NAME_METADATA_KEY,
      metadata,
      target,
    );
  };
}
