import * as migration_20260523_021226_init_postgres from './20260523_021226_init_postgres';

export const migrations = [
  {
    up: migration_20260523_021226_init_postgres.up,
    down: migration_20260523_021226_init_postgres.down,
    name: '20260523_021226_init_postgres'
  },
];
