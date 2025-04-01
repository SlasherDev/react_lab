import { useEffect } from 'react';

const Redirect = () => {
    useEffect(() => {
        // Redirige vers Twitter après le chargement de la page
        window.location.href = 'https://as1.ftcdn.net/v2/jpg/02/97/43/18/1000_F_297431854_2iQ2BktKUKX63nS4XmlulbagArEowXXp.jpg';
    }, []);

    //return <div>Redirection en cours...</div>;
};

export default Redirect;