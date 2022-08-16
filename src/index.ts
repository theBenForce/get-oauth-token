import { program } from 'commander';

import './commands';

program.parseAsync()
  .then(() => console.info('\n'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });