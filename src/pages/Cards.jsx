import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link, Tab, Box } from "@mui/material"

import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CardsStats from '../componant/cardsComponants/CardsStats';
import CardsDesks from '../componant/cardsComponants/CardsDesks';

const backIcon = {
    color: '#fff',
    ':hover': { color: 'white', },
    fontSize: 60,
}

const TabColor ={backgroundColor:'#fff', color:'#000'}
function Cards() {
    const [value, setValue] = useState('1');
    const handleChange = (e, newValue) => {
        setValue(newValue);
      };

      function createCardsNbr() {
        let tab = [];
        tab.push('A');
        for (let i = 1; i < 10; i++) {
            tab.push(i + 1);
        }
        tab.push('J', 'Q', 'K');
        return tab
    }
    
    const cardsNbr = createCardsNbr();
    
    const cardsColor = ['❤️', '♣', '♦️', '♠️']
    
    function createCardList() {
        const cards = [];
        for (let i = 0; i < cardsColor.length; i++) {
            for (let j = 0; j < cardsNbr.length; j++) {
                cards.push(cardsNbr[j] + cardsColor[i]);
            }
        }
        return cards;
    }
    const cardList = createCardList();

    return (
        <>
        <div className='cardsPage'>
         <div style={{
                display: 'flex',
                alignItems: 'center'

            }}>
        <Link href='/'><KeyboardArrowLeftIcon sx={backIcon} /></Link>
            <h1>Cards</h1>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext  value={value}>
        <Box  sx={{ backgroundColor:'#fff', borderBottom: 1, borderColor: 'divider' }}  color='primary'> 
          <TabList textColor="secondary"
  indicatorColor="secondary" variant="fullWidth" onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="CardsStats" value="1" />
            <Tab label="CardsDesks" value="2" />
          </TabList>
        </Box>
        <TabPanel  sx={TabColor} value="1"><CardsStats data={cardList}/></TabPanel>
        <TabPanel  sx={TabColor}  value="2"><CardsDesks data={cardList}/></TabPanel>
      </TabContext>
    </Box>
    </div>
        </>
    )
}

export default Cards