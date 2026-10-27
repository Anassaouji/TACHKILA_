import { sauvegarderJoueurs } from "./storage.js";

export function afficherJoueurs(joueurs, divAremplace) {

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


export function modifierJoueur(btn,joueurs,modal) {
    const parent = btn.closest(".parent");
    const index = Number(parent.dataset.index);

    const joueur = joueurs[index];

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

    return index;
}

export function deletJoueur(btn, joueurs, divAremplace) {
    const parent = btn.closest(".parent");
    const index = Number(parent.dataset.index);

    joueurs.splice(index, 1);
    // localstorage
    sauvegarderJoueurs(joueurs);

    const nbrJoueur = document.querySelector(".nombreJoueur");
    nbrJoueur.textContent = `${joueurs.length} joueur(s)`;
    afficherJoueurs(joueurs, divAremplace);
}