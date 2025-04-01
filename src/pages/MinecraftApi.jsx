import { useState } from 'react'
import './../App.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from '@mui/material';

const backIcon = {
    color: '#fff',
    ':hover': { color: 'white', },
    fontSize: 60,
}

function MinecraftApi() {
    const handleChange = (e) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [formValues, setFormValues] = useState({
        server_ip: '', server_port: '', server_type: ''
    })

    const [minecraftData, setMinecraftData] = useState(null)
    const [loading, setLoading] = useState(false)  // Ajouter l'état de chargement

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)  // Activer l'état de chargement
        const server_port = formValues.server_port ? `:${formValues.server_port}` : ""
        const adress = formValues.server_ip + server_port
        fetch(`https://api.mcstatus.io/v2/status/${formValues.server_type}/${adress}`)
            .then(response => response.json())
            .then(data => {
                setMinecraftData(data);
                setLoading(false)  // Désactiver l'état de chargement
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)  // Désactiver l'état de chargement en cas d'erreur
            });
    };

    return (
        <>
            <div className='minecraftApiPage'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'

                }}>

                    <Link href='/'><KeyboardArrowLeftIcon sx={backIcon} /></Link>
                    <h1>Minecraft API</h1></div>

                <form>
                    <div className='formContent'>
                        <div className='formElement'>
                            <label htmlFor='server_ip'>Adresse :</label>
                            <input id='server_ip' name='server_ip' type="text" value={formValues.server_ip} onChange={handleChange} />
                        </div>
                        <div className='formElement'>
                            <label htmlFor='server_port'>Port :</label>
                            <input id='server_port' name='server_port' type="number" value={formValues.server_port} onChange={handleChange} />
                        </div>
                        <div className='formElement'>
                            <label htmlFor='server_type'>Type :</label>
                            <select id='server_type' name='server_type' value={formValues.server_type} onChange={handleChange} >
                                <option value=""></option>
                                <option value="java">Java</option>
                                <option value="bedrock">Bedrock</option>
                            </select>
                        </div>
                    </div>
                    <input type="button" value="Envoyer" onClick={handleFormSubmit} />
                </form>

                {loading ? (
                    <>
                        <p>Chargement...</p>
                        <CircularProgress color="inherit" />
                    </>
                ) : (
                    minecraftData ? (
                        minecraftData.online ? (
                            minecraftData.players ? (
                                <>
                                    <h2>🟢{minecraftData.host}</h2>
                                    <p>Il y a <span className='nbrPlayer'>{minecraftData.players.online}</span> joueurs en ligne</p>
                                    {minecraftData.players.list && minecraftData.players.list.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Avatar</th>
                                                    <th>Nom du joueur</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {minecraftData.players.list.map((player, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <img
                                                                src={`https://minotar.net/avatar/${player.name_clean}/36`}
                                                                alt={`${player.name_clean}'s avatar`}
                                                            />
                                                        </td>
                                                        <td>{player.name_clean}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        minecraftData.players.online > 0 ? (
                                            <p>Aucune donnée sur les joueurs connectés disponible</p>
                                        ) : (
                                            <p></p>
                                        )
                                    )}
                                    <h3>Les mods</h3>
                                    {minecraftData.mods && minecraftData.mods.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nom du mod</th>
                                                    <th>Version</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {minecraftData.mods.map((mod, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {mod.name}
                                                        </td>
                                                        <td>{mod.version}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucun mod disponible</p>
                                    )}
                                    <h3>Les plugins</h3>
                                    {minecraftData.plugins && minecraftData.plugins.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nom du plugin</th>
                                                    <th>Version</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {minecraftData.plugins.map((plugin, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {plugin.name}
                                                        </td>
                                                        <td>{plugin.version}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucun plugin disponible</p>
                                    )}
                                </>
                            ) : (
                                <p>Aucune donnée disponible pour ce serveur.</p>
                            )
                        ) : (
                            <>
                                <h2>🔴{minecraftData.host}</h2>
                                <p>Le serveur est hors ligne ou aucune donnée n'est disponible.</p>
                            </>
                        )
                    ) : (
                        <p>Veuillez soumettre les informations du serveur pour voir les données.</p>
                    )
                )}
            </div>
        </>
    )
}

export default MinecraftApi
