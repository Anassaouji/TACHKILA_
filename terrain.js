

export function creerDivJoueur(joueurs, joueur, posteCode) {
    const divselected = document.createElement("div");
    divselected.classList.add("flex", "items-center", "text-white");
    divselected.dataset.numero = joueur.nombre;
    divselected.dataset.indexJoueur = joueurs.indexOf(joueur);

    const divselectedChild1 = document.createElement("div");
    divselectedChild1.classList.add("border-2", "rounded-[50%]", "!px-2", "py-4", "!mr-1")
    divselectedChild1.textContent = joueur.nombre;

    const divselectedChild2 = document.createElement("div");
    const para1 = document.createElement("p");
    para1.textContent = posteCode;
    const para2 = document.createElement("p");
    para2.textContent = joueur.name;

    divselectedChild2.append(para1, para2);
    divselected.append(divselectedChild1, divselectedChild2);

    return divselected;
}


export function modifierJoueurSurTerrain(joueurs,index, joueur) {
    const joueurSurTerrain = document.querySelector(
        `[data-index-joueur="${index}"]`
    );

    if (!joueurSurTerrain) return;

    // Vérifier si le nouveau poste correspond à l'ancienne position
    const posteCode = joueurSurTerrain.querySelector("p").textContent;

    const postesCompatibles = {
        GB: "gardien",
        DG: "defenseur",
        DC: "defenseur",
        DD: "defenseur",
        MG: "milieu",
        MC: "milieu",
        MD: "milieu",
        BU: "buteur"
    };

    if (postesCompatibles[posteCode] !== joueur.post.toLowerCase()) {
        joueurSurTerrain.remove();
        return;
    }

    joueurSurTerrain.replaceWith(creerDivJoueur(joueurs, joueur, posteCode));
}

export function retirerJoueurDuTerrain(joueur) {
        const joueurSurTerrain = document.querySelector(
                `[data-numero="${joueur.nombre}"]`
        );

        if (joueurSurTerrain) {
                joueurSurTerrain.remove();
        }

}