import { Client } from "./client";
import { Produit } from "./produit";

export class DetailFacture {
    idDetailFacture: number;
    prixTotal: number;
    montantRemise: number;
    qte: number;
    pourcentageRemise: number;
    produit: Produit;
    facture: Facture;
}

export enum EtatFacture {
    Payee,
    Non_payee,
    Annulee
}

export class Facture {
    idFacture: number;
    montantRemise: number;
    montantFacture: number;
    dateFacture: Date;
    active: boolean;
    etat: EtatFacture;
    factDetails: DetailFacture[];
    client: Client;
}