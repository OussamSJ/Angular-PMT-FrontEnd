


export interface LocalPokemon {

  name: string;
  description: string;
  debutDate: Date;
  finDate: Date;
  creationDate: Date;
}

export interface Pokemon extends LocalPokemon {
  id:string;
  idProjet?:number;
}
