// Aussie Slang Database - Updated & Expanded
// Difficulty levels: beginner (common), intermediate (regular), advanced (obscure/colorful)
// Reviewed and cleaned - removed outdated phrases and swearing
// Pronunciation hints for Fish.audio TTS

const slangData = [
    // ============================================
    // GREETINGS & COMMON EXPRESSIONS
    // ============================================
    { id: "gday", term: "G'day", meaning: "Hello / Good day", example: "G'day mate, how ya going?", category: "greetings", difficulty: "beginner", termPronunciation: "Gidday" },
    { id: "howya-going", term: "How ya going?", meaning: "How are you?", example: "Hey Sarah, how ya going?", category: "greetings", difficulty: "beginner" },
    { id: "no-worries", term: "No worries", meaning: "No problem / You're welcome", example: "No worries, mate. Anytime!", category: "expressions", difficulty: "beginner" },
    { id: "no-wuckas", term: "No wuckas", meaning: "No worries (shortened slang)", example: "No wuckas, mate. I'll be there.", category: "expressions", difficulty: "intermediate", termPronunciation: "No wuckers" },
    { id: "no-dramas", term: "No dramas", meaning: "No problem / All good", example: "No dramas, you're all good!", category: "expressions", difficulty: "beginner" },
    { id: "shes-right", term: "She'll be right", meaning: "Everything will be okay", example: "Don't stress about the exam, she'll be right.", category: "expressions", difficulty: "beginner" },
    { id: "too-easy", term: "Too easy", meaning: "No problem / Consider it done", example: "Too easy, I'll grab you one now.", category: "expressions", difficulty: "beginner" },
    { id: "sweet-as", term: "Sweet as", meaning: "Cool / No problem / Great", example: "Sweet as, I'll give you a lift.", category: "expressions", difficulty: "beginner" },
    { id: "good-as-gold", term: "Good as gold", meaning: "All good / Fine", example: "Everything's good as gold.", category: "expressions", difficulty: "intermediate" },
    { id: "cheers", term: "Cheers", meaning: "Thanks / Goodbye", example: "Cheers for helping me move!", category: "greetings", difficulty: "beginner" },
    { id: "ta", term: "Ta", meaning: "Thank you", example: "Ta for the cuppa!", category: "greetings", difficulty: "beginner" },
    { id: "see-ya", term: "See ya", meaning: "Goodbye", example: "See ya tomorrow, mate!", category: "greetings", difficulty: "beginner" },
    { id: "catch-ya", term: "Catch ya", meaning: "See you later", example: "Catch ya on the weekend!", category: "greetings", difficulty: "beginner" },
    { id: "good-onya", term: "Good onya", meaning: "Good for you / Well done", example: "Good onya, that's awesome!", category: "expressions", difficulty: "beginner", termPronunciation: "Good on ya" },
    { id: "yeah-nah", term: "Yeah, nah", meaning: "No (polite disagreement)", example: "Yeah, nah, I'm driving tonight.", category: "expressions", difficulty: "beginner", termPronunciation: "Yeah nah" },
    { id: "nah-yeah", term: "Nah, yeah", meaning: "Yes (casual agreement)", example: "Nah, yeah, I'll definitely be there.", category: "expressions", difficulty: "beginner" },
    { id: "oath", term: "Oath", meaning: "Yes, absolutely (affirmation)", example: "Oath! Wouldn't miss it.", category: "expressions", difficulty: "intermediate", termPronunciation: "Oeth" },
    { id: "fair-go", term: "Fair go", meaning: "Give someone a chance / Be reasonable", example: "Give me a fair go, mate!", category: "expressions", difficulty: "beginner" },
    { id: "oi", term: "Oi", meaning: "Hey! / Attention getter", example: "Oi! Over here!", category: "expressions", difficulty: "beginner", termPronunciation: "Oy" },
    { id: "righto", term: "Righto", meaning: "Alright / Okay", example: "Righto, let's get going then.", category: "expressions", difficulty: "beginner", termPronunciation: "Right-oh" },
    { id: "bewdy", term: "Bewdy", meaning: "Excellent / Great", example: "You got the tickets? Bewdy!", category: "expressions", difficulty: "intermediate", termPronunciation: "Bewdy" },
    { id: "ken-oath", term: "Ken oath", meaning: "Absolutely / Definitely (emphatic)", example: "Ken oath I'm coming to the party!", category: "expressions", difficulty: "intermediate" },
    { id: "straya", term: "Straya", meaning: "Australia (slang)", example: "Best country in the world, Straya!", category: "expressions", difficulty: "beginner", termPronunciation: "Stray-a" },
    { id: "unreal", term: "Unreal", meaning: "Amazing / Incredible", example: "That concert was unreal!", category: "expressions", difficulty: "beginner" },
    { id: "sicko", term: "Sicko", meaning: "Awesome / Cool (modern slang)", example: "That trick was sicko!", category: "expressions", difficulty: "intermediate" },
    { id: "too-right", term: "Too right", meaning: "Definitely / Absolutely", example: "Too right, I'm coming to the barbie!", category: "expressions", difficulty: "beginner" },
    { id: "keen", term: "Keen", meaning: "Enthusiastic / Up for it", example: "Keen for a beach day tomorrow?", category: "expressions", difficulty: "beginner" },
    { id: "bring-a-plate", term: "Bring a plate", meaning: "Bring a dish to share", example: "It's BYO and bring a plate.", category: "expressions", difficulty: "intermediate" },

    // ============================================
    // TIME & PLACE
    // ============================================
    { id: "arvo", term: "Arvo", meaning: "Afternoon", example: "I'll see you this arvo at the pub.", category: "time", difficulty: "beginner", termPronunciation: "Arvo" },
    { id: "yonks", term: "Yonks", meaning: "A very long time", example: "I haven't seen him in yonks!", category: "time", difficulty: "intermediate" },
    { id: "fortnight", term: "Fortnight", meaning: "Two weeks", example: "I'll be back in a fortnight.", category: "time", difficulty: "beginner" },
    { id: "smoko", term: "Smoko", meaning: "Smoke break / Short work break", example: "I'll finish this after smoko.", category: "time", difficulty: "intermediate", termPronunciation: "Smoke-oh" },

    { id: "servo", term: "Servo", meaning: "Service station / Gas station", example: "Pull into the servo, we need petrol.", category: "places", difficulty: "beginner", termPronunciation: "Serv-oh" },
    { id: "bottle-o", term: "Bottle-o", meaning: "Liquor store / Bottle shop", example: "I'll grab some beers from the bottle-o.", category: "places", difficulty: "beginner", termPronunciation: "Bottlo" },
    { id: "maccas", term: "Maccas", meaning: "McDonald's", example: "Let's hit up Maccas for a feed.", category: "places", difficulty: "beginner" },
    { id: "woolies", term: "Woolies", meaning: "Woolworths supermarket", example: "I need to pop into Woolies for milk.", category: "places", difficulty: "beginner" },
    { id: "coles", term: "Coles", meaning: "Coles supermarket", example: "Coles has got the specials on this week.", category: "places", difficulty: "beginner" },
    { id: "bunnings", term: "Bunnings", meaning: "Hardware store (famous for sausage sizzles)", example: "Let's go to Bunnings for a snag and some screws.", category: "places", difficulty: "beginner", termPronunciation: "Bunnings" },
    { id: "woop-woop", term: "Woop Woop", meaning: "Middle of nowhere / Remote area", example: "They live out in Woop Woop, hours from the city.", category: "places", difficulty: "intermediate", termPronunciation: "Woop Woop" },
    { id: "outback", term: "The Outback", meaning: "Remote inland Australia", example: "We're driving through the outback next week.", category: "places", difficulty: "beginner" },
    { id: "bush", term: "The Bush", meaning: "Rural/wilderness area", example: "He grew up in the bush, not the city.", category: "places", difficulty: "beginner" },
    { id: "billabong", term: "Billabong", meaning: "Waterhole / Pond formed by river", example: "We went swimming in the billabong.", category: "places", difficulty: "intermediate" },
    { id: "dunny", term: "Dunny", meaning: "Toilet (especially outdoor)", example: "Where's the dunny, mate?", category: "places", difficulty: "intermediate", termPronunciation: "Dunny" },
    { id: "loo", term: "Loo", meaning: "Toilet", example: "I need to use the loo.", category: "places", difficulty: "beginner", termPronunciation: "Loo" },
    { id: "deli", term: "Deli", meaning: "Corner store (WA)", example: "The deli's just around the corner.", category: "places", difficulty: "intermediate", termPronunciation: "Deli" },
    { id: "tassie", term: "Tassie", meaning: "Tasmania", example: "We're heading to Tassie for a holiday.", category: "places", difficulty: "beginner", termPronunciation: "Tazzy" },
    { id: "brissy", term: "Brissy", meaning: "Brisbane", example: "I'm flying up to Brissy next week.", category: "places", difficulty: "beginner", termPronunciation: "Brizzy" },
    { id: "goldie", term: "Goldie", meaning: "Gold Coast", example: "We're hitting Goldie for schoolies.", category: "places", difficulty: "intermediate" },
    { id: "big-smoke", term: "Big smoke", meaning: "Big city (Sydney/Melbourne)", example: "He moved to the big smoke for work.", category: "places", difficulty: "intermediate" },

    // ============================================
    // PEOPLE
    // ============================================
    { id: "mate", term: "Mate", meaning: "Friend / Buddy (or anyone really)", example: "Thanks mate, you're a legend.", category: "people", difficulty: "beginner", termPronunciation: "Mayte" },
    { id: "bloke", term: "Bloke", meaning: "Man / Guy", example: "He's a good bloke, you'll like him.", category: "people", difficulty: "beginner" },
    { id: "legend", term: "Legend", meaning: "Great person / Someone awesome", example: "You fixed my car? You're an absolute legend!", category: "people", difficulty: "beginner" },
    { id: "true-blue", term: "True blue", meaning: "Genuinely Australian / Loyal", example: "He's a true blue Aussie.", category: "people", difficulty: "intermediate" },
    { id: "bogan", term: "Bogan", meaning: "Uncultured person (similar to redneck)", example: "Check out the mullet on that bogan.", category: "people", difficulty: "intermediate" },
    { id: "larrikin", term: "Larrikin", meaning: "Mischievous but good-natured person", example: "He's a bit of a larrikin, always joking around.", category: "people", difficulty: "advanced" },
    { id: "drongo", term: "Drongo", meaning: "Idiot / Stupid person", example: "Don't be such a drongo, mate!", category: "people", difficulty: "intermediate" },
    { id: "dag", term: "Dag", meaning: "Silly but endearing person / Nerd", example: "You're such a dag, I love it!", category: "people", difficulty: "intermediate" },
    { id: "old-fella", term: "Old fella", meaning: "Father / Elderly man", example: "My old fella taught me to fish.", category: "people", difficulty: "intermediate" },
    { id: "old-girl", term: "Old girl", meaning: "Mother / Elderly woman", example: "The old girl makes the best pavlova.", category: "people", difficulty: "intermediate" },
    { id: "battler", term: "Battler", meaning: "Someone who works hard despite difficulties", example: "He's a real battler, never gives up.", category: "people", difficulty: "intermediate" },
    { id: "bludger", term: "Bludger", meaning: "Lazy person / Someone who avoids work", example: "Stop being a bludger and help out!", category: "people", difficulty: "intermediate" },
    { id: "stickybeak", term: "Stickybeak", meaning: "Nosy person", example: "Don't be such a stickybeak!", category: "people", difficulty: "intermediate" },
    { id: "ratbag", term: "Ratbag", meaning: "Mischievous person / Troublemaker", example: "He's a bit of a ratbag, that one.", category: "people", difficulty: "intermediate" },
    { id: "yobbo", term: "Yobbo", meaning: "Uncouth / Unruly person", example: "Those yobbos were causing trouble at the pub.", category: "people", difficulty: "intermediate" },
    { id: "hoon", term: "Hoon", meaning: "Reckless driver / Troublemaker", example: "Those hoons were speeding down the street.", category: "people", difficulty: "intermediate" },
    { id: "sook", term: "Sook", meaning: "Someone who complains a lot / Crybaby", example: "Stop being such a sook, mate!", category: "people", difficulty: "intermediate", termPronunciation: "Sook" },
    { id: "bushie", term: "Bushie", meaning: "Country person / Someone from rural areas", example: "He's a bushie, grew up on a station.", category: "people", difficulty: "intermediate", termPronunciation: "Bush-ee" },
    { id: "tradie", term: "Tradie", meaning: "Tradesperson (plumber, electrician, etc.)", example: "The tradie fixed our plumbing yesterday.", category: "people", difficulty: "beginner", termPronunciation: "Tradie" },
    { id: "postie", term: "Postie", meaning: "Postal worker / Mail carrier", example: "The postie just delivered a parcel.", category: "people", difficulty: "beginner", termPronunciation: "Post-ee" },
    { id: "garbo", term: "Garbo", meaning: "Garbage collector", example: "The garbo comes every Tuesday.", category: "people", difficulty: "intermediate", termPronunciation: "Garbo" },
    { id: "ambo", term: "Ambo", meaning: "Ambulance / Paramedic", example: "Call an ambo, quick!", category: "people", difficulty: "intermediate", termPronunciation: "Ambo" },
    { id: "muso", term: "Muso", meaning: "Musician", example: "He's a talented muso, plays in a band.", category: "people", difficulty: "intermediate", termPronunciation: "Mew-zoh" },
    { id: "ranga", term: "Ranga", meaning: "Redhead (from orangutan)", example: "He's a ranga, burns in five minutes.", category: "people", difficulty: "intermediate", termPronunciation: "Rang-a" },
    { id: "sparky", term: "Sparky", meaning: "Electrician", example: "Get a sparky to look at the wiring.", category: "people", difficulty: "intermediate" },
    { id: "chippy", term: "Chippy", meaning: "Carpenter", example: "The chippy's coming to fix the deck.", category: "people", difficulty: "intermediate" },
    { id: "brickie", term: "Brickie", meaning: "Bricklayer", example: "My brother's a brickie, works hard.", category: "people", difficulty: "intermediate" },
    { id: "truckie", term: "Truckie", meaning: "Truck driver", example: "The truckies keep the country running.", category: "people", difficulty: "intermediate" },
    { id: "cabbie", term: "Cabbie", meaning: "Taxi driver", example: "The cabbie knew all the shortcuts.", category: "people", difficulty: "intermediate" },
    { id: "firey", term: "Firey", meaning: "Firefighter", example: "The fireys got there in five minutes.", category: "people", difficulty: "intermediate", termPronunciation: "Fire-ee" },
    { id: "old-mate", term: "Old mate", meaning: "Someone you're referring to", example: "Old mate over there is causing a scene.", category: "people", difficulty: "intermediate" },
    { id: "galah", term: "Galah", meaning: "Silly person (like the noisy bird)", example: "Don't be such a galah!", category: "people", difficulty: "intermediate" },

    // ============================================
    // FOOD & DRINK
    // ============================================
    { id: "snag", term: "Snag", meaning: "Sausage", example: "Chuck a few snags on the barbie.", category: "food", difficulty: "beginner", termPronunciation: "Snag" },
    { id: "barbie", term: "Barbie", meaning: "Barbecue", example: "We're having a barbie this Saturday.", category: "food", difficulty: "beginner" },
    { id: "esky", term: "Esky", meaning: "Cooler / Ice box", example: "The drinks are in the esky.", category: "food", difficulty: "beginner", termPronunciation: "Esky" },
    { id: "brekkie", term: "Brekkie", meaning: "Breakfast", example: "Let's meet for brekkie at nine.", category: "food", difficulty: "beginner", termPronunciation: "Brek-ee" },
    { id: "sanga", term: "Sanga", meaning: "Sandwich", example: "I made a vegemite sanga for lunch.", category: "food", difficulty: "intermediate", termPronunciation: "Sang-a" },
    { id: "chook", term: "Chook", meaning: "Chicken", example: "I'll pick up a roast chook for dinner.", category: "food", difficulty: "intermediate", termPronunciation: "Chook" },
    { id: "cuppa", term: "Cuppa", meaning: "Cup of tea or coffee", example: "Come in and have a cuppa.", category: "food", difficulty: "beginner", termPronunciation: "Cup-pa" },
    { id: "long-black", term: "Long black", meaning: "Double espresso with hot water", example: "I'll have a long black, thanks.", category: "food", difficulty: "beginner" },
    { id: "flat-white", term: "Flat white", meaning: "Espresso with steamed milk", example: "Can I get a flat white, thanks?", category: "food", difficulty: "beginner" },
    { id: "coldie", term: "Coldie", meaning: "Cold beer", example: "Grab us a coldie from the esky.", category: "food", difficulty: "intermediate", termPronunciation: "Coldie" },
    { id: "tinnie", term: "Tinnie", meaning: "Can of beer / Small aluminum boat", example: "Pass us a tinnie from the esky.", category: "food", difficulty: "intermediate", termPronunciation: "Tinny" },
    { id: "stubby", term: "Stubby", meaning: "Small bottle of beer", example: "Grab a stubby and come sit down.", category: "food", difficulty: "intermediate", termPronunciation: "Stubby" },
    { id: "slab", term: "Slab", meaning: "24-pack of beer", example: "Grab a slab from the bottle-o.", category: "food", difficulty: "intermediate" },
    { id: "stubby-holder", term: "Stubby holder", meaning: "Insulated drink holder / Koozie", example: "Use a stubby holder to keep your beer cold.", category: "food", difficulty: "intermediate" },
    { id: "grog", term: "Grog", meaning: "Alcohol / Booze", example: "We need to get some grog for the party.", category: "food", difficulty: "intermediate" },
    { id: "plonk", term: "Plonk", meaning: "Cheap wine", example: "Just grab some plonk from the bottle-o.", category: "food", difficulty: "advanced" },
    { id: "bikkie", term: "Bikkie", meaning: "Biscuit / Cookie", example: "Want a bikkie with your tea?", category: "food", difficulty: "intermediate", termPronunciation: "Bikky" },
    { id: "choccy", term: "Choccy", meaning: "Chocolate", example: "I could really go for some choccy right now.", category: "food", difficulty: "intermediate", termPronunciation: "Chock-ee" },
    { id: "lollies", term: "Lollies", meaning: "Candy / Sweets", example: "The kids want lollies from the shop.", category: "food", difficulty: "beginner" },
    { id: "fairy-floss", term: "Fairy floss", meaning: "Cotton candy", example: "Let's get some fairy floss at the show.", category: "food", difficulty: "intermediate" },
    { id: "avo", term: "Avo", meaning: "Avocado", example: "Smashed avo on toast is a classic brekkie.", category: "food", difficulty: "beginner", termPronunciation: "Avvo" },
    { id: "capsicum", term: "Capsicum", meaning: "Bell pepper", example: "Add some capsicum to the salad.", category: "food", difficulty: "beginner" },
    { id: "prawns", term: "Prawns", meaning: "Shrimp (never call them shrimp in Australia!)", example: "Chuck some prawns on the barbie.", category: "food", difficulty: "beginner" },
    { id: "parmi", term: "Parmi", meaning: "Chicken parmigiana", example: "I'll grab a parmi and a beer at the pub.", category: "food", difficulty: "beginner", termPronunciation: "Parmy" },
    { id: "schnitty", term: "Schnitty", meaning: "Schnitzel", example: "Tuesday's schnitty night at the local.", category: "food", difficulty: "beginner" },
    { id: "bevvies", term: "Bevvies", meaning: "Beverages / Drinks", example: "Let's grab some bevvies after work.", category: "food", difficulty: "intermediate", termPronunciation: "Bevvies" },
    { id: "tucker", term: "Tucker", meaning: "Food in general", example: "Let's grab some tucker, I'm starving.", category: "food", difficulty: "beginner" },
    { id: "spag-bol", term: "Spag bol", meaning: "Spaghetti bolognese", example: "Mum's making spag bol for dinner.", category: "food", difficulty: "beginner" },
    { id: "goon", term: "Goon", meaning: "Cheap boxed wine", example: "We drank goon at the party.", category: "food", difficulty: "intermediate" },
    { id: "pot", term: "Pot", meaning: "Small beer glass (VIC)", example: "I'll grab a pot at the pub.", category: "food", difficulty: "intermediate" },
    { id: "schooner", term: "Schooner", meaning: "Medium beer glass (NSW/QLD)", example: "Make it a schooner, thanks.", category: "food", difficulty: "intermediate", termPronunciation: "Skoo-ner" },
    { id: "icy-pole", term: "Icy pole", meaning: "Ice lolly / Popsicle", example: "Grab us an icy pole from the servo.", category: "food", difficulty: "beginner" },

    // ============================================
    // ACTIONS & VERBS
    // ============================================
    { id: "chuck", term: "Chuck", meaning: "Throw / Put", example: "Chuck your bag in the back.", category: "actions", difficulty: "beginner", termPronunciation: "Chuck" },
    { id: "reckon", term: "Reckon", meaning: "Think / Believe", example: "I reckon it's gonna rain today.", category: "actions", difficulty: "beginner" },
    { id: "rock-up", term: "Rock up", meaning: "Arrive / Show up", example: "What time did you rock up to the party?", category: "actions", difficulty: "beginner" },
    { id: "knock-off", term: "Knock off", meaning: "Finish work", example: "What time do you knock off?", category: "actions", difficulty: "beginner" },
    { id: "chuck-a-uey", term: "Chuck a U-ey", meaning: "Make a U-turn", example: "Missed the turn, chuck a U-ey here.", category: "actions", difficulty: "intermediate", termPronunciation: "Chuck a you-ee" },
    { id: "chuck-a-sickie", term: "Chuck a sickie", meaning: "Take a sick day (often when not actually sick)", example: "I'm chucking a sickie tomorrow for the beach.", category: "actions", difficulty: "intermediate" },
    { id: "skull", term: "Skull", meaning: "Drink quickly in one go", example: "He skulled his beer in ten seconds flat.", category: "actions", difficulty: "intermediate" },
    { id: "crack-a-tinnie", term: "Crack a tinnie", meaning: "Open a can of beer", example: "Let's crack a tinnie and watch the footy.", category: "actions", difficulty: "intermediate" },
    { id: "yarn", term: "Have a yarn", meaning: "Have a chat / conversation", example: "Come over and we'll have a yarn.", category: "actions", difficulty: "intermediate" },
    { id: "sus-out", term: "Sus out", meaning: "Figure out / Investigate", example: "Let me sus out what's going on.", category: "actions", difficulty: "intermediate" },
    { id: "take-a-squiz", term: "Take a squiz", meaning: "Take a look", example: "Can you take a squiz at this for me?", category: "actions", difficulty: "intermediate" },
    { id: "go-walkabout", term: "Go walkabout", meaning: "Wander off / Disappear", example: "The cat's gone walkabout again.", category: "actions", difficulty: "intermediate" },
    { id: "doing-a-runner", term: "Do a runner", meaning: "Leave quickly / Escape without paying", example: "They did a runner from the restaurant!", category: "actions", difficulty: "intermediate" },
    { id: "pull-a-swifty", term: "Pull a swifty", meaning: "Trick or deceive someone", example: "He pulled a swifty and never paid me back.", category: "actions", difficulty: "intermediate" },
    { id: "having-a-whinge", term: "Have a whinge", meaning: "Complain / Moan", example: "Stop having a whinge and get on with it.", category: "actions", difficulty: "intermediate" },
    { id: "taking-the-piss", term: "Taking the piss", meaning: "Making fun of / Joking around", example: "Are you taking the piss or being serious?", category: "actions", difficulty: "intermediate" },
    { id: "chucking-a-wobbly", term: "Chuck a wobbly", meaning: "Have a tantrum / Get very angry", example: "Mum chucked a wobbly when she saw my report card.", category: "actions", difficulty: "advanced" },
    { id: "spit-the-dummy", term: "Spit the dummy", meaning: "Throw a tantrum / Get very upset", example: "He spat the dummy when they cancelled his flight.", category: "actions", difficulty: "advanced" },
    { id: "rack-off", term: "Rack off", meaning: "Go away / Get lost", example: "Rack off, I'm busy!", category: "actions", difficulty: "intermediate" },
    { id: "arcing-up", term: "Arcing up", meaning: "Getting angry / Aggressive", example: "Don't go arcing up at me!", category: "actions", difficulty: "advanced" },
    { id: "spit-chips", term: "Spit chips", meaning: "Be very angry", example: "She'll spit chips when she finds out.", category: "actions", difficulty: "advanced" },
    { id: "hard-yakka", term: "Hard yakka", meaning: "Hard work", example: "Building that deck was hard yakka.", category: "actions", difficulty: "intermediate", termPronunciation: "Hard yakka" },
    { id: "footy", term: "Footy", meaning: "Football (AFL/NRL/Rugby)", example: "Are you watching the footy this weekend?", category: "actions", difficulty: "beginner" },
    { id: "shout", term: "Shout", meaning: "Buy a round of drinks", example: "It's my shout, what are you having?", category: "actions", difficulty: "beginner" },
    { id: "bail", term: "Bail", meaning: "Leave suddenly", example: "I'm gonna bail, it's getting late.", category: "actions", difficulty: "beginner" },
    { id: "have-a-gander", term: "Have a gander", meaning: "Have a look", example: "Have a gander at this!", category: "actions", difficulty: "intermediate" },

    // ============================================
    // DESCRIPTIVE / ADJECTIVES
    // ============================================
    { id: "heaps", term: "Heaps", meaning: "A lot / Very", example: "That movie was heaps good!", category: "descriptive", difficulty: "beginner" },
    { id: "bloody", term: "Bloody", meaning: "Very (intensifier, mild expletive)", example: "It's bloody hot today!", category: "descriptive", difficulty: "beginner" },
    { id: "stoked", term: "Stoked", meaning: "Very happy / Excited", example: "I'm stoked about the concert next week!", category: "descriptive", difficulty: "beginner" },
    { id: "chockers", term: "Chockers", meaning: "Completely full / Packed", example: "The train was chockers this morning.", category: "descriptive", difficulty: "intermediate", termPronunciation: "Chock-ers" },
    { id: "chock-a-block", term: "Chock-a-block", meaning: "Completely full", example: "The car park was chock-a-block.", category: "descriptive", difficulty: "intermediate" },
    { id: "slammed", term: "Slammed", meaning: "Very busy", example: "I'm totally slammed at work this week.", category: "descriptive", difficulty: "intermediate" },
    { id: "flat-out", term: "Flat out", meaning: "Very busy / At maximum speed", example: "I've been flat out at work all week.", category: "descriptive", difficulty: "intermediate" },
    { id: "knackered", term: "Knackered", meaning: "Exhausted / Very tired", example: "I'm absolutely knackered after that hike.", category: "descriptive", difficulty: "intermediate" },
    { id: "stuffed", term: "Stuffed", meaning: "Broken / Exhausted / Full from eating", example: "The TV's stuffed, we need a new one.", category: "descriptive", difficulty: "intermediate" },
    { id: "wrecked", term: "Wrecked", meaning: "Very drunk or exhausted", example: "I was absolutely wrecked after the party.", category: "descriptive", difficulty: "intermediate" },
    { id: "pissed", term: "Pissed", meaning: "Drunk (not angry like in US)", example: "He got absolutely pissed at the party.", category: "descriptive", difficulty: "intermediate" },
    { id: "pissed-off", term: "Pissed off", meaning: "Angry / Annoyed", example: "I'm pissed off about the delay.", category: "descriptive", difficulty: "intermediate" },
    { id: "buggered", term: "Buggered", meaning: "Exhausted / Broken", example: "I'm absolutely buggered after that shift.", category: "descriptive", difficulty: "intermediate" },
    { id: "legless", term: "Legless", meaning: "Extremely drunk", example: "He was legless by midnight.", category: "descriptive", difficulty: "intermediate" },
    { id: "cooked", term: "Cooked", meaning: "Exhausted / Wrecked / Crazy", example: "That exam was cooked.", category: "descriptive", difficulty: "intermediate" },
    { id: "going-off", term: "Going off", meaning: "Really busy / Wild / Exciting", example: "The party was absolutely going off!", category: "descriptive", difficulty: "intermediate" },
    { id: "dodgy", term: "Dodgy", meaning: "Suspicious / Poor quality", example: "That kebab shop looks a bit dodgy.", category: "descriptive", difficulty: "intermediate" },
    { id: "suss", term: "Suss", meaning: "Suspicious / Suspect", example: "That deal sounds a bit suss to me.", category: "descriptive", difficulty: "intermediate" },
    { id: "bodgy", term: "Bodgy", meaning: "Poor quality / Badly made", example: "That's a bodgy repair job, that is.", category: "descriptive", difficulty: "advanced" },
    { id: "cactus", term: "Cactus", meaning: "Broken / Not working", example: "My phone's cactus, I need a new one.", category: "descriptive", difficulty: "intermediate" },
    { id: "bung", term: "Bung", meaning: "Broken / Not working", example: "The TV's gone bung again.", category: "descriptive", difficulty: "intermediate" },
    { id: "crook", term: "Crook", meaning: "Sick or broken", example: "I'm feeling a bit crook today.", category: "descriptive", difficulty: "intermediate" },
    { id: "wonky", term: "Wonky", meaning: "Unsteady / Not quite right", example: "This table leg is a bit wonky.", category: "descriptive", difficulty: "intermediate" },
    { id: "daggy", term: "Daggy", meaning: "Unfashionable / Dorky but endearing", example: "That outfit is a bit daggy.", category: "descriptive", difficulty: "intermediate", termPronunciation: "Daggy" },
    { id: "feral", term: "Feral", meaning: "Wild / Uncivilised", example: "Those kids are completely feral.", category: "descriptive", difficulty: "intermediate" },
    { id: "bonkers", term: "Bonkers", meaning: "Crazy / Insane", example: "The traffic today was absolutely bonkers.", category: "descriptive", difficulty: "intermediate" },
    { id: "aggro", term: "Aggro", meaning: "Aggressive / Angry", example: "Don't get aggro with me!", category: "descriptive", difficulty: "intermediate", termPronunciation: "Agro" },
    { id: "spewin", term: "Spewin'", meaning: "Very upset / Angry", example: "I was spewin' when I lost my wallet.", category: "descriptive", difficulty: "intermediate", termPronunciation: "Spewin" },
    { id: "devo", term: "Devo", meaning: "Devastated", example: "I was devo when they cancelled the concert.", category: "descriptive", difficulty: "intermediate", termPronunciation: "Devvo" },
    { id: "deadset", term: "Deadset", meaning: "Absolutely / Completely true", example: "That's deadset the best pie I've ever had.", category: "descriptive", difficulty: "intermediate" },
    { id: "mad", term: "Mad", meaning: "Great / Awesome (not angry)", example: "That party was mad!", category: "descriptive", difficulty: "intermediate", termPronunciation: "Mad" },

    // ============================================
    // THINGS & OBJECTS
    // ============================================
    { id: "thongs", term: "Thongs", meaning: "Flip-flops (NOT underwear!)", example: "Wear your thongs to the beach.", category: "things", difficulty: "beginner", termPronunciation: "Thongs" },
    { id: "sunnies", term: "Sunnies", meaning: "Sunglasses", example: "Don't forget your sunnies, it's bright out.", category: "things", difficulty: "beginner", termPronunciation: "Sun-eez" },
    { id: "trackies", term: "Trackies", meaning: "Tracksuit pants / Sweatpants", example: "I'm just lounging around in my trackies today.", category: "things", difficulty: "beginner", termPronunciation: "Track-eez" },
    { id: "daks", term: "Daks", meaning: "Pants / Trousers", example: "Your daks are on inside out, mate.", category: "things", difficulty: "intermediate" },
    { id: "runners", term: "Runners", meaning: "Running shoes / Sneakers", example: "Grab your runners, we're going for a jog.", category: "things", difficulty: "beginner" },
    { id: "cossie", term: "Cossie", meaning: "Swimming costume (NSW)", example: "Don't forget your cossie for the beach.", category: "things", difficulty: "intermediate", termPronunciation: "Coz-ee" },
    { id: "togs", term: "Togs", meaning: "Swimming costume (QLD)", example: "Pack your togs, we're going to the pool.", category: "things", difficulty: "intermediate" },
    { id: "bathers", term: "Bathers", meaning: "Swimming costume (VIC)", example: "I need to buy new bathers for summer.", category: "things", difficulty: "intermediate", termPronunciation: "Baythers" },
    { id: "ute", term: "Ute", meaning: "Utility vehicle / Pickup truck", example: "He's got all his tools in the back of his ute.", category: "things", difficulty: "beginner", termPronunciation: "Yoot" },
    { id: "akubra", term: "Akubra", meaning: "Wide-brimmed hat", example: "He wore his Akubra in the outback.", category: "things", difficulty: "intermediate", termPronunciation: "Akubra" },
    { id: "swag", term: "Swag", meaning: "Camping bedroll / Sleeping bag", example: "We rolled out our swags under the stars.", category: "things", difficulty: "intermediate", termPronunciation: "Swag" },
    { id: "booze-bus", term: "Booze bus", meaning: "Police breath-testing van", example: "Watch out, there's a booze bus ahead.", category: "things", difficulty: "intermediate" },
    { id: "road-train", term: "Road train", meaning: "Large truck with multiple trailers", example: "Watch out for road trains in the outback.", category: "things", difficulty: "intermediate" },
    { id: "roo-bar", term: "Roo bar", meaning: "Bull bar on a vehicle", example: "Good thing I had a roo bar, I hit a roo last night.", category: "things", difficulty: "intermediate", termPronunciation: "Roo bar" },
    { id: "rego", term: "Rego", meaning: "Vehicle registration", example: "My rego is due next month.", category: "things", difficulty: "beginner", termPronunciation: "Rego" },
    { id: "ciggie", term: "Ciggie", meaning: "Cigarette", example: "He went outside for a ciggie.", category: "things", difficulty: "intermediate", termPronunciation: "Sig-ee" },
    { id: "prezzie", term: "Prezzie", meaning: "Present / Gift", example: "I got some great Chrissie prezzies!", category: "things", difficulty: "intermediate", termPronunciation: "Prez-ee" },
    { id: "chrissie", term: "Chrissie", meaning: "Christmas", example: "What are your plans for Chrissie?", category: "things", difficulty: "intermediate", termPronunciation: "Chris-ee" },
    { id: "rello", term: "Rello", meaning: "Relative", example: "We're visiting the rellos this weekend.", category: "things", difficulty: "intermediate", termPronunciation: "Rello" },
    { id: "doco", term: "Doco", meaning: "Documentary", example: "There's a good doco on SBS tonight.", category: "things", difficulty: "intermediate", termPronunciation: "Dock-oh" },
    { id: "facey", term: "Facey", meaning: "Facebook", example: "Did you see the photos on Facey?", category: "things", difficulty: "intermediate", termPronunciation: "Face-ee" },
    { id: "byo", term: "BYO", meaning: "Bring your own (usually alcohol)", example: "It's a BYO barbie, bring your own drinks.", category: "things", difficulty: "beginner", termPronunciation: "B Y O" },

    // ============================================
    // MONEY
    // ============================================
    { id: "bucks", term: "Bucks", meaning: "Dollars", example: "That'll be twenty bucks.", category: "money", difficulty: "beginner" },
    { id: "pineapple", term: "Pineapple", meaning: "$50 note (yellow colour)", example: "Can you break a pineapple for me?", category: "money", difficulty: "intermediate" },
    { id: "lobster", term: "Lobster", meaning: "$20 note (red colour)", example: "Just grabbed a lobster from the ATM.", category: "money", difficulty: "intermediate" },
    { id: "big-bikkies", term: "Big bikkies", meaning: "A lot of money / Expensive", example: "That car cost big bikkies.", category: "money", difficulty: "intermediate" },
    { id: "mates-rates", term: "Mates rates", meaning: "Discount for friends", example: "He gave me mates rates on the job.", category: "money", difficulty: "beginner" },

    // ============================================
    // WILDLIFE & NATURE
    // ============================================
    { id: "mozzie", term: "Mozzie", meaning: "Mosquito", example: "The mozzies are terrible tonight!", category: "wildlife", difficulty: "beginner", termPronunciation: "Mozzy" },
    { id: "roo", term: "Roo", meaning: "Kangaroo", example: "Watch out for roos on the road at night.", category: "wildlife", difficulty: "beginner", termPronunciation: "Roo" },
    { id: "cocky", term: "Cocky", meaning: "Cockatoo", example: "The cockies are making a racket this morning.", category: "wildlife", difficulty: "intermediate", termPronunciation: "Cocky" },
    { id: "croc", term: "Croc", meaning: "Crocodile", example: "Don't swim there, there's crocs!", category: "wildlife", difficulty: "beginner" },
    { id: "drop-bear", term: "Drop bear", meaning: "Fictional dangerous koala (joke for tourists)", example: "Watch out for drop bears!", category: "wildlife", difficulty: "intermediate" },

    // ============================================
    // COLORFUL EXPRESSIONS
    // ============================================
    { id: "going-off-frog", term: "Going off like a frog in a sock", meaning: "Very excited / Energetic", example: "The kids were going off like frogs in a sock.", category: "expressions", difficulty: "advanced" },
    { id: "few-roos-loose", term: "Few roos loose in the top paddock", meaning: "A bit crazy / Not all there", example: "He's got a few roos loose in the top paddock.", category: "expressions", difficulty: "advanced" },
    { id: "flat-out-lizard", term: "Flat out like a lizard drinking", meaning: "Extremely busy", example: "I've been flat out like a lizard drinking all week.", category: "expressions", difficulty: "advanced" },
    { id: "happy-as-larry", term: "Happy as Larry", meaning: "Very happy", example: "Give him a beer and he's happy as Larry.", category: "expressions", difficulty: "intermediate" },
    { id: "dogs-breakfast", term: "Dog's breakfast", meaning: "A mess / Disaster", example: "This project has turned into a dog's breakfast.", category: "expressions", difficulty: "advanced" },
    { id: "up-the-creek", term: "Up the creek without a paddle", meaning: "In big trouble", example: "If we miss this deadline, we're up the creek.", category: "expressions", difficulty: "intermediate" },
    { id: "built-like-brick-shithouse", term: "Built like a brick shithouse", meaning: "Very solidly built", example: "That rugby player is built like a brick shithouse.", category: "expressions", difficulty: "advanced" },
    { id: "tell-him-dreaming", term: "Tell him he's dreaming", meaning: "That's unrealistic / No way", example: "He wants how much? Tell him he's dreaming!", category: "expressions", difficulty: "intermediate" },
    { id: "not-my-cup-of-tea", term: "Not my cup of tea", meaning: "Not my preference / Not my thing", example: "Cricket's not really my cup of tea.", category: "expressions", difficulty: "intermediate" },
    { id: "few-sandwiches-short", term: "A few sandwiches short of a picnic", meaning: "Not very smart", example: "He's a few sandwiches short of a picnic.", category: "expressions", difficulty: "advanced" },
    { id: "all-over-the-shop", term: "All over the shop", meaning: "Disorganised / Chaotic", example: "His presentation was all over the shop.", category: "expressions", difficulty: "intermediate" }
];

// Get unique categories from the data
const categories = [...new Set(slangData.map(item => item.category))];

// Get unique difficulty levels
const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

// Difficulty display names
const difficultyNames = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
};

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
    things: "Things & Objects",
    money: "Money",
    wildlife: "Wildlife",
};

// Auto-generate sentence templates from slangData
// Creates fill-in-the-blank sentences using each term's example
const sentenceTemplates = slangData.map(item => {
    // Escape special regex characters in the term
    const escapedTerm = item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace the term with ___ (case-insensitive, first occurrence only)
    const regex = new RegExp(escapedTerm, 'i');
    const sentence = item.example.replace(regex, '___');
    return {
        sentence: sentence,
        answer: item.term,
        hint: item.meaning,
        id: item.id
    };
}).filter(template => {
    // Only include valid templates with exactly one blank
    const blankCount = (template.sentence.match(/___/g) || []).length;
    return blankCount === 1;
});

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { slangData, categories, difficultyLevels, difficultyNames, categoryNames, sentenceTemplates };
}
