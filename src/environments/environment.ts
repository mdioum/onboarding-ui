// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of ell replacements can be found in `angular.json`.
import { SETTINGS } from './settings';

export const environment = {
  production: false,
  apiURL: 'API_BASE_URL',
  appSettings: SETTINGS,
  envs: [{label: 'Développement', value: 'dev'}, {label: 'Intégration', value: 'int'}, {label: 'Sécurité', value: 'sec'}, {label: 'Formation', value: 'form'}, {label: 'Recette', value: 'rec'}, {label: 'Isoproduction', value: 'isoprod'}, {label: 'Production', value: 'prod'}],
  businessunit: [{label: 'DV', value: 'DV'}, {label: 'DDE', value: 'DDE'}, {label: 'DSI', value: 'DSI'}, {label: 'DSC', value: 'DSC'}, {label: 'DSD', value: 'DSD'}, {label: 'DGA', value: 'DGA'}, {label: 'DRPS', value: 'DRPS'}, {label: 'DMGP', value: 'DMGP'}],
  criticity: [{label: 'Majeure', value: 'Majeure'}, {label: 'Normale', value: 'Normale'}],
  backup: [{label: 'Oui', value: 'Oui'}, {label: 'Non', value: 'Non'}],
  owner: [{label: 'DD', value: 'DD'}, {label: 'DSI', value: 'DSI'}, {label: 'DRPS', value: 'DRPS'}],
  application: [{label: 'Java', value: 'Java'}, {label: 'PHP', value: 'PHP'}, {label: 'Angular', value: 'Angular'}]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
