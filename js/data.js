// Aussie Slang Database
const slangData = [
    // Greetings & Common Expressions
    {
        id: "gday",
        term: "G'day",
        meaning: "Hello / Good day",
        example: "G'day mate, how ya going?",
        category: "greetings"
    },
    {
        id: "howya-going",
        term: "How ya going?",
        meaning: "How are you?",
        example: "Hey Sarah, how ya going?",
        category: "greetings"
    },
    {
        id: "no-worries",
        term: "No worries",
        meaning: "No problem / You're welcome",
        example: "Thanks for the lift! — No worries, mate.",
        category: "expressions"
    },
    {
        id: "shes-right",
        term: "She'll be right",
        meaning: "Everything will be okay",
        example: "Don't stress about the exam, she'll be right.",
        category: "expressions"
    },
    {
        id: "too-easy",
        term: "Too easy",
        meaning: "No problem / Consider it done",
        example: "Can you grab me a coffee? — Too easy!",
        category: "expressions"
    },
    {
        id: "cheers",
        term: "Cheers",
        meaning: "Thanks / Goodbye",
        example: "Cheers for helping me move!",
        category: "greetings"
    },
    {
        id: "hooroo",
        term: "Hooroo",
        meaning: "Goodbye",
        example: "Hooroo mate, see ya tomorrow!",
        category: "greetings"
    },
    {
        id: "ta",
        term: "Ta",
        meaning: "Thank you",
        example: "Ta for the cuppa!",
        category: "greetings"
    },

    // Time & Place
    {
        id: "arvo",
        term: "Arvo",
        meaning: "Afternoon",
        example: "I'll see you this arvo at the pub.",
        category: "time"
    },
    {
        id: "reckon",
        term: "Reckon",
        meaning: "Think / Believe",
        example: "I reckon it's gonna rain today.",
        category: "expressions"
    },
    {
        id: "servo",
        term: "Servo",
        meaning: "Service station / Gas station",
        example: "Pull into the servo, we need petrol.",
        category: "places"
    },
    {
        id: "bottle-o",
        term: "Bottle-o",
        meaning: "Liquor store",
        example: "I'll grab some beers from the bottle-o.",
        category: "places"
    },
    {
        id: "maccas",
        term: "Maccas",
        meaning: "McDonald's",
        example: "Let's hit up Maccas for a feed.",
        category: "places"
    },
    {
        id: "smoko",
        term: "Smoko",
        meaning: "Smoke break / Short work break",
        example: "I'll finish this after smoko.",
        category: "time"
    },
    {
        id: "sparrows-fart",
        term: "Sparrow's fart",
        meaning: "Very early morning / Dawn",
        example: "We have to leave at sparrow's fart to beat traffic.",
        category: "time"
    },
    {
        id: "yonks",
        term: "Yonks",
        meaning: "A very long time",
        example: "I haven't seen him in yonks!",
        category: "time"
    },
    {
        id: "fortnight",
        term: "Fortnight",
        meaning: "Two weeks",
        example: "I'll be back in a fortnight.",
        category: "time"
    },
    {
        id: "woop-woop",
        term: "Woop Woop",
        meaning: "Middle of nowhere / Remote area",
        example: "They live out in Woop Woop, hours from the city.",
        category: "places"
    },
    {
        id: "outback",
        term: "The Outback",
        meaning: "Remote inland Australia",
        example: "We're driving through the outback next week.",
        category: "places"
    },
    {
        id: "bush",
        term: "The Bush",
        meaning: "Rural/wilderness area",
        example: "He grew up in the bush, not the city.",
        category: "places"
    },
    {
        id: "billabong",
        term: "Billabong",
        meaning: "Waterhole / Pond formed by river",
        example: "We went swimming in the billabong.",
        category: "places"
    },
    {
        id: "woolies",
        term: "Woolies",
        meaning: "Woolworths supermarket",
        example: "I need to pop into Woolies for milk.",
        category: "places"
    },
    {
        id: "coles",
        term: "Coles",
        meaning: "Coles supermarket (sometimes called 'Colesworths')",
        example: "Coles has the specials on this week.",
        category: "places"
    },
    {
        id: "bunnings",
        term: "Bunnings",
        meaning: "Hardware store (famous for sausage sizzles)",
        example: "Let's go to Bunnings for a snag and some screws.",
        category: "places"
    },

    // People
    {
        id: "mate",
        term: "Mate",
        meaning: "Friend / Buddy (or anyone really)",
        example: "Thanks mate, you're a legend.",
        category: "people"
    },
    {
        id: "bloke",
        term: "Bloke",
        meaning: "Man / Guy",
        example: "He's a good bloke, you'll like him.",
        category: "people"
    },
    {
        id: "sheila",
        term: "Sheila",
        meaning: "Woman (somewhat old-fashioned)",
        example: "Who's that sheila over there?",
        category: "people"
    },
    {
        id: "legend",
        term: "Legend",
        meaning: "Great person / Someone awesome",
        example: "You fixed my car? You're an absolute legend!",
        category: "people"
    },
    {
        id: "bogan",
        term: "Bogan",
        meaning: "Uncultured person (similar to redneck)",
        example: "Check out the mullet on that bogan.",
        category: "people"
    },
    {
        id: "larrikin",
        term: "Larrikin",
        meaning: "Mischievous but good-natured person",
        example: "He's a bit of a larrikin, always joking around.",
        category: "people"
    },
    {
        id: "drongo",
        term: "Drongo",
        meaning: "Idiot / Stupid person",
        example: "Don't be such a drongo!",
        category: "people"
    },
    {
        id: "galah",
        term: "Galah",
        meaning: "Fool / Silly person (named after the bird)",
        example: "You flamin' galah, you left the gate open!",
        category: "people"
    },
    {
        id: "cobber",
        term: "Cobber",
        meaning: "Friend / Mate (old-fashioned)",
        example: "He's been my cobber since school.",
        category: "people"
    },
    {
        id: "ankle-biter",
        term: "Ankle biter",
        meaning: "Small child / Toddler",
        example: "She's got three ankle biters running around.",
        category: "people"
    },
    {
        id: "old-fella",
        term: "Old fella",
        meaning: "Father / Elderly man",
        example: "My old fella taught me to fish.",
        category: "people"
    },
    {
        id: "old-girl",
        term: "Old girl",
        meaning: "Mother / Elderly woman",
        example: "The old girl makes the best pavlova.",
        category: "people"
    },
    {
        id: "battler",
        term: "Battler",
        meaning: "Someone who works hard despite difficulties",
        example: "He's a real battler, never gives up.",
        category: "people"
    },
    {
        id: "ocker",
        term: "Ocker",
        meaning: "Stereotypical uncultured Australian",
        example: "He's a bit of an ocker with his thongs and singlet.",
        category: "people"
    },

    // Food & Drink
    {
        id: "snag",
        term: "Snag",
        meaning: "Sausage",
        example: "Chuck a few snags on the barbie.",
        category: "food"
    },
    {
        id: "barbie",
        term: "Barbie",
        meaning: "Barbecue",
        example: "We're having a barbie this Saturday.",
        category: "food"
    },
    {
        id: "coldie",
        term: "Coldie",
        meaning: "Cold beer",
        example: "Grab us a coldie from the esky.",
        category: "food"
    },
    {
        id: "esky",
        term: "Esky",
        meaning: "Cooler / Ice box",
        example: "The drinks are in the esky.",
        category: "food"
    },
    {
        id: "brekkie",
        term: "Brekkie",
        meaning: "Breakfast",
        example: "Let's meet for brekkie at 9.",
        category: "food"
    },
    {
        id: "sanga",
        term: "Sanga",
        meaning: "Sandwich",
        example: "I made a vegemite sanga for lunch.",
        category: "food"
    },
    {
        id: "chook",
        term: "Chook",
        meaning: "Chicken",
        example: "I'll pick up a roast chook for dinner.",
        category: "food"
    },
    {
        id: "cuppa",
        term: "Cuppa",
        meaning: "Cup of tea or coffee",
        example: "Come in and have a cuppa.",
        category: "food"
    },
    {
        id: "tinnie",
        term: "Tinnie",
        meaning: "Can of beer / Small aluminum boat",
        example: "Pass us a tinnie from the esky.",
        category: "food"
    },
    {
        id: "stubby",
        term: "Stubby",
        meaning: "Small bottle of beer",
        example: "Grab a stubby and come sit down.",
        category: "food"
    },
    {
        id: "grog",
        term: "Grog",
        meaning: "Alcohol / Booze",
        example: "We need to get some grog for the party.",
        category: "food"
    },
    {
        id: "plonk",
        term: "Plonk",
        meaning: "Cheap wine",
        example: "Just grab some plonk from the bottle-o.",
        category: "food"
    },
    {
        id: "bikkie",
        term: "Bikkie",
        meaning: "Biscuit / Cookie",
        example: "Want a bikkie with your tea?",
        category: "food"
    },
    {
        id: "choccy",
        term: "Choccy",
        meaning: "Chocolate",
        example: "I could really go for some choccy right now.",
        category: "food"
    },
    {
        id: "lollies",
        term: "Lollies",
        meaning: "Candy / Sweets",
        example: "The kids want lollies from the shop.",
        category: "food"
    },
    {
        id: "avo",
        term: "Avo",
        meaning: "Avocado",
        example: "Smashed avo on toast is a classic brekkie.",
        category: "food"
    },
    {
        id: "capsicum",
        term: "Capsicum",
        meaning: "Bell pepper",
        example: "Add some capsicum to the salad.",
        category: "food"
    },
    {
        id: "prawns",
        term: "Prawns",
        meaning: "Shrimp (never call them shrimp!)",
        example: "Chuck some prawns on the barbie.",
        category: "food"
    },
    {
        id: "dead-horse",
        term: "Dead horse",
        meaning: "Tomato sauce (rhyming slang)",
        example: "Pass the dead horse for my pie.",
        category: "food"
    },
    {
        id: "mystery-bag",
        term: "Mystery bag",
        meaning: "Sausage (you never know what's in it)",
        example: "I'll have a mystery bag from the sausage sizzle.",
        category: "food"
    },

    // Actions & States
    {
        id: "chuck",
        term: "Chuck",
        meaning: "Throw / Put",
        example: "Chuck your bag in the back.",
        category: "actions"
    },
    {
        id: "flat-out",
        term: "Flat out",
        meaning: "Very busy / At maximum speed",
        example: "I've been flat out at work all week.",
        category: "actions"
    },
    {
        id: "knackered",
        term: "Knackered",
        meaning: "Exhausted / Very tired",
        example: "I'm absolutely knackered after that hike.",
        category: "actions"
    },
    {
        id: "stoked",
        term: "Stoked",
        meaning: "Very happy / Excited",
        example: "I'm stoked about the concert next week!",
        category: "actions"
    },
    {
        id: "stuffed",
        term: "Stuffed",
        meaning: "Broken / Exhausted / Full from eating",
        example: "The TV's stuffed, we need a new one.",
        category: "actions"
    },
    {
        id: "spit-the-dummy",
        term: "Spit the dummy",
        meaning: "Throw a tantrum / Get very upset",
        example: "He spat the dummy when they cancelled his flight.",
        category: "actions"
    },
    {
        id: "skull",
        term: "Skull",
        meaning: "Drink quickly in one go",
        example: "He skulled his beer in 10 seconds.",
        category: "actions"
    },
    {
        id: "sickie",
        term: "Sickie",
        meaning: "Taking a sick day (often when not actually sick)",
        example: "I'm chucking a sickie tomorrow for the beach.",
        category: "actions"
    },
    {
        id: "rack-off",
        term: "Rack off",
        meaning: "Go away / Get lost",
        example: "Rack off, I'm busy!",
        category: "actions"
    },
    {
        id: "sus-out",
        term: "Sus out",
        meaning: "Figure out / Investigate",
        example: "Let me sus out what's going on.",
        category: "actions"
    },
    {
        id: "yarn",
        term: "Have a yarn",
        meaning: "Have a chat / conversation",
        example: "Come over and we'll have a yarn.",
        category: "actions"
    },
    {
        id: "arcing-up",
        term: "Arcing up",
        meaning: "Getting angry / Aggressive",
        example: "Don't go arcing up at me!",
        category: "actions"
    },
    {
        id: "chucking-a-wobbly",
        term: "Chuck a wobbly",
        meaning: "Have a tantrum / Get very angry",
        example: "Mum chucked a wobbly when she saw my report card.",
        category: "actions"
    },
    {
        id: "doing-a-runner",
        term: "Do a runner",
        meaning: "Leave quickly / Escape without paying",
        example: "They did a runner from the restaurant!",
        category: "actions"
    },
    {
        id: "give-it-a-burl",
        term: "Give it a burl",
        meaning: "Give it a try",
        example: "I've never surfed before but I'll give it a burl.",
        category: "actions"
    },
    {
        id: "having-a-whinge",
        term: "Have a whinge",
        meaning: "Complain / Moan",
        example: "Stop having a whinge and get on with it.",
        category: "actions"
    },
    {
        id: "taking-the-piss",
        term: "Taking the piss",
        meaning: "Making fun of / Joking around",
        example: "Are you taking the piss or being serious?",
        category: "actions"
    },
    {
        id: "come-a-cropper",
        term: "Come a cropper",
        meaning: "Fall over / Fail badly",
        example: "He came a cropper on his bike.",
        category: "actions"
    },
    {
        id: "spit-chips",
        term: "Spit chips",
        meaning: "Be very angry",
        example: "She'll spit chips when she finds out.",
        category: "actions"
    },

    // Descriptive
    {
        id: "heaps",
        term: "Heaps",
        meaning: "A lot / Very",
        example: "That movie was heaps good!",
        category: "descriptive"
    },
    {
        id: "dodgy",
        term: "Dodgy",
        meaning: "Suspicious / Poor quality",
        example: "That kebab shop looks a bit dodgy.",
        category: "descriptive"
    },
    {
        id: "bonkers",
        term: "Bonkers",
        meaning: "Crazy / Insane",
        example: "The traffic today was absolutely bonkers.",
        category: "descriptive"
    },
    {
        id: "ripper",
        term: "Ripper",
        meaning: "Excellent / Fantastic",
        example: "That was a ripper of a game!",
        category: "descriptive"
    },
    {
        id: "bloody",
        term: "Bloody",
        meaning: "Very (intensifier, mild expletive)",
        example: "It's bloody hot today!",
        category: "descriptive"
    },
    {
        id: "fair-dinkum",
        term: "Fair dinkum",
        meaning: "Genuine / True / Really?",
        example: "Fair dinkum? I can't believe he said that!",
        category: "descriptive"
    },
    {
        id: "pissed",
        term: "Pissed",
        meaning: "Drunk (not angry like in US)",
        example: "He got absolutely pissed at the party.",
        category: "descriptive"
    },
    {
        id: "wrecked",
        term: "Wrecked",
        meaning: "Very drunk or exhausted",
        example: "I was absolutely wrecked after the party.",
        category: "descriptive"
    },
    {
        id: "aggro",
        term: "Aggro",
        meaning: "Aggressive / Angry",
        example: "Don't get aggro with me!",
        category: "descriptive"
    },
    {
        id: "chockers",
        term: "Chockers",
        meaning: "Completely full",
        example: "The train was chockers this morning.",
        category: "descriptive"
    },
    {
        id: "crikey",
        term: "Crikey",
        meaning: "Expression of surprise",
        example: "Crikey! That spider is huge!",
        category: "descriptive"
    },
    {
        id: "strewth",
        term: "Strewth",
        meaning: "Expression of surprise (God's truth)",
        example: "Strewth, that was close!",
        category: "descriptive"
    },
    {
        id: "deadset",
        term: "Deadset",
        meaning: "Absolutely / Completely true",
        example: "That's deadset the best pie I've ever had.",
        category: "descriptive"
    },
    {
        id: "mad",
        term: "Mad",
        meaning: "Great / Awesome (not angry)",
        example: "That party was mad!",
        category: "descriptive"
    },
    {
        id: "sweet-as",
        term: "Sweet as",
        meaning: "Cool / No problem",
        example: "You need a lift? Sweet as.",
        category: "descriptive"
    },
    {
        id: "suss",
        term: "Suss",
        meaning: "Suspicious / Suspect",
        example: "That deal sounds a bit suss to me.",
        category: "descriptive"
    },
    {
        id: "bodgy",
        term: "Bodgy",
        meaning: "Poor quality / Badly made",
        example: "That's a bodgy repair job.",
        category: "descriptive"
    },
    {
        id: "bludger",
        term: "Bludger",
        meaning: "Lazy person / Someone who avoids work",
        example: "Stop being a bludger and help out!",
        category: "descriptive"
    },

    // Wildlife & Nature
    {
        id: "mozzie",
        term: "Mozzie",
        meaning: "Mosquito",
        example: "The mozzies are terrible tonight!",
        category: "wildlife"
    },
    {
        id: "roo",
        term: "Roo",
        meaning: "Kangaroo",
        example: "Watch out for roos on the road at night.",
        category: "wildlife"
    },
    {
        id: "cocky",
        term: "Cocky",
        meaning: "Cockatoo",
        example: "The cockies are making a racket this morning.",
        category: "wildlife"
    },
    {
        id: "croc",
        term: "Croc",
        meaning: "Crocodile",
        example: "Don't swim there, there's crocs!",
        category: "wildlife"
    },
    {
        id: "wombat",
        term: "Wombat",
        meaning: "Cute burrowing marsupial (also an insult for slow person)",
        example: "We saw a wombat crossing the road.",
        category: "wildlife"
    },
    {
        id: "bluey",
        term: "Bluey",
        meaning: "Blue heeler dog / Redheaded person",
        example: "My bluey is the best cattle dog.",
        category: "wildlife"
    },

    // Colorful Expressions
    {
        id: "crack-a-tinnie",
        term: "Crack a tinnie",
        meaning: "Open a can of beer",
        example: "Let's crack a tinnie and watch the footy.",
        category: "expressions"
    },
    {
        id: "as-cross-as-a-frog",
        term: "Cross as a frog in a sock",
        meaning: "Very angry",
        example: "She was as cross as a frog in a sock.",
        category: "expressions"
    },
    {
        id: "dry-as-a-dead-dingo",
        term: "Dry as a dead dingo's donger",
        meaning: "Very thirsty / Very dry",
        example: "I'm dry as a dead dingo's donger, get me a beer!",
        category: "expressions"
    },
    {
        id: "few-roos-loose",
        term: "Few roos loose in the top paddock",
        meaning: "A bit crazy / Not all there",
        example: "He's got a few roos loose in the top paddock.",
        category: "expressions"
    },
    {
        id: "kangaroos-loose",
        term: "Kangaroos loose in the top paddock",
        meaning: "Crazy / Mentally unstable",
        example: "That bloke's got kangaroos loose in the top paddock.",
        category: "expressions"
    },
    {
        id: "flat-out-lizard",
        term: "Flat out like a lizard drinking",
        meaning: "Extremely busy",
        example: "I've been flat out like a lizard drinking all week.",
        category: "expressions"
    },
    {
        id: "happy-as-larry",
        term: "Happy as Larry",
        meaning: "Very happy",
        example: "Give him a beer and he's happy as Larry.",
        category: "expressions"
    },
    {
        id: "up-shit-creek",
        term: "Up shit creek",
        meaning: "In big trouble",
        example: "If we miss this deadline, we're up shit creek.",
        category: "expressions"
    },
    {
        id: "piece-of-piss",
        term: "Piece of piss",
        meaning: "Very easy",
        example: "That exam was a piece of piss!",
        category: "expressions"
    },
    {
        id: "dogs-breakfast",
        term: "Dog's breakfast",
        meaning: "A mess / Disaster",
        example: "This project has turned into a dog's breakfast.",
        category: "expressions"
    }
];

// Get unique categories from the data
const categories = [...new Set(slangData.map(item => item.category))];

// Category display names
const categoryNames = {
    greetings: "Greetings",
    expressions: "Expressions",
    time: "Time",
    places: "Places",
    people: "People",
    food: "Food & Drink",
    actions: "Actions",
    descriptive: "Descriptive",
    wildlife: "Wildlife"
};
