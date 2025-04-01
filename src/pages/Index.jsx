import { Button } from '@mui/material'
import './../App.css'

const linkedButton = {
    ':hover': { color: 'white', },
    margin: '2%'

}

function Index() {

    return (
        <>
            <h1>React Labs</h1>

            <Button sx={linkedButton} href="/minecraftapi" variant="contained">Minecraft Api</Button>
            <Button sx={linkedButton} href="/redirect" variant="contained">Redirect</Button>
            <Button sx={linkedButton} href="/color" variant="contained">Color</Button>
            <Button sx={linkedButton} href="/cards" variant="contained">Cards</Button>
            <Button sx={linkedButton} href="/poke" variant="contained">poke</Button>

        </>
    )
}

export default Index
