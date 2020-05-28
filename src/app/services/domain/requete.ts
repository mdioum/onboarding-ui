export class Demandeur {
    prenom: string;
    nom: string;
    telephone: string;
    entite: string;
    structure: string;
    email: string;
    login: string;
}
export class Projet {
    nom: string;
    emailAdmin: string;
    loginAdmin: string;
    owner: string;
    businessunit: string;
    backup: string;
    application: string;
    criticity: string
}
export class Ressource {
    cpu: string;
    memory: string;
    storage: string;
}
export class Requete {
    demandeur:  Demandeur;
    projet: Projet;
    ressource: Ressource;
    environnements: string[] = [];
    name: string;
}
