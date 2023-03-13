import { Tache } from "./tache";

export class Phase {
    idPhase!: number;
    nom!: string;
    dateDebut!: Date;
    dateFin!: Date;
    tache_fk!: Tache;

}
