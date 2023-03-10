import { Affaire } from "./affaire";
import { Utilisateur } from "./utilisateur";

export class Tache {
    idTache: number;
    dateCreation: Date;
    titreTache: string;
    descriptionTache: String;
    statutAudience: boolean;
    utilisateurFK: Utilisateur;
    affaireFK2: Affaire;
    //tribunalFK: Tribunal;
    //phases: Phase[];

}
