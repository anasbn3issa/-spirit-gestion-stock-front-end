import { Facture } from "./facture";
import { Livreur } from "./livreur";

export enum EtatLivraison {
    Nouveau,
    EnTransition,
    Livre
}

export class Livraison {
    idLivraison: number;
    code: string;
    dateLivraison: Date;
    dateLivraisonPrevue: Date;
    etat: EtatLivraison;
    livreur: Livreur;
    facture: Facture;
}