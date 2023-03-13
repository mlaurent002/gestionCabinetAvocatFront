import { Role } from "./role";
import { Tache } from "./tache";

export class Utilisateur {
    idUtilisateur!: number;
    nomUtilisateur!: string;
    prenomUtilisateur!: string;
    emailUtilisateur!: string;
    roles!: Role[];
    taches!: Tache[];
    username!: string;
    password!: string;
}