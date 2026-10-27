

export function sauvegarderJoueurs(joueurs) {
        localStorage.setItem("joueurs", JSON.stringify(joueurs));
}