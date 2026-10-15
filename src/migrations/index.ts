import * as migration_20261007_084911_initial from './20261007_084911_initial';
import * as migration_20261013_085556_media_object_key from './20261013_085556_media_object_key';
import * as migration_20261015_174704_enquiries from './20261015_174704_enquiries';

export const migrations = [
  {
    up: migration_20261007_084911_initial.up,
    down: migration_20261007_084911_initial.down,
    name: '20261007_084911_initial',
  },
  {
    up: migration_20261013_085556_media_object_key.up,
    down: migration_20261013_085556_media_object_key.down,
    name: '20261013_085556_media_object_key',
  },
  {
    up: migration_20261015_174704_enquiries.up,
    down: migration_20261015_174704_enquiries.down,
    name: '20261015_174704_enquiries'
  },
];
