import { PieChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";

function CardsStats(props) {
    const cardList = props.data;

    function shuffleCards(cards) {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const shuffledCards = useMemo(() => shuffleCards(cardList), [cardList]);

    const [formValues, setFormValues] = useState({
        nbrPlayer: '', nbrCards: ''
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        const intValue = parseInt(value);

        if (name === "nbrCards" && intValue > 52) {
            setError("Vous ne pouvez pas mettre plus de 52 cartes par joueur");
            setFormValues(prev => ({ ...prev, [name]: 52 }));
        } else {
            setError("");
            setFormValues(prev => ({ ...prev, [name]: intValue }));
        }
    };

    function createDeck() {
        const availableCards = [...shuffledCards];
        const deckCards = [];
        for (let i = 0; i < formValues.nbrCards; i++) {
            const index = Math.floor(Math.random() * availableCards.length);
            const selectedCard = availableCards.splice(index, 1)[0];
            deckCards.push(selectedCard);
        }
        return deckCards;
    }

    function getAllDescks() {
        const allDecks = [];
        for (let i = 0; i < formValues.nbrPlayer; i++) {
            const deck = createDeck();
            allDecks.push(deck);
        }
        return allDecks;
    }

    function getcardsStats(allDecks) {
        const cardFrequency = {};
        allDecks.forEach(deck => {
            deck.forEach(card => {
                if (cardFrequency[card]) {
                    cardFrequency[card]++;
                } else {
                    cardFrequency[card] = 1;
                }
            });
        });

        const totalCards = allDecks.length * formValues.nbrCards;
        const cardStatistics = {};
        for (let card in cardFrequency) {
            const count = cardFrequency[card];
            const percentage = (count / totalCards) * 100;
            cardStatistics[card] = {
                count: count,
                percentage: parseFloat(percentage.toFixed(2))
            };
        }

        const sortedCardStatistics = Object.entries(cardStatistics).sort((a, b) => b[1].count - a[1].count);
        return sortedCardStatistics;
    }
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        if (formValues.nbrPlayer && formValues.nbrCards) {
            const allDecks = getAllDescks();
            const cardsStats = getcardsStats(allDecks);

            const data = cardsStats.map((card, index) => ({
                id: index,
                value: card[1].percentage,
                label: card[0],
            }));

            setChartData(data);

        }
    }, [formValues]);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const renderTableRows = () => {
        const rows = chunkArray(chartData, 10); // Divise les données en sous-tableaux de 10 éléments chacun
        return rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((card) => (
                    <td key={card.id}>
                        <div>{card.label}</div>
                        <div><span className="toBold">{card.value.toFixed(2)}%</span></div>
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <>
            <div className="cardsStatsPage">
                <form>
                    <div className='formContent'>
                        <div className='formElement'>
                            <label htmlFor='nbrPlayer'>Nombre de Joueurs :</label>
                            <input id='nbrPlayer' name='nbrPlayer' type="number" value={formValues.nbrPlayer} onChange={handleChange} />
                        </div>
                        <div className='formElement'>
                            <label htmlFor='nbrCards'>Nombre de cartes pour un joueur :</label>
                            <input id='nbrCards' name='nbrCards' type="number" value={formValues.nbrCards} onChange={handleChange} />
                            <div className="error">{error}</div>
                        </div>
                    </div>
                </form>
                <div className="pie">
                    <PieChart
                        series={[
                            {
                                data: chartData,
                            },
                        ]}
                        width={800}
                        height={1000}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'top', horizontal: 'middle' },

                            },
                        }}
                    />
                    <table>

                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CardsStats;
