import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { fourOMini } from './4o-mini/resource'

defineBackend({
  auth,
  data,
  fourOMini,
});
