import { SETTINGS } from './settings';

export const environment = {
  production: true,
  apiURL: 'http://onboarding-api-onboarding.k8s-test.orange-sonatel.com',
  appSettings: SETTINGS,
  envs: [{label: 'Développement', value: 'dev'}, {label: 'Intégration', value: 'int'}, {label: 'Sécurité', value: 'sec'}, {label: 'Formation', value: 'form'}],
  businessunit: [{label: 'DV', value: 'DV'}, {label: 'DDE', value: 'DDE'}, {label: 'DSI', value: 'DSI'}, {label: 'DSC', value: 'DSC'}, {label: 'DSD', value: 'DSD'}, {label: 'DGA', value: 'DGA'}, {label: 'DRPS', value: 'DRPS'}, {label: 'DMGP', value: 'DMGP'}],
  criticity: [{label: 'Majeure', value: 'Majeure'}, {label: 'Normale', value: 'Normale'}],
  backup: [{label: 'Oui', value: 'Oui'}, {label: 'Non', value: 'Non'}],
  owner: [{label: 'DD', value: 'DD'}, {label: 'DSI', value: 'DSI'}, {label: 'DRPS', value: 'DRPS'}],
  application: [{label: 'Java', value: 'Java'}, {label: 'PHP', value: 'PHP'}, {label: 'Angular', value: 'Angular'}]
};
