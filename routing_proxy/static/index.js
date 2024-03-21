const express = require("express");
const fs = require("fs");
const { inspect } = require("util");

const app = express();
var counter = 0;
const phrases = [
    "La programación es como pintar un cuadro, cada línea de código es una pincelada que forma un hermoso retrato digital.",
    "Programar es como construir un edificio, cada función y algoritmo son los elementos que sostienen la estructura.",
    "La programación es como jugar un juego de ajedrez, cada movimiento tiene una estrategia detrás de él para lograr el objetivo final.",
    "Programar es como viajar al espacio, cada línea de código nos lleva a descubrir nuevos mundos y posibilidades en la tecnología digital.",
    "La programación es como cocinar un plato delicioso, cada ingrediente (lenguaje de programación, algoritmo, función) se combina para crear algo único y sabroso.",
    "Programar es como ser un arquitecto digital, diseñando herramientas y soluciones que transforman la forma en que interactuamos con el mundo virtual.",
    "La programación es como ser un mago de la informática, manipulando datos y creando ilusiones digitales para entretener y educar a los usuarios.",
    "Programar es como escribir una historia, cada línea de código es un capítulo más en el libro de nuestra creación digital.",
    "La programación es como ser un científico de la tecnología, explorando y descubriendo nuevas formas de interactuar con la información a través del lenguaje de las máquinas.",
    "Programar es como ser un pintor digital, creando obras maestras que se pueden compartir y admirar en todo el mundo a través de Internet y dispositivos electrónicos."
];

app.get("/phrases", async (req, res) => {
    if(counter >= phrases.length) {
        counter = 0;
    }

    res.status(200).json({
        error: false,
        data: {
            phrase: phrases[counter++]
        }
    });
});

app.get("/photos", async (req, res) => {
    const photos = fs.readdirSync("./photos").filter(f => f.endsWith(".png") || f.endsWith(".jpg"));

    res.status(200).json({
        error: false,
        data: {
            photos
        }
    });
});

app.get("/photos/:photo", async (req, res) => {
    const file = `./photos/${req.params.photo}`;

    if(!fs.existsSync(file)) {
        return res.status(404).json({
            error: true,
            data: "Photo not found"
        });
    }

    res.status(200).sendFile(file);
});

app.listen(3000, "0.0.0.0", () => {
    console.log(`Server STATIC ready`);
});