import Realm from 'realm';

import {Contact} from './contact';
import {Provider} from './provider';
import {StakingMetadata} from './staking-metadata';
import {Transaction} from './transaction';
import {UserSchema} from './user';
import {WalletRealm} from './wallet';

import {AppTheme, WalletType} from '../types';
import {CARD_DEFAULT_STYLE, TEST_NETWORK} from '../variables';

export const realm = new Realm({
  schema: [
    WalletRealm,
    UserSchema,
    Transaction,
    Contact,
    Provider,
    StakingMetadata,
  ],
  schemaVersion: 32,
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 9) {
      const oldObjects = oldRealm.objects('Wallet');
      const newObjects = newRealm.objects<{
        isHidden: boolean;
        cardStyle: string;
      }>('Wallet');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.isHidden = false;
        newObject.cardStyle = 'defaultGreen';
      }
    }

    if (oldRealm.schemaVersion < 10) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects<{language: string}>('User');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.language = 'en';
      }
    }

    if (oldRealm.schemaVersion < 15) {
      const oldObjects = oldRealm.objects('Wallet');
      const newObjects = newRealm.objects<{pattern: string}>('Wallet');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.pattern = CARD_DEFAULT_STYLE;
      }
    }

    if (oldRealm.schemaVersion < 17) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects<{snoozeBackup: null}>('User');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.snoozeBackup = null;
      }
    }

    if (oldRealm.schemaVersion < 20) {
      const oldObjects = oldRealm.objects('Wallet');
      const newObjects = newRealm.objects<{type: string}>('Wallet');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.type = WalletType.hot;
      }
    }

    if (oldRealm.schemaVersion < 22) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects<{providerId: string}>('User');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.providerId = TEST_NETWORK;
      }
    }

    if (oldRealm.schemaVersion < 23) {
      const oldObjects = oldRealm.objects('Transaction');
      const newObjects = newRealm.objects<{providerId: string}>('Transaction');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.providerId = TEST_NETWORK;
      }
    }

    if (oldRealm.schemaVersion < 24) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects<{onboarded: boolean}>('User');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.onboarded = true;
      }
    }

    if (oldRealm.schemaVersion < 25) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects<{theme: string}>('User');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.theme = AppTheme.light;
      }
    }

    if (oldRealm.schemaVersion < 26) {
      const oldObjects = oldRealm.objects('Wallet');
      const newObjects = newRealm.objects<{isMain: boolean}>('Wallet');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.isMain = false;
      }
    }

    if (oldRealm.schemaVersion < 27) {
      const providersList = require('../../assets/migrations/providers.json');

      const oldObjects = oldRealm.objects<{id: string}>('Provider');
      const newObjects = newRealm.objects<{
        ethChainId: string;
        ethRpcEndpoint: string;
        cosmosChainId: string;
        cosmosRestEndpoint: string;
        tmRpcEndpoint: string;
      }>('Provider');

      for (const objectIndex in oldObjects) {
        const provider = providersList.find(
          (p: {id: string}) => p.id === oldObjects[objectIndex].id,
        );

        if (provider) {
          const newObject = newObjects[objectIndex];
          newObject.ethChainId = provider.ethChainId;
          newObject.ethRpcEndpoint = provider.ethRpcEndpoint;
          newObject.cosmosChainId = provider.cosmosChainId;
          newObject.cosmosRestEndpoint = provider.cosmosRestEndpoint;
          newObject.tmRpcEndpoint = provider.tmRpcEndpoint;
        }
      }
    }

    if (oldRealm.schemaVersion < 30) {
      const oldObjects = oldRealm.objects<{id: string}>('Provider');
      const newObjects = newRealm.objects<{
        isEditable: boolean;
      }>('Provider');

      for (const objectIndex in oldObjects) {
        const newObject = newObjects[objectIndex];
        newObject.isEditable = false;
      }
    }
  },
});
