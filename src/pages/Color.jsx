import { Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";

const backIcon = {
    color: "#fff",
    ":hover": { color: "white" },
    fontSize: 60,
};

function Color() {
    const [color, setColor] = useState({ color: "", transparency: "6" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setColor((prev) => ({
            ...prev,
            [name]: name === "transparency" ? parseInt(value, 10) : value, // Convertir transparency en entier
        }));
    };
    console.log(color);
    

    const getColorHexa = () => {
        const letter = "0123456789ABCDEF";
        let colorHexa = "#";
        for (let i = 0; i < color.transparency; i++) {
            colorHexa += letter[Math.floor(Math.random() * letter.length)];
        }
        setColor({ ...color, color: colorHexa });
    };

    return (
        <>
            <div className="colorPage">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href="/">
                        <KeyboardArrowLeftIcon sx={backIcon} />
                    </Link>
                    <h1>Color</h1>
                </div>
                <div className="colorElement">
                    <FormControl >
                        <FormLabel id="radio-buttons-group-label" sx={{ fontSize:30 ,color: 'white', '&.Mui-focused': { color: 'white' }, }}>Ajouter la transparence ?</FormLabel>
                        <RadioGroup
                        sx={{display:"flex", justifyContent: 'space-evenly'}}
                        defaultValue="Non"
                        
                            row
                            aria-labelledby="transparency radio buttons"
                            name="transparency"
                            value={color.transparency}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="8" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="Oui" />
                            <FormControlLabel value="6" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />} label="Non" />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={getColorHexa} variant="contained">
                        Couleur Aléatoire
                    </Button>
                    <MuiColorInput
                        sx={{ backgroundColor: "white" }}
                        format="hex8"
                        value={color.color}
                        onChange={(newValue) => setColor({ ...color, color: newValue })}
                    />
                </div>
            </div>
        </>
    );
}

export default Color;
