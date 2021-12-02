export class Livraison{
    id: number;
    type: string;
}


export class Livreur {
  idLivreur: number;
  code: string;
  nom: string;
  email: string;
  telephone: number;
  addresse: string;
  etat: string;
  dateAdhesion: string;
  livraisonList: Livraison[];
	isSelected: boolean;
}