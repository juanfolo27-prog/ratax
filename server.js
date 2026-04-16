const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. BASE DE DATOS MAESTRA (50 ANIMES DE TUS FOTOS DE CRUNCHYROLL)
const recomendacionesSistema = {
    // Acción y Shonen
    "fire force": "¡Shinra y la Octava! Si te gusta el estilo de Ohkubo, tienes que ver 'Soul Eater'.",
    "fate/strange fake": "Una guerra del Grial inusual. Si te gusta el universo Fate, 'Fate/Zero' es obligatorio.",
    "mf ghost": "Carreras de infarto. Si amas la velocidad, 'Wangan Midnight' es para ti.",
    "trigun stampede": "Vash el Estampida. Si te gusta el desierto futurista, prueba 'Cowboy Bebop'.",
    "gachiakuta": "Basura convertida en poder. Si te gusta el arte crudo, prueba 'Fire Force'.",
    "golden kamuy": "Supervivencia y guerra. Si te gusta Sugimoto, 'Vinland Saga' es el camino.",
    "blue miburo": "Samuráis en una época de cambio. Prueba 'Rurouni Kenshin'.",
    "my hero academia": "¡Plus Ultra! Si amas a Deku, tienes que ver 'Black Clover'.",
    "one piece": "¡El rey de la aventura! Si amas el mundo gigante de One Piece, tienes que ver 'Hunter x Hunter'.",
    "ao ashi": "Fútbol táctico. Si te gusta el realismo, tienes que ver 'Giant Killing'.",
    "solo leveling": "Sube de nivel solo. Prueba 'The God of High School'.",
    "attack on titan": "Humanidad contra titanes. Prueba 'Koutetsujou no Kabaneri'.",
    "to your eternity": "Inmortalidad y sentimientos. Prueba 'Frieren'.",
    "megalobox": "Boxeo con gears. Si amas la lucha con estilo, prueba 'Ashita no Joe'.",
    "black clover": "Asta y su camino a ser Rey Mago. Mira 'Naruto'.",
    "hell's paradise": "Gabimaru en la isla. Prueba 'Chainsaw Man' o 'Jujutsu Kaisen'.",
    "dragon ball z": "¡La leyenda! Mira 'One Punch Man' como tributo.",
    "demon slayer": "Tanjiro y su voluntad. Prueba 'Jujutsu Kaisen'.",
    "blue lock": "¡Egoísta detectado! Si buscas la intensidad de Blue Lock, 'Ao Ashi' es obligatorio.",
    "haikyuu!!": "¡Voleibol con alma! Si te gusta Hinata, mira 'Blue Lock'.",
    "naruto shippuden": "El camino ninja. Si te gusta la redención, 'Black Clover' sigue su legado.",
    "captain tsubasa": "Oliver y sus tiros mágicos. Si quieres algo moderno, 'Blue Lock' es la evolución.",
    "chainsaw man": "Denji y el demonio motosierra. Caos puro, prueba 'Jujutsu Kaisen'.",
    "jojo no kimyo na boken": "Poses y stands. Si amas a los Joestars, tienes que ver 'Baki'.",
    "vinland saga": "Vikingos y venganza. Si amas a Thorfinn, 'Berserk' es el siguiente paso.",
    "soul eater": "¡Resonancia de almas! Si te gusta este estilo, 'Fire Force' es del mismo autor.",
    "code geass": "Lelouch y su rebelión. Si amas la estrategia militar, mira '86 Eighty-Six'.",

    // Isekai y Fantasía
    "i got a cheat skill in another world": "Prota OP. Si te gusta ver a alguien romper el sistema, mira 'Solo Leveling'.",
    "mushoku tensei": "El renacimiento en un mundo de magia. Prueba 'Re:Zero'.",
    "shangri-la frontier": "Cazador de juegos basura. Prueba 'Log Horizon'.",
    "overlord": "Ainz Ooal Gown. Prueba 'That Time I Got Reincarnated as a Slime'.",
    "tower of god": "Sube la torre para cumplir deseos. Si te gusta el sistema de retos, 'Hunter x Hunter'.",
    "the faraway paladin": "Un Isekai espiritual y serio. Si buscas fantasía épica, mira 'Frieren'.",
    "the wrong way to use healing magic": "Entrenamiento infernal para un sanador. Prueba 'Mushoku Tensei'.",
    "in another world with my smartphone": "Harem e Isekai ligero. Si buscas algo relax, 'Campfire Cooking'." ,

    // Romance y Drama
    "vampire knight": "Romance gótico. Prueba 'Diabolik Lovers'.",
    "horimiya": "Romance escolar real. Si te gusta, 'Kimi ni Todoke' te dará la misma vibra.",
    "my dress-up darling": "Marin y el cosplay. Si te gusta la pasión por un hobby, mira 'Smile Down the Runway'.",
    "las 100 novias": "Caos romántico total. Prueba 'Kanojo mo Kanojo'.",
    "hokkaido gals": "Romance en la nieve. Prueba 'More than a Married Couple, but Not Lovers'.",
    "watari-kun's is about to collapse": "Drama escolar al límite. Si te gusta el romance tenso, prueba 'Scum's Wish'.",
    "tales of wedding rings": "Isekai de fantasía y compromiso. Prueba 'How a Realist Hero Rebuilt the Kingdom'.",

    // Misterio y Otros
    "detective conan": "El detective eterno. Si amas el misterio, prueba 'Kindaichi Case Files'.",
    "the apothecary diaries": "Maomao y sus venenos. Prueba 'Raven of the Inner Palace'.",
    "mob psycho 100": "Poderes psíquicos y evolución personal. 'One Punch Man' es su hermano.",
    "spy x family": "La familia Forger es la mejor. Prueba 'Buddy Daddies'.",
    "la vida diaria del rey inmortal": "Poder absoluto en la escuela. Prueba 'The Daily Life of the Immortal King'.",
    "classroom of the elite": "Ayanokouji lo controla todo. Si te gusta el genio frío, prueba 'Tomodachi Game'.",
    "tokyo ghoul": "Kaneki y la tragedia. Si buscas gore psicológico, 'Parasyte' es tu anime.",
    "fullmetal alchemist": "La alquimia y el sacrificio. Si buscas una historia perfecta, mira 'Hunter x Hunter'.",
    "bungo stray dogs": "Detectives con nombres literarios. Prueba 'Blood Blockade Battlefront'.",
    "assassination classroom": "Koro-sensei es el mejor profesor. Prueba 'Danganronpa'.",
    "darling in the franxx": "Zero Two y los mechas. Prueba 'Neon Genesis Evangelion'.",
    "kingdom": "Guerra china a gran escala. Mira 'The Heroic Legend of Arslan'.",
    "tokyo revengers": "Pandillas y viajes en el tiempo. Si buscas drama juvenil, prueba 'Erased'.",
    "lord of mysteries": "Steampunk y misterio. Prueba 'Bungo Stray Dogs'."
};

// 2. LÓGICA DE PROCESAMIENTO (Análisis de lista completa)
app.post('/chat', (req, res) => {
    const { message, list } = req.body;
    const q = message.toLowerCase().trim();
    let reply = "";

    // Filtramos animes válidos de tu lista
    const conocidos = list.filter(a => recomendacionesSistema[a.toLowerCase().trim()]);

    // A. Si pides recomendación analizando la lista
    if (q.includes("recomienda") || q.includes("que ver") || q.includes("cual")) {
        if (conocidos.length > 1) {
            const nombres = conocidos.join(", ");
            reply = `He analizado tu lista de egoístas: **${nombres}**. Con esta combinación de registros, te ordeno ver **CHANCE** o **DARWIN'S GAME**.`;
        } else if (conocidos.length === 1) {
            reply = recomendacionesSistema[conocidos[0].toLowerCase().trim()];
        } else {
            reply = "Tu lista está vacía o no reconozco esos nombres. ¡Añade animes de tus fotos!";
        }
    } 
    // B. Si preguntas por un nombre específico
    else {
        const animeMencionado = Object.keys(recomendacionesSistema).find(anime => q.includes(anime));
        if (animeMencionado) {
            reply = recomendacionesSistema[animeMencionado];
        } else if (q.includes("hola")) {
            reply = "Aquí RATAX. El sistema está activo y analizando tus 50 registros. ¿Qué quieres saber?";
        } else {
            reply = `RATAX te observa. Tienes ${list.length} registros. Dime 'cual recomiendas' para analizarlos todos juntos.`;
        }
    }

    res.json({ reply });
});

app.listen(3000, () => {
    console.log("🔥 SISTEMA RATAX ACTIVO Y ANALIZANDO TUS GUSTOS");
});