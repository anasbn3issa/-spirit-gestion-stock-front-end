export class Livraison{
    id: number;
    type: string;
}

export class Livreur {
  id: number;
  code: string;
  nom: string;
  email: string;
  telephone: number;
  addresse: string;
  livraisonList: Livraison[];
}