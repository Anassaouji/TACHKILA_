import { afficherJoueurs, deletJoueur, modifierJoueur } from "./joueur.js";
import { sauvegarderJoueurs } from "./storage.js";
import { modifierJoueurSurTerrain, creerDivJoueur, retirerJoueurDuTerrain } from "./terrain.js";

// notification message
const notification = document.createElement("p");

notification.classList.add(
        "z-50",
        "fixed",
        "text-white",
        "text-center",
        "rounded-[10px]",

        "w-[90%]",
        "right-[5%]",
        "top-[90px]",
        "h-[60px]",
        "!pt-[10px]",

        "md:w-[60%]",
        "md:right-[155px]",
        "md:top-[90px]",
        "!pt-[16px]",

        "lg:w-[40%]",
        "lg:right-[40px]",
        "lg:top-[88px]",
        "lg:!pt-[16px]",

        "xl:w-[30%]",
        "xl:right-[43px]"
);

const terrain = document.querySelector("#terrain");

let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
let indexModification = null;

const form = document.querySelector("#monForm");
const divAremplace = document.querySelector(".remplace");

const section = document.querySelector(".section");
let timerNotification;


for (let i = 1; i <= 93; i++) {
        let col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col" + i);
        terrain.appendChild(col);
}




const joueurDG = document.querySelector(".col16");
const dg = document.createElement("p");
dg.textContent = "DG";
joueurDG.append(dg);


const joueurMG = document.querySelector(".col20");
const mg = document.createElement("p");
mg.textContent = "MG";
joueurMG.append(mg);


const joueurBU1 = document.querySelector(".col35");
const joueurBU2 = document.querySelector(".col83");
const bu1 = document.createElement("p");
const bu2 = document.createElement("p");
bu1.textContent = "BU";
bu2.textContent = "BU";
joueurBU1.append(bu1);
joueurBU2.append(bu2);

const joueurGB = document.querySelector(".col37");
const gb = document.createElement("p");
gb.textContent = "GB";
joueurGB.append(gb);

const joueurDC1 = document.querySelector(".col39");
const joueurDC2 = document.querySelector(".col63");
const dc1 = document.createElement("p");
const dc2 = document.createElement("p");
dc1.textContent = "DC";
dc2.textContent = "DC";
joueurDC1.append(dc1);
joueurDC2.append(dc2);

const joueurMC1 = document.querySelector(".col43");
const joueurMC2 = document.querySelector(".col67");
const mc1 = document.createElement("p");
const mc2 = document.createElement("p");
mc1.textContent = "MC";
mc2.textContent = "MC";
joueurMC1.append(mc1);
joueurMC2.append(mc2);

const joueurDD = document.querySelector(".col88");
const dd = document.createElement("p");
dd.textContent = "DD";
joueurDD.append(dd);

const joueurMD = document.querySelector(".col92");
const md = document.createElement("p");
md.textContent = "MD";
joueurMD.append(md);


const btnAjout = document.querySelector(".btn-ajout");
const modal = document.querySelector(".modal-ajout");
const btnHidden = document.querySelector(".btn-hidden");
const btnAnulle = document.querySelector(".btn-annule");

btnAjout.addEventListener("click", () => {
        renitialisationMessageDerror();
        const inputName = document.querySelector("input[type='text']");
        const numberInput = document.querySelector('input[type="number"]');
        inputName.value = "";
        numberInput.value = "";
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
        });

        modal.classList.remove("hidden");
})
btnHidden.addEventListener("click", () => {
        modal.classList.add("hidden");
})
btnAnulle.addEventListener("click", () => {
        modal.classList.add("hidden");
});




afficherJoueurs(joueurs, divAremplace);

document.querySelector(".nombreJoueur").textContent =
        `${joueurs.length} joueur(s)`;


restaurerTerrain();


// Ajouter un joueur
form.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputName = document.querySelector("input[type='text']");
        const postChecked = document.querySelector("input[type='radio']:checked");
        const numberInput = document.querySelector('input[type="number"]');

        const errorName = document.querySelector(".error-name");
        const errorNumber = document.querySelector(".error-number");
        const errorPost = document.querySelector(".error-post");


        let name = "";
        let post = "";
        let number = "";

        let isValid = true;

        if (!postChecked) {
                errorPost.textContent = "doit choisie un post de Joueur !";
                isValid = false;
        }
        else {
                post = postChecked.value;
        }

        const validName = /^[a-zA-Z]{3,8}$/;
        const numbrValid = /^(?:[1-9][0-9]?)$/;

        if (inputName.value.trim() === "") {
                errorName.textContent = "Le champ nom ne peut pas être vide.";
                isValid = false;
        } else if (!validName.test(inputName.value.trim())) {
                errorName.textContent = "Nom invalide (lettres uniquement, pas d'espaces).";
                isValid = false;
        } else {
                name = inputName.value.trim();
        }

        // Validation du Numéro
        if (numberInput.value.trim() === "") {
                errorNumber.textContent = "Le champ numéro ne peut pas être vide.";
                isValid = false;
        } else if (!numbrValid.test(numberInput.value.trim())) {
                errorNumber.textContent = "Le numéro doit être compris entre 1 et 99.";
                isValid = false;
        }
        else {
                number = numberInput.value.trim();
                const numeroExiste = joueurs.some((joueur, index) => {
                        return joueur.nombre == number && index !== indexModification;
                });

                if (numeroExiste) {
                        errorNumber.textContent = "Ce numéro est déjà attribué à un autre joueur.";
                        isValid = false;
                }
        }

        if (!isValid) {
                return;
        }

        const joueur = {
                name: name,
                post: post,
                nombre: number,
                positionTerrain: indexModification !== null
                        ? (joueurs[indexModification].positionTerrain || "sur-bank")
                        : "sur-bank"
        };

        if (indexModification !== null) {
                const index = indexModification;

                joueurs[index] = joueur;

                modifierJoueurSurTerrain(joueurs, index, joueur);
                notificationMsg("Joueur Modifierer avec Succes", "bg-green-600", "bg-red-800");


                indexModification = null;
        } else {
                joueurs.push(joueur);
                notificationMsg("Joueur ajouté avec succès", "bg-green-600", "bg-red-800");
        }
        // localstorage
        sauvegarderJoueurs(joueurs);

        const nbrJoueurs = document.querySelector(".nombreJoueur");
        nbrJoueurs.textContent = `${joueurs.length} joueur(s)`;

        // Réafficher tous les joueurs
        afficherJoueurs(joueurs, divAremplace);

        form.reset();
});




let boutonSuppression = null;

// 1. Ouvrir le modal
document.addEventListener("click", function (event) {
        const button = event.target.closest(".delete");

        if (button) {
                boutonSuppression = button;

                const modal = document.querySelector("#modalDelete");
                modal.classList.remove("hidden");
                modal.classList.add("flex");
        }
});


document.querySelector("#cancelDelete").addEventListener("click", function () {
        const modal = document.querySelector("#modalDelete");

        modal.classList.add("hidden");
        modal.classList.remove("flex");

        boutonSuppression = null;
});


document.querySelector("#confirmDelete").addEventListener("click", function () {
        if (!boutonSuppression) return;

        const parent = boutonSuppression.closest(".parent");
        if (!parent) return;

        const index = Number(parent.dataset.index);
        const joueur = joueurs[index];

        // Retirer le joueur du terrain
        retirerJoueurDuTerrain(joueur);

        // Supprimer le joueur
        deletJoueur(boutonSuppression, joueurs, divAremplace);

        // Afficher la notification
        notificationMsg(
                "Joueur supprimé avec succès",
                "bg-red-800",
                "bg-green-600"
        );

        // Fermer le modal
        const modal = document.querySelector("#modalDelete");
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        boutonSuppression = null;
});





// modification
document.addEventListener("click", function (event) {


        const button = event.target.closest(".edit");

        if (button) {
                indexModification = modifierJoueur(button, joueurs, modal);
        }
        renitialisationMessageDerror();

});



document.addEventListener("change", (event) => {
        // Vérifie si l'élément qui a déclenché le changement possède la classe "select"
        const select = event.target.closest(".select");

        if (select) {
                const option = select.value;
                const optionText = select.options[select.selectedIndex].text;

                const parent = select.closest(".parent");
                if (!parent) return;

                const indice = parent.dataset.index;
                const joueur = joueurs[indice];



                if (option === "gardien") {
                        if (joueur.post.toLowerCase() !== "gardien") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                notificationMsg("Joueur a pas ce post", "bg-red-800", "bg-red-800");
                                return;
                        }

                        if (!verifiPositionTerain(joueurGB, joueur, select)) return;

                        retirerJoueurDuTerrain(joueur);
                        const divselected = creerDivJoueur(joueurs, joueur, "GB");
                        joueurGB.replaceChildren(divselected);
                        joueur.positionTerrain = "gardien";
                        notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                }

                else if (option === "defenseur") {

                        if (joueur.post.toLowerCase() !== "defenseur") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                notificationMsg("Joueur a pas ce post", "bg-red-800", "bg-red-800");
                                return;
                        }

                        if (optionText.includes("DG - Défenseur gauche")) {

                                if (!verifiPositionTerain(joueurDG, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "DG");
                                joueurDG.replaceChildren(divselected);
                                joueur.positionTerrain = "DG - Défenseur gauche";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DD - Défenseur droit")) {

                                if (!verifiPositionTerain(joueurDD, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "DD");
                                joueurDD.replaceChildren(divselected);
                                joueur.positionTerrain = "DD - Défenseur droit";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DC - Défenseur central 1")) {

                                if (!verifiPositionTerain(joueurDC1, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "DC");
                                joueurDC1.replaceChildren(divselected);
                                joueur.positionTerrain = "DC - Défenseur central 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DC - Défenseur central 2")) {
                                if (!verifiPositionTerain(joueurDC2, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "DC");
                                joueurDC2.replaceChildren(divselected);
                                joueur.positionTerrain = "DC - Défenseur central 2";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                }
                else if (option === "milieu") {
                        if (joueur.post.toLowerCase() !== "milieu") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                notificationMsg("Joueur a pas ce post", "bg-red-800", "bg-red-800");
                                return;
                        }
                        if (optionText.includes("MG - Milieu gauche")) {

                                if (!verifiPositionTerain(joueurMG, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "MG");
                                joueurMG.replaceChildren(divselected);
                                joueur.positionTerrain = "MG - Milieu gauche";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MD - Milieu droit")) {

                                if (!verifiPositionTerain(joueurMD, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "MD");
                                joueurMD.replaceChildren(divselected);
                                joueur.positionTerrain = "MD - Milieu droit";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MC - Milieu central 1")) {

                                if (!verifiPositionTerain(joueurMC1, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "MC");
                                joueurMC1.replaceChildren(divselected);
                                joueur.positionTerrain = "MC - Milieu central 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MC - Milieu central 2")) {

                                if (!verifiPositionTerain(joueurMC2, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "MC");
                                joueurMC2.replaceChildren(divselected);
                                joueur.positionTerrain = "MC - Milieu central 2";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }

                }
                else if (option === "buteur") {
                        if (joueur.post.toLowerCase() !== "attaquant") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                notificationMsg("Joueur a pas ce post", "bg-red-800", "bg-red-800");
                                return;
                        }
                        if (optionText.includes("BU - Buteur 1")) {

                                if (!verifiPositionTerain(joueurBU1, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "BU");
                                joueurBU1.replaceChildren(divselected);
                                joueur.positionTerrain = "BU - Buteur 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("BU - Buteur 2")) {

                                if (!verifiPositionTerain(joueurBU2, joueur, select)) return;
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueurs, joueur, "BU");
                                joueurBU2.replaceChildren(divselected);
                                joueur.positionTerrain = "BU - Buteur 2";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                }
                else if (option === "sur-bank") {
                        retirerJoueurDuTerrain(joueur);
                        joueur.positionTerrain = "sur-bank";
                        notificationMsg("Joueur retiré du terrain avec succès", "bg-green-600", "bg-red-800");
                }
                sauvegarderJoueurs(joueurs);
        }
});

function verifiPositionTerain(joueurG, jou, selec) {

        const joueurPresent = joueurG.querySelector("[data-numero]");

        if (joueurPresent && joueurPresent.dataset.numero != jou.nombre) {

                const ancienneOption = [...selec.options].find(
                        opt => opt.text.includes(jou.positionTerrain || "sur-bank")
                );

                if (ancienneOption) {
                        selec.selectedIndex = ancienneOption.index;
                }

                notificationMsg(
                        "Cette position est déjà occupée !",
                        "bg-red-800",
                        "bg-red-800"
                );
                selec.value = "sur-bank";

                return false;
        }
        return true;
}

function notificationMsg(msg, bgColorAdd, bgColorRemove) {

        modifierCounter();

        notification.textContent = msg;
        notification.classList.remove(bgColorRemove);
        notification.classList.add(bgColorAdd);
        section.append(notification);


        clearTimeout(timerNotification);

        timerNotification = setTimeout(() => {
                notification.remove();
        }, 3000);
}


// function creerDivJoueur(joueur, posteCode) {
//         const divselected = document.createElement("div");
//         divselected.classList.add("flex", "items-center", "text-white");
//         divselected.dataset.numero = joueur.nombre;
//         divselected.dataset.indexJoueur = joueurs.indexOf(joueur);

//         const divselectedChild1 = document.createElement("div");
//         divselectedChild1.classList.add("border-2", "rounded-[50%]", "!px-2", "py-4", "!mr-1")
//         divselectedChild1.textContent = joueur.nombre;

//         const divselectedChild2 = document.createElement("div");
//         const para1 = document.createElement("p");
//         para1.textContent = posteCode;
//         const para2 = document.createElement("p");
//         para2.textContent = joueur.name;

//         divselectedChild2.append(para1, para2);
//         divselected.append(divselectedChild1, divselectedChild2);

//         return divselected;
// }

/*
function retirerJoueurDuTerrain(joueur) {
        const joueurSurTerrain = document.querySelector(
                `[data-numero="${joueur.nombre}"]`
        );

        if (joueurSurTerrain) {
                joueurSurTerrain.remove();
        }

}
*/


// function modifierJoueurSurTerrain(index, joueur) {
//         const joueurSurTerrain = document.querySelector(
//                 `[data-index-joueur="${index}"]`
//         );

//         if (!joueurSurTerrain) return;

//         // Vérifier si le nouveau poste correspond à l'ancienne position
//         const posteCode = joueurSurTerrain.querySelector("p").textContent;

//         const postesCompatibles = {
//                 GB: "gardien",
//                 DG: "defenseur",
//                 DC: "defenseur",
//                 DD: "defenseur",
//                 MG: "milieu",
//                 MC: "milieu",
//                 MD: "milieu",
//                 BU: "buteur"
//         };

//         if (postesCompatibles[posteCode] !== joueur.post.toLowerCase()) {
//                 joueurSurTerrain.remove();
//                 return;
//         }

//         joueurSurTerrain.replaceWith(creerDivJoueur(joueur, posteCode));
// }




function modifierCounter() {
        const compteur = document.querySelector(".counter-joueurs");

        const nombreJourSurTirain = terrain.querySelectorAll("[data-numero]").length;

        compteur.textContent = `${nombreJourSurTirain} / 11`;

}


function renitialisationMessageDerror() {
        const errorName = document.querySelector(".error-name");
        const errorNumber = document.querySelector(".error-number");
        const errorPost = document.querySelector(".error-post");

        // Réinitialiser les messages d'erreur au début de la soumission
        errorName.textContent = "";
        errorNumber.textContent = "";
        errorPost.textContent = "";

}



function restaurerTerrain() {
        joueurs.forEach((joueur) => {
                const position = joueur.positionTerrain;

                if (!position || position === "sur-bank") {
                        return;
                }

                if (position === "gardien") {
                        joueurGB.replaceChildren(creerDivJoueur(joueurs, joueur, "GB"));
                }
                else if (position === "DG - Défenseur gauche") {
                        joueurDG.replaceChildren(creerDivJoueur(joueurs, joueur, "DG"));
                }
                else if (position === "DD - Défenseur droit") {
                        joueurDD.replaceChildren(creerDivJoueur(joueurs, joueur, "DD"));
                }
                else if (position === "DC - Défenseur central 1") {
                        joueurDC1.replaceChildren(creerDivJoueur(joueurs, joueur, "DC"));
                }
                else if (position === "DC - Défenseur central 2") {
                        joueurDC2.replaceChildren(creerDivJoueur(joueurs, joueur, "DC"));
                }
                else if (position === "MG - Milieu gauche") {
                        joueurMG.replaceChildren(creerDivJoueur(joueurs, joueur, "MG"));
                }
                else if (position === "MD - Milieu droit") {
                        joueurMD.replaceChildren(creerDivJoueur(joueurs, joueur, "MD"));
                }
                else if (position === "MC - Milieu central 1") {
                        joueurMC1.replaceChildren(creerDivJoueur(joueurs, joueur, "MC"));
                }
                else if (position === "MC - Milieu central 2") {
                        joueurMC2.replaceChildren(creerDivJoueur(joueurs, joueur, "MC"));
                }
                else if (position === "BU - Buteur 1") {
                        joueurBU1.replaceChildren(creerDivJoueur(joueurs, joueur, "BU"));
                }
                else if (position === "BU - Buteur 2") {
                        joueurBU2.replaceChildren(creerDivJoueur(joueurs, joueur, "BU"));
                }

        });

        modifierCounter();
}