// Australian Slang Pronunciation Dictionary
// Maps slang terms to phonetic pronunciations for TTS
// These will be used to replace terms in sentences before sending to ElevenLabs

const pronunciationDictionary = {
    // Greetings
    "G'day": "Guh-day",
    "g'day": "guh-day",
    "How ya going": "How ya goin",
    "onya": "on ya",
    "Yeah, nah": "Yeah nah",
    "Nah, yeah": "Nah yeah",

    // Time/Place abbreviations
    "arvo": "ah-vo",
    "Arvo": "Ah-vo",
    "servo": "serv-oh",
    "Servo": "Serv-oh",
    "bottle-o": "bottle-oh",
    "Bottle-o": "Bottle-oh",
    "smoko": "smoke-oh",
    "Smoko": "Smoke-oh",

    // Place names
    "Tassie": "Tazzy",
    "tassie": "tazzy",
    "Brissy": "Brizzy",
    "brissy": "brizzy",
    "Goldie": "Gold-ee",
    "goldie": "gold-ee",
    "Woop Woop": "Woop Woop",  // Keep as is, emphasize

    // People suffixes (-ie/-o endings)
    "tradie": "tray-dee",
    "Tradie": "Tray-dee",
    "postie": "post-ee",
    "Postie": "Post-ee",
    "garbo": "gar-bo",
    "Garbo": "Gar-bo",
    "ambo": "am-bo",
    "Ambo": "Am-bo",
    "muso": "mew-zo",
    "Muso": "Mew-zo",
    "ranga": "rang-ah",
    "Ranga": "Rang-ah",
    "firey": "fire-ee",
    "Firey": "Fire-ee",
    "bushie": "bush-ee",
    "Bushie": "Bush-ee",
    "yobbo": "yob-oh",
    "Yobbo": "Yob-oh",
    "ciggie": "sig-ee",
    "Ciggie": "Sig-ee",

    // Food/Drink
    "brekkie": "brek-ee",
    "Brekkie": "Brek-ee",
    "bikkie": "bik-ee",
    "Bikkie": "Bik-ee",
    "choccy": "chock-ee",
    "Choccy": "Chock-ee",
    "sanga": "sang-ah",
    "Sanga": "Sang-ah",
    "parmi": "par-mee",
    "Parmi": "Par-mee",
    "schnitty": "schnit-ee",
    "Schnitty": "Schnit-ee",
    "bevvies": "bev-eez",
    "Bevvies": "Bev-eez",
    "coldie": "cold-ee",
    "Coldie": "Cold-ee",
    "tinnie": "tin-ee",
    "Tinnie": "Tin-ee",
    "stubby": "stub-ee",
    "Stubby": "Stub-ee",
    "schooner": "skoo-ner",
    "Schooner": "Skoo-ner",

    // Things
    "sunnies": "sun-eez",
    "Sunnies": "Sun-eez",
    "trackies": "track-eez",
    "Trackies": "Track-eez",
    "cossie": "coz-ee",
    "Cossie": "Coz-ee",
    "bathers": "bay-thers",
    "Bathers": "Bay-thers",
    "ute": "yoot",
    "Ute": "Yoot",
    "rego": "reh-go",
    "Rego": "Reh-go",
    "prezzie": "prez-ee",
    "Prezzie": "Prez-ee",
    "chrissie": "chris-ee",
    "Chrissie": "Chris-ee",
    "rello": "rel-oh",
    "Rello": "Rel-oh",
    "rellos": "rel-ohs",
    "doco": "dock-oh",
    "Doco": "Dock-oh",

    // Actions
    "U-ey": "you-ee",
    "u-ey": "you-ee",
    "sickie": "sick-ee",
    "skulled": "skuld",
    "suss": "sus",
    "Suss": "Sus",

    // Descriptive
    "chockers": "chock-ers",
    "Chockers": "Chock-ers",
    "devo": "dev-oh",
    "Devo": "Dev-oh",
    "aggro": "ag-ro",
    "Aggro": "Ag-ro",
    "spewin'": "spew-in",
    "Spewin'": "Spew-in",
    "daggy": "dag-ee",
    "Daggy": "Dag-ee",

    // Wildlife
    "mozzie": "moz-ee",
    "Mozzie": "Moz-ee",
    "mozzies": "moz-eez",
    "cocky": "cock-ee",
    "Cocky": "Cock-ee",
    "cockies": "cock-eez",

    // Expressions
    "Bewdy": "Byoo-dee",
    "bewdy": "byoo-dee",
    "Straya": "Stray-ah",
    "straya": "stray-ah",
    "Oi": "Oy",
    "oi": "oy",
    "Ta": "Tah",
    "ta": "tah",
    "Righto": "Right-oh",
    "righto": "right-oh",

    // Common words that might be mispronounced
    "mate": "mayt",
    "Mate": "Mayt",
    "chook": "chook",  // Keep, rhymes with book
    "sook": "sook",    // Keep, rhymes with book
    "dunny": "dun-ee",
    "Dunny": "Dun-ee",
};

// Function to apply pronunciation dictionary to text
function applyPronunciation(text) {
    let result = text;

    // Sort by length (longest first) to avoid partial replacements
    const sortedTerms = Object.keys(pronunciationDictionary)
        .sort((a, b) => b.length - a.length);

    for (const term of sortedTerms) {
        const pronunciation = pronunciationDictionary[term];
        // Use word boundary matching to avoid replacing parts of words
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        result = result.replace(regex, pronunciation);
    }

    return result;
}

module.exports = { pronunciationDictionary, applyPronunciation };
