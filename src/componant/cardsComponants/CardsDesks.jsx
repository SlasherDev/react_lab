import { useState } from "react";

function CardsDesks(props) {
    const cardList = props.data;

    // Fonction pour mélanger les cartes
    function shuffleCards(cards) {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const [formValues, setFormValues] = useState({
        nbrPlayer: '', nbrCards: ''
    });
    const [error, setError] = useState("");
    const [dealedCard, setDealedCard] = useState(null);

    // Fonction pour distribuer les cartes
    function distribuerCartes() {
        // Mélanger les cartes à chaque distribution
        const shuffledCards = shuffleCards(cardList);

        // Assurez-vous qu'il y a assez de cartes
        if (shuffledCards.length < formValues.nbrPlayer * formValues.nbrCards) {
            setError("Pas assez de cartes dans le jeu pour distribuer.");
            return;
        } else {
            setError("");

            // Initialiser les mains des joueurs
            const joueurs = {};
            for (let i = 1; i <= formValues.nbrPlayer; i++) {
                joueurs[`Joueur ${i}`] = [];
            }

            // Distribuer les cartes
            for (let j = 0; j < formValues.nbrCards; j++) {
                for (let i = 1; i <= formValues.nbrPlayer; i++) {
                    joueurs[`Joueur ${i}`].push(shuffledCards.pop());
                }
            }

            // Récupérer les cartes restantes pour la pioche
            const pioche = shuffledCards;

            // Retourner les cartes distribuées et la pioche
            setDealedCard({
                joueurs: joueurs,
                pioche: pioche
            });
        }
    }

    const handleChange = (e) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        distribuerCartes();
    };

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const renderTableRows = () => {
        if (!dealedCard) return null;

        const rows = chunkArray(Object.keys(dealedCard.joueurs), 5);
        return rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map(player => (
                    <td key={player}>
                        <div><strong>{player}</strong></div>
                        <ul>
                            {dealedCard.joueurs[player].map((card, idx) => (
                                <li key={idx}>{card}</li>
                            ))}
                        </ul>
                    </td>
                ))}
            </tr>
        ));
    };

    const renderPioche = () => {
        if (!dealedCard || !dealedCard.pioche) return null;

        // Diviser les cartes en lignes de 10 cartes
        const piocheChunks = chunkArray(dealedCard.pioche, 10);

        return (
            <>
                <p>Nombre de cartes dans la pioche : <span className="toBold">{dealedCard.pioche.length}</span></p>
                <table>
                    <tbody>
                        {piocheChunks.map((chunk, idx) => (
                            <tr key={idx}>
                                {chunk.map((card, cardIdx) => (
                                    <td key={cardIdx}>{card}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <>
            <div className="cardsDesksPage">
                <form>
                    <div className='formContent'>
                        <div className='formElement'>
                            <label htmlFor='nbrPlayer'>Nombre de Joueurs :</label>
                            <input id='nbrPlayer' name='nbrPlayer' type="number" value={formValues.nbrPlayer} onChange={handleChange} />
                        </div>
                        <div className='formElement'>
                            <label htmlFor='nbrCards'>Nombre de cartes pour 1 joueur : </label>
                            <input id='nbrCards' name='nbrCards' type="number" max={52} value={formValues.nbrCards} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="error">{error}</div>
                    <input type="button" value="Envoyer" onClick={handleFormSubmit} />
                </form>

                <table>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
                {renderPioche()}
            </div>
        </>
    );
}

export default CardsDesks;
