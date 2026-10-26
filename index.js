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
const aside = document.querySelector("aside");
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




// const fotballer = localStorage.getItem("joueurs");
// joueurs = fotballer ? JSON.parse(localStorage.getItem("joueurs")) : [];


let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
let indexModification = null;

const form = document.querySelector("#monForm");
const divAremplace = document.querySelector(".remplace");



// Function pour afficher les joueurs
function afficherJoueurs() {

        if (joueurs.length === 0) {
                divAremplace.className =
                        "remplace w-full rounded-[10px] border-2 border-dashed !mt-4 !p-5 text-center";

                const message = document.createElement("p");
                message.textContent = "Aucun joueur pour le moment.";

                divAremplace.replaceChildren(message);
                return;
        }

        divAremplace.className = "remplace vide";

        const divContainer = document.createElement("div");
        divContainer.classList.add("container-divs");



        joueurs.forEach((ele, index) => {
                const divParent = document.createElement("div");
                divParent.classList.add("border-1", "border-neutral-300", "!mt-[20px]", "rounded-[10px]", "!p-[15px]")
                const divpere = document.createElement("div");
                divpere.classList.add("flex", "justify-between")
                divParent.classList.add("parent");
                divParent.dataset.index = index;
                const divChild1 = document.createElement("div");
                divChild1.classList.add("child");

                const child1 = document.createElement("div");
                child1.classList.add("child1");
                child1.textContent = ele.nombre;

                const child2 = document.createElement("div");
                child2.classList.add("child2");

                const souChild1 = document.createElement("div");
                souChild1.textContent = ele.name;

                const souChild2 = document.createElement("div");
                souChild2.textContent = ele.post;

                child2.append(souChild1, souChild2);
                divChild1.append(child1, child2);

                const divChild2 = document.createElement("div");
                divChild2.classList.add("child");

                const child3 = document.createElement("div");
                const btn1 = document.createElement("button");
                btn1.classList.add("edit");
                const imgUpdate = document.createElement("img");
                imgUpdate.setAttribute("src", "./images/edit-2.svg");
                imgUpdate.classList.add("inline");
                btn1.append(imgUpdate);
                child3.append(btn1);

                const child4 = document.createElement("div");
                const btn2 = document.createElement("button");
                btn2.classList.add("delete");
                const imgDelete = document.createElement("img");
                imgDelete.setAttribute("src", "./images/trash-2.svg");
                imgDelete.classList.add("inline");
                btn2.append(imgDelete);
                child4.append(btn2);

                divChild2.append(child3, child4);

                // select
                const select = document.createElement("select");
                select.classList.add("select", "w-full", "!mt-2", "bg-slate-800", "border", "rounded-[6px]", "!p-2");
                select.name = "post-name";
                // options
                const option1 = document.createElement("option");
                createOption(option1, "Sur le banc", "sur-bank");
                
                const option2 = document.createElement("option");
                createOption(option2, "GB - Gardien", "gardien");
                
                const option3 = document.createElement("option");
                createOption(option3, "DG - Défenseur gauche", "defenseur");
                
                const option4 = document.createElement("option");
                createOption(option4, "DC - Défenseur central 1", "defenseur");
                
                const option5 = document.createElement("option");
                createOption(option5, "DC - Défenseur central 2", "defenseur");
                
                const option6 = document.createElement("option");
                createOption(option6, "DD - Défenseur droit", "defenseur");
                
                const option7 = document.createElement("option");
                createOption(option7, "MG - Milieu gauche", "milieu");
                
                const option8 = document.createElement("option");
                createOption(option8, "MC - Milieu central 1", "milieu");
                
                const option9 = document.createElement("option");
                createOption(option9, "MC - Milieu central 2", "milieu");
                
                const option10 = document.createElement("option");
                createOption(option10, "MD - Milieu droit", "milieu");
                
                const option11 = document.createElement("option");
                createOption(option11, "BU - Buteur 1", "buteur");
                
                const option12 = document.createElement("option");
                createOption(option12, "BU - Buteur 2", "buteur");
                

                select.append(option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12);
                select.value = ele.positionTerrain || "sur-bank";

                divpere.append(divChild1, divChild2)
                divParent.append(divpere, select);
                divContainer.append(divParent);
        });

        // Afficher la liste complète
        divAremplace.replaceChildren(divContainer);
}

function createOption(option, valuetextContent, value) {
        option.textContent = valuetextContent;
        option.classList.add("option");
        option.value = value;
}

afficherJoueurs();

document.querySelector(".nombreJoueur").textContent =
        `${joueurs.length} joueur(s)`;


const section = document.querySelector(".section");
let timerNotification;
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

                modifierJoueurSurTerrain(index, joueur);
                notificationMsg("Joueur Modifierer avec Succes", "bg-green-600", "bg-red-800");


                indexModification = null;
        } else {
                joueurs.push(joueur);
                notificationMsg("Joueur ajouté avec succès", "bg-green-600", "bg-red-800");
        }
        // localstorage
        sauvegarderJoueurs();

        const nbrJoueurs = document.querySelector(".nombreJoueur");
        nbrJoueurs.textContent = `${joueurs.length} joueur(s)`;

        // Réafficher tous les joueurs
        afficherJoueurs();

        form.reset();
});

// localstorage
function sauvegarderJoueurs() {
        localStorage.setItem("joueurs", JSON.stringify(joueurs));
}

// supprimer un joueur
document.addEventListener("click", function (event) {
        const button = event.target.closest(".delete");

        if (button) {

                const parent = button.closest(".parent");
                if (!parent) return;

                const index = Number(parent.dataset.index);
                const joueur = joueurs[index];

                // Retirer le joueur du terrain avant de le supprimer du tableau
                retirerJoueurDuTerrain(joueur);

                deletJoueur(button);

                notificationMsg("Joueur Supreme avec Succes", "bg-red-800", "bg-green-600");
        }
});

function deletJoueur(btn) {
        const parent = btn.closest(".parent");
        const index = Number(parent.dataset.index);

        joueurs.splice(index, 1);
        // localstorage
        sauvegarderJoueurs();

        const nbrJoueur = document.querySelector(".nombreJoueur");
        nbrJoueur.textContent = `${joueurs.length} joueur(s)`;
        afficherJoueurs();
}

// modification
document.addEventListener("click", function (event) {


        const button = event.target.closest(".edit");

        if (button) {
                modifierJoueur(button);
        }
        renitialisationMessageDerror();

});

function modifierJoueur(btn) {
        const parent = btn.closest(".parent");
        const index = Number(parent.dataset.index);

        const joueur = joueurs[index];

        indexModification = index;

        const inputName = document.querySelector("input[type='text']");
        const numberInput = document.querySelector('input[type="number"]');
        const radios = document.querySelectorAll('input[type="radio"]');

        inputName.value = joueur.name;
        numberInput.value = joueur.nombre;

        radios.forEach(radio => {
                if (radio.value === joueur.post)
                        radio.checked = true;
        });

        modal.classList.remove("hidden");
}

// selection d'un post pour mettre dans un zone de terain

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
                                return;
                        }

                        retirerJoueurDuTerrain(joueur);
                        const divselected = creerDivJoueur(joueur, "GB");
                        joueurGB.replaceChildren(divselected);
                        joueur.positionTerrain = "gardien";
                        notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                }

                else if (option === "defenseur") {

                        if (joueur.post.toLowerCase() !== "defenseur") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                return;
                        }

                        if (optionText.includes("DG - Défenseur gauche")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "DG");
                                joueurDG.replaceChildren(divselected);
                                joueur.positionTerrain = "DG - Défenseur gauche";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DD - Défenseur droit")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "DD");
                                joueurDD.replaceChildren(divselected);
                                joueur.positionTerrain = "DD - Défenseur droit";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DC - Défenseur central 1")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "DC");
                                joueurDC1.replaceChildren(divselected);
                                joueur.positionTerrain = "DC - Défenseur central 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("DC - Défenseur central 2")) {
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "DC");
                                joueurDC2.replaceChildren(divselected);
                                joueur.positionTerrain = "DC - Défenseur central 2";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                }
                else if (option === "milieu") {
                        if (joueur.post.toLowerCase() !== "milieu") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                return;
                        }
                        if (optionText.includes("MG - Milieu gauche")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "MG");
                                joueurMG.replaceChildren(divselected);
                                joueur.positionTerrain = "MG - Milieu gauche";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MD - Milieu droit")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "MD");
                                joueurMD.replaceChildren(divselected);
                                joueur.positionTerrain = "MD - Milieu droit";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MC - Milieu central 1")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "MC");
                                joueurMC1.replaceChildren(divselected);
                                joueur.positionTerrain = "MC - Milieu central 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("MC - Milieu central 2")) {
                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "MC");
                                joueurMC2.replaceChildren(divselected);
                                joueur.positionTerrain = "MC - Milieu central 2";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }

                }
                else if (option === "buteur") {
                        if (joueur.post.toLowerCase() !== "attaquant") {
                                select.value = joueur.positionTerrain || "sur-bank";
                                return;
                        }
                        if (optionText.includes("BU - Buteur 1")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "BU");
                                joueurBU1.replaceChildren(divselected);
                                joueur.positionTerrain = "BU - Buteur 1";
                                notificationMsg("Joueur placé sur le terrain avec succès", "bg-green-600", "bg-red-800");
                        }
                        else if (optionText.includes("BU - Buteur 2")) {

                                retirerJoueurDuTerrain(joueur);
                                const divselected = creerDivJoueur(joueur, "BU");
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
        }
        sauvegarderJoueurs();
});


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


function creerDivJoueur(joueur, posteCode) {
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

function retirerJoueurDuTerrain(joueur) {
        const joueurSurTerrain = document.querySelector(
                `[data-numero="${joueur.nombre}"]`
        );

        if (joueurSurTerrain) {
                joueurSurTerrain.remove();
        }
}

function modifierJoueurSurTerrain(index, joueur) {
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

        joueurSurTerrain.replaceWith(creerDivJoueur(joueur, posteCode));
}


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