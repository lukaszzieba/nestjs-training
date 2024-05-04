import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DbOptions } from './dbOptions';

export const CONNECTION_POOL = 'CONNECTION_POOL';

export const {
  ConfigurableModuleClass: ConfigurableDbModule,
  MODULE_OPTIONS_TOKEN: DB_OPTIONS,
} = new ConfigurableModuleBuilder<DbOptions>()
  .setClassMethodName('forRoot')
  .build();
