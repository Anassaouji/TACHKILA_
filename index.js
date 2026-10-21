

const terrain = document.querySelector("#terrain");

for(let i = 1 ; i <= 93; i++){
        let col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col"+i);
        terrain.appendChild(col);   
}

const joueurDG = document.querySelector(".col16");
const dg=document.createElement("p");
dg.textContent="DG";
joueurDG.append(dg);


const joueurMG = document.querySelector(".col20");
const mg=document.createElement("p");
mg.textContent="MG";
joueurMG.append(mg);


const joueurBU1 = document.querySelector(".col35");
const joueurBU2 = document.querySelector(".col83");
const bu1=document.createElement("p");
const bu2=document.createElement("p");
bu1.textContent="BU";
bu2.textContent="BU";
joueurBU1.append(bu1);
joueurBU2.append(bu2);

const joueurGB = document.querySelector(".col37");
const gb=document.createElement("p");
gb.textContent="GB";
joueurGB.append(gb);

const joueurDC1 = document.querySelector(".col39");
const joueurDC2 = document.querySelector(".col63");
const dc1=document.createElement("p");
const dc2=document.createElement("p");
dc1.textContent="DC";
dc2.textContent="DC";
joueurDC1.append(dc1);
joueurDC2.append(dc2);

const joueurMC1 = document.querySelector(".col43");
const joueurMC2 = document.querySelector(".col67");
const mc1=document.createElement("p");
const mc2=document.createElement("p");
mc1.textContent="MC";
mc2.textContent="MC";
joueurMC1.append(mc1);
joueurMC2.append(mc2);

const joueurDD = document.querySelector(".col88");
const dd=document.createElement("p");
dd.textContent="DD";
joueurDD.append(dd);

const joueurMD = document.querySelector(".col92");
const md=document.createElement("p");
md.textContent="MD";
joueurMD.append(md);



// modal fermeture et ouverture
const form = document.querySelector("#monForm");
form.addEventListener("submit", function(event) {
    event.preventDefault()})

const btnAjout = document.querySelector(".btn-ajout");
const modal = document.querySelector(".modal-ajout");
const btnHidden = document.querySelector(".btn-hidden");
const btnAnulle = document.querySelector(".btn-annule");
btnAjout.addEventListener("click", ()=>{
        modal.classList.remove("hidden");
})

btnHidden.addEventListener("click", ()=>{
        modal.classList.add("hidden");
})
btnAnulle.addEventListener("click", ()=>{
        modal.classList.add("hidden");
})

