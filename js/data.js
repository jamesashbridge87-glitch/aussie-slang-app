// Aussie Slang Database - Updated & Expanded
// Difficulty levels: beginner (common), intermediate (regular), advanced (obscure/colorful)
// Reviewed and cleaned - removed outdated phrases and swearing
// Emotion tags for Fish.audio TTS

const slangData = [
    // ============================================
    // GREETINGS & COMMON EXPRESSIONS
    // ============================================
    { id: "gday", term: "G'day", meaning: "Hello / Good day", example: "G'day mate, how ya going?", category: "greetings", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(happy)", termPronunciation: "Gidday" },
    { id: "howya-going", term: "How ya going?", meaning: "How are you?", example: "Hey Sarah, how ya going?", category: "greetings", difficulty: "beginner", termEmotion: "(friendly)", exampleEmotion: "(friendly)" },
    { id: "no-worries", term: "No worries", meaning: "No problem / You're welcome", example: "Thanks for the lift! — No worries, mate.", category: "expressions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "no-wuckas", term: "No wuckas", meaning: "No worries (shortened slang)", example: "Can you help me move? — No wuckas, mate.", category: "expressions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "No wuckers" },
    { id: "no-dramas", term: "No dramas", meaning: "No problem / All good", example: "Sorry I'm late. — No dramas!", category: "expressions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "shes-right", term: "She'll be right", meaning: "Everything will be okay", example: "Don't stress about the exam, she'll be right.", category: "expressions", difficulty: "beginner", termEmotion: "(confident)(relaxed)", exampleEmotion: "(reassuring)" },
    { id: "shes-apples", term: "She's apples", meaning: "Everything is fine", example: "How's the car running? — She's apples!", category: "expressions", difficulty: "intermediate", termEmotion: "(satisfied)", exampleEmotion: "(satisfied)" },
    { id: "too-easy", term: "Too easy", meaning: "No problem / Consider it done", example: "Can you grab me a coffee? — Too easy!", category: "expressions", difficulty: "beginner", termEmotion: "(confident)", exampleEmotion: "(confident)" },
    { id: "sweet-as", term: "Sweet as", meaning: "Cool / No problem / Great", example: "You need a lift? Sweet as.", category: "expressions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "good-as-gold", term: "Good as gold", meaning: "All good / Fine", example: "Everything's good as gold.", category: "expressions", difficulty: "intermediate", termEmotion: "(satisfied)", exampleEmotion: "(satisfied)" },
    { id: "cheers", term: "Cheers", meaning: "Thanks / Goodbye", example: "Cheers for helping me move!", category: "greetings", difficulty: "beginner", termEmotion: "(grateful)", exampleEmotion: "(grateful)" },
    { id: "ta", term: "Ta", meaning: "Thank you", example: "Ta for the cuppa!", category: "greetings", difficulty: "beginner", termEmotion: "(grateful)", exampleEmotion: "(grateful)(happy)" },
    { id: "hooroo", term: "Hooroo", meaning: "Goodbye (old-fashioned)", example: "Hooroo mate, see ya tomorrow!", category: "greetings", difficulty: "advanced", termEmotion: "(happy)", exampleEmotion: "(happy)", termPronunciation: "Hoo-roo" },
    { id: "see-ya", term: "See ya", meaning: "Goodbye", example: "See ya tomorrow, mate!", category: "greetings", difficulty: "beginner", termEmotion: "(friendly)", exampleEmotion: "(friendly)" },
    { id: "catch-ya", term: "Catch ya", meaning: "See you later", example: "Catch ya on the weekend!", category: "greetings", difficulty: "beginner", termEmotion: "(friendly)", exampleEmotion: "(friendly)" },
    { id: "good-onya", term: "Good onya", meaning: "Good for you / Well done", example: "You got the job? Good onya!", category: "expressions", difficulty: "beginner", termEmotion: "(proud)", exampleEmotion: "(excited)(proud)", termPronunciation: "Good on ya" },
    { id: "yeah-nah", term: "Yeah, nah", meaning: "No (polite disagreement)", example: "Want another beer? — Yeah, nah, I'm driving.", category: "expressions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Yeah nah" },
    { id: "nah-yeah", term: "Nah, yeah", meaning: "Yes (casual agreement)", example: "Are you coming to the party? — Nah, yeah, I'll be there.", category: "expressions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "oath", term: "Oath", meaning: "Yes, absolutely (affirmation)", example: "Are you coming? — Oath!", category: "expressions", difficulty: "intermediate", termEmotion: "(confident)", exampleEmotion: "(confident)(excited)", termPronunciation: "Oeth" },
    { id: "fair-go", term: "Fair go", meaning: "Give someone a chance / Be reasonable", example: "Give me a fair go, mate!", category: "expressions", difficulty: "beginner", termEmotion: "(determined)", exampleEmotion: "(frustrated)" },
    { id: "oi", term: "Oi", meaning: "Hey! / Attention getter", example: "Oi! Over here!", category: "expressions", difficulty: "beginner", termEmotion: "(shouting)", exampleEmotion: "(shouting)(excited)", termPronunciation: "Oy" },

    // ============================================
    // TIME & PLACE
    // ============================================
    { id: "arvo", term: "Arvo", meaning: "Afternoon", example: "I'll see you this arvo at the pub.", category: "time", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Arvo" },
    { id: "yonks", term: "Yonks", meaning: "A very long time", example: "I haven't seen him in yonks!", category: "time", difficulty: "intermediate", termEmotion: "(surprised)", exampleEmotion: "(surprised)" },
    { id: "fortnight", term: "Fortnight", meaning: "Two weeks", example: "I'll be back in a fortnight.", category: "time", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "smoko", term: "Smoko", meaning: "Smoke break / Short work break", example: "I'll finish this after smoko.", category: "time", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Smoke-oh" },

    { id: "servo", term: "Servo", meaning: "Service station / Gas station", example: "Pull into the servo, we need petrol.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Serv-oh" },
    { id: "bottle-o", term: "Bottle-o", meaning: "Liquor store / Bottle shop", example: "I'll grab some beers from the bottle-o.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(happy)", termPronunciation: "Bottlo" },
    { id: "maccas", term: "Maccas", meaning: "McDonald's", example: "Let's hit up Maccas for a feed.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(excited)" },
    { id: "woolies", term: "Woolies", meaning: "Woolworths supermarket", example: "I need to pop into Woolies for milk.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "coles", term: "Coles", meaning: "Coles supermarket", example: "Coles has the specials on this week.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "bunnings", term: "Bunnings", meaning: "Hardware store (famous for sausage sizzles)", example: "Let's go to Bunnings for a snag and some screws.", category: "places", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(excited)", termPronunciation: "Bunnings" },
    { id: "woop-woop", term: "Woop Woop", meaning: "Middle of nowhere / Remote area", example: "They live out in Woop Woop, hours from the city.", category: "places", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)", termPronunciation: "Woop Woop" },
    { id: "outback", term: "The Outback", meaning: "Remote inland Australia", example: "We're driving through the outback next week.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(excited)" },
    { id: "bush", term: "The Bush", meaning: "Rural/wilderness area", example: "He grew up in the bush, not the city.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "billabong", term: "Billabong", meaning: "Waterhole / Pond formed by river", example: "We went swimming in the billabong.", category: "places", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(happy)" },
    { id: "dunny", term: "Dunny", meaning: "Toilet (especially outdoor)", example: "Where's the dunny?", category: "places", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(curious)", termPronunciation: "Dunny" },
    { id: "loo", term: "Loo", meaning: "Toilet", example: "I need to use the loo.", category: "places", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Loo" },
    { id: "milkbar", term: "Milkbar", meaning: "Corner store (VIC/SA)", example: "I'm going to the milkbar for some lollies.", category: "places", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(happy)" },
    { id: "deli", term: "Deli", meaning: "Corner store (WA)", example: "The deli's just around the corner.", category: "places", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Deli" },

    // ============================================
    // PEOPLE
    // ============================================
    { id: "mate", term: "Mate", meaning: "Friend / Buddy (or anyone really)", example: "Thanks mate, you're a legend.", category: "people", difficulty: "beginner", termEmotion: "(friendly)", exampleEmotion: "(grateful)(happy)", termPronunciation: "Mayte" },
    { id: "bloke", term: "Bloke", meaning: "Man / Guy", example: "He's a good bloke, you'll like him.", category: "people", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(friendly)" },
    { id: "legend", term: "Legend", meaning: "Great person / Someone awesome", example: "You fixed my car? You're an absolute legend!", category: "people", difficulty: "beginner", termEmotion: "(impressed)", exampleEmotion: "(excited)(grateful)" },
    { id: "true-blue", term: "True blue", meaning: "Genuinely Australian / Loyal", example: "He's a true blue Aussie.", category: "people", difficulty: "intermediate", termEmotion: "(proud)", exampleEmotion: "(proud)" },
    { id: "bogan", term: "Bogan", meaning: "Uncultured person (similar to redneck)", example: "Check out the mullet on that bogan.", category: "people", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)(chuckling)" },
    { id: "larrikin", term: "Larrikin", meaning: "Mischievous but good-natured person", example: "He's a bit of a larrikin, always joking around.", category: "people", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(amused)(happy)" },
    { id: "drongo", term: "Drongo", meaning: "Idiot / Stupid person", example: "Don't be such a drongo!", category: "people", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "dag", term: "Dag", meaning: "Silly but endearing person / Nerd", example: "You're such a dag!", category: "people", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)(affectionate)" },
    { id: "ankle-biter", term: "Ankle biter", meaning: "Small child / Toddler", example: "She's got three ankle biters running around.", category: "people", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)" },
    { id: "old-fella", term: "Old fella", meaning: "Father / Elderly man", example: "My old fella taught me to fish.", category: "people", difficulty: "intermediate", termEmotion: "(affectionate)", exampleEmotion: "(nostalgic)(happy)" },
    { id: "old-girl", term: "Old girl", meaning: "Mother / Elderly woman", example: "The old girl makes the best pavlova.", category: "people", difficulty: "intermediate", termEmotion: "(affectionate)", exampleEmotion: "(happy)(proud)" },
    { id: "battler", term: "Battler", meaning: "Someone who works hard despite difficulties", example: "He's a real battler, never gives up.", category: "people", difficulty: "intermediate", termEmotion: "(empathetic)", exampleEmotion: "(proud)(empathetic)" },
    { id: "bludger", term: "Bludger", meaning: "Lazy person / Someone who avoids work", example: "Stop being a bludger and help out!", category: "people", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "stickybeak", term: "Stickybeak", meaning: "Nosy person", example: "Don't be such a stickybeak!", category: "people", difficulty: "intermediate", termEmotion: "(annoyed)", exampleEmotion: "(annoyed)" },
    { id: "ratbag", term: "Ratbag", meaning: "Mischievous person / Troublemaker", example: "He's a bit of a ratbag.", category: "people", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)" },
    { id: "yobbo", term: "Yobbo", meaning: "Uncouth / Unruly person", example: "Those yobbos were causing trouble at the pub.", category: "people", difficulty: "intermediate", termEmotion: "(disapproving)", exampleEmotion: "(disapproving)" },
    { id: "hoon", term: "Hoon", meaning: "Reckless driver / Troublemaker", example: "Those hoons were speeding down the street.", category: "people", difficulty: "intermediate", termEmotion: "(disapproving)", exampleEmotion: "(annoyed)" },
    { id: "sook", term: "Sook", meaning: "Someone who complains a lot / Crybaby", example: "Stop being such a sook!", category: "people", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)", termPronunciation: "Sook" },
    { id: "bushie", term: "Bushie", meaning: "Country person / Someone from rural areas", example: "He's a bushie, grew up on a station.", category: "people", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Bush-ee" },
    { id: "tradie", term: "Tradie", meaning: "Tradesperson (plumber, electrician, etc.)", example: "The tradie fixed our plumbing yesterday.", category: "people", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(satisfied)", termPronunciation: "Tradie" },
    { id: "postie", term: "Postie", meaning: "Postal worker / Mail carrier", example: "The postie just delivered a parcel.", category: "people", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(happy)", termPronunciation: "Post-ee" },
    { id: "garbo", term: "Garbo", meaning: "Garbage collector", example: "The garbo comes every Tuesday.", category: "people", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Garbo" },
    { id: "ambo", term: "Ambo", meaning: "Ambulance / Paramedic", example: "Call an ambo, quick!", category: "people", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(urgent)(in a hurry tone)", termPronunciation: "Ambo" },
    { id: "muso", term: "Muso", meaning: "Musician", example: "He's a talented muso, plays in a band.", category: "people", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(impressed)", termPronunciation: "Mew-zoh" },

    // ============================================
    // FOOD & DRINK
    // ============================================
    { id: "snag", term: "Snag", meaning: "Sausage", example: "Chuck a few snags on the barbie.", category: "food", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(happy)", termPronunciation: "Snag" },
    { id: "barbie", term: "Barbie", meaning: "Barbecue", example: "We're having a barbie this Saturday.", category: "food", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(excited)" },
    { id: "esky", term: "Esky", meaning: "Cooler / Ice box", example: "The drinks are in the esky.", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Esky" },
    { id: "brekkie", term: "Brekkie", meaning: "Breakfast", example: "Let's meet for brekkie at 9.", category: "food", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(friendly)", termPronunciation: "Brek-ee" },
    { id: "sanga", term: "Sanga", meaning: "Sandwich", example: "I made a vegemite sanga for lunch.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(satisfied)", termPronunciation: "Sang-a" },
    { id: "chook", term: "Chook", meaning: "Chicken", example: "I'll pick up a roast chook for dinner.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Chook" },
    { id: "cuppa", term: "Cuppa", meaning: "Cup of tea or coffee", example: "Come in and have a cuppa.", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(friendly)(warm)", termPronunciation: "Cup-pa" },
    { id: "long-black", term: "Long black", meaning: "Double espresso with hot water", example: "I'll have a long black, please.", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "flat-white", term: "Flat white", meaning: "Espresso with steamed milk", example: "Can I get a flat white?", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "coldie", term: "Coldie", meaning: "Cold beer", example: "Grab us a coldie from the esky.", category: "food", difficulty: "intermediate", termEmotion: "(satisfied)", exampleEmotion: "(relaxed)", termPronunciation: "Coldie" },
    { id: "tinnie", term: "Tinnie", meaning: "Can of beer / Small aluminum boat", example: "Pass us a tinnie from the esky.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Tinny" },
    { id: "stubby", term: "Stubby", meaning: "Small bottle of beer", example: "Grab a stubby and come sit down.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(friendly)", termPronunciation: "Stubby" },
    { id: "slab", term: "Slab", meaning: "24-pack of beer", example: "Grab a slab from the bottle-o.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(excited)" },
    { id: "stubby-holder", term: "Stubby holder", meaning: "Insulated drink holder / Koozie", example: "Use a stubby holder to keep your beer cold.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(helpful)" },
    { id: "grog", term: "Grog", meaning: "Alcohol / Booze", example: "We need to get some grog for the party.", category: "food", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(excited)" },
    { id: "plonk", term: "Plonk", meaning: "Cheap wine", example: "Just grab some plonk from the bottle-o.", category: "food", difficulty: "advanced", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "bikkie", term: "Bikkie", meaning: "Biscuit / Cookie", example: "Want a bikkie with your tea?", category: "food", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(friendly)", termPronunciation: "Bikky" },
    { id: "choccy", term: "Choccy", meaning: "Chocolate", example: "I could really go for some choccy right now.", category: "food", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(longing)", termPronunciation: "Chock-ee" },
    { id: "lollies", term: "Lollies", meaning: "Candy / Sweets", example: "The kids want lollies from the shop.", category: "food", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(happy)" },
    { id: "fairy-floss", term: "Fairy floss", meaning: "Cotton candy", example: "Let's get some fairy floss at the show.", category: "food", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(excited)" },
    { id: "avo", term: "Avo", meaning: "Avocado", example: "Smashed avo on toast is a classic brekkie.", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(satisfied)", termPronunciation: "Avvo" },
    { id: "capsicum", term: "Capsicum", meaning: "Bell pepper", example: "Add some capsicum to the salad.", category: "food", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "prawns", term: "Prawns", meaning: "Shrimp (never call them shrimp in Australia!)", example: "Chuck some prawns on the barbie.", category: "food", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(happy)" },
    { id: "dead-horse", term: "Dead horse", meaning: "Tomato sauce (rhyming slang)", example: "Pass the dead horse for my pie.", category: "food", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(relaxed)" },
    { id: "mystery-bag", term: "Mystery bag", meaning: "Sausage (you never know what's in it)", example: "I'll have a mystery bag from the sausage sizzle.", category: "food", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(happy)" },

    // ============================================
    // ACTIONS & VERBS
    // ============================================
    { id: "chuck", term: "Chuck", meaning: "Throw / Put", example: "Chuck your bag in the back.", category: "actions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Chuck" },
    { id: "reckon", term: "Reckon", meaning: "Think / Believe", example: "I reckon it's gonna rain today.", category: "actions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(thoughtful)" },
    { id: "rock-up", term: "Rock up", meaning: "Arrive / Show up", example: "What time did you rock up to the party?", category: "actions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(curious)" },
    { id: "knock-off", term: "Knock off", meaning: "Finish work", example: "What time do you knock off?", category: "actions", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(curious)" },
    { id: "chuck-a-uey", term: "Chuck a U-ey", meaning: "Make a U-turn", example: "Missed the turn, chuck a U-ey.", category: "actions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Chuck a you-ee" },
    { id: "chuck-a-sickie", term: "Chuck a sickie", meaning: "Take a sick day (often when not actually sick)", example: "I'm chucking a sickie tomorrow for the beach.", category: "actions", difficulty: "intermediate", termEmotion: "(sarcastic)", exampleEmotion: "(chuckling)(mischievous)" },
    { id: "skull", term: "Skull", meaning: "Drink quickly in one go", example: "He skulled his beer in 10 seconds.", category: "actions", difficulty: "intermediate", termEmotion: "(excited)", exampleEmotion: "(impressed)" },
    { id: "crack-a-tinnie", term: "Crack a tinnie", meaning: "Open a can of beer", example: "Let's crack a tinnie and watch the footy.", category: "actions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(happy)(relaxed)" },
    { id: "yarn", term: "Have a yarn", meaning: "Have a chat / conversation", example: "Come over and we'll have a yarn.", category: "actions", difficulty: "intermediate", termEmotion: "(friendly)", exampleEmotion: "(friendly)" },
    { id: "sus-out", term: "Sus out", meaning: "Figure out / Investigate", example: "Let me sus out what's going on.", category: "actions", difficulty: "intermediate", termEmotion: "(curious)", exampleEmotion: "(curious)" },
    { id: "take-a-squiz", term: "Take a squiz", meaning: "Take a look", example: "Can you take a squiz at this email?", category: "actions", difficulty: "intermediate", termEmotion: "(curious)", exampleEmotion: "(curious)" },
    { id: "go-walkabout", term: "Go walkabout", meaning: "Wander off / Disappear", example: "The cat's gone walkabout again.", category: "actions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(amused)(sighing)" },
    { id: "doing-a-runner", term: "Do a runner", meaning: "Leave quickly / Escape without paying", example: "They did a runner from the restaurant!", category: "actions", difficulty: "intermediate", termEmotion: "(nervous)", exampleEmotion: "(shocked)" },
    { id: "pull-a-swifty", term: "Pull a swifty", meaning: "Trick or deceive someone", example: "He pulled a swifty and never paid me back.", category: "actions", difficulty: "intermediate", termEmotion: "(sarcastic)", exampleEmotion: "(annoyed)" },
    { id: "give-it-a-burl", term: "Give it a burl", meaning: "Give it a try", example: "I've never surfed before but I'll give it a burl.", category: "actions", difficulty: "advanced", termEmotion: "(confident)", exampleEmotion: "(determined)" },
    { id: "having-a-whinge", term: "Have a whinge", meaning: "Complain / Moan", example: "Stop having a whinge and get on with it.", category: "actions", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "taking-the-piss", term: "Taking the piss", meaning: "Making fun of / Joking around", example: "Are you taking the piss or being serious?", category: "actions", difficulty: "intermediate", termEmotion: "(sarcastic)", exampleEmotion: "(confused)(uncertain)" },
    { id: "chucking-a-wobbly", term: "Chuck a wobbly", meaning: "Have a tantrum / Get very angry", example: "Mum chucked a wobbly when she saw my report card.", category: "actions", difficulty: "advanced", termEmotion: "(angry)", exampleEmotion: "(nervous)" },
    { id: "spit-the-dummy", term: "Spit the dummy", meaning: "Throw a tantrum / Get very upset", example: "He spat the dummy when they cancelled his flight.", category: "actions", difficulty: "advanced", termEmotion: "(upset)", exampleEmotion: "(upset)" },
    { id: "rack-off", term: "Rack off", meaning: "Go away / Get lost", example: "Rack off, I'm busy!", category: "actions", difficulty: "intermediate", termEmotion: "(angry)", exampleEmotion: "(angry)" },
    { id: "choof-off", term: "Choof off", meaning: "Leave / Depart", example: "I better choof off, it's getting late.", category: "actions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Choof off" },
    { id: "arcing-up", term: "Arcing up", meaning: "Getting angry / Aggressive", example: "Don't go arcing up at me!", category: "actions", difficulty: "advanced", termEmotion: "(angry)", exampleEmotion: "(frustrated)" },
    { id: "spit-chips", term: "Spit chips", meaning: "Be very angry", example: "She'll spit chips when she finds out.", category: "actions", difficulty: "advanced", termEmotion: "(angry)", exampleEmotion: "(worried)" },
    { id: "hard-yakka", term: "Hard yakka", meaning: "Hard work", example: "Building that deck was hard yakka.", category: "actions", difficulty: "intermediate", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)(proud)", termPronunciation: "Hard yakka" },

    // ============================================
    // DESCRIPTIVE / ADJECTIVES
    // ============================================
    { id: "heaps", term: "Heaps", meaning: "A lot / Very", example: "That movie was heaps good!", category: "descriptive", difficulty: "beginner", termEmotion: "(excited)", exampleEmotion: "(excited)" },
    { id: "bloody", term: "Bloody", meaning: "Very (intensifier, mild expletive)", example: "It's bloody hot today!", category: "descriptive", difficulty: "beginner", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "ripper", term: "Ripper", meaning: "Excellent / Fantastic", example: "That was a ripper of a game!", category: "descriptive", difficulty: "intermediate", termEmotion: "(excited)", exampleEmotion: "(excited)" },
    { id: "bonza", term: "Bonza", meaning: "Excellent / Great", example: "That's a bonza idea!", category: "descriptive", difficulty: "intermediate", termEmotion: "(excited)", exampleEmotion: "(excited)" },
    { id: "grouse", term: "Grouse", meaning: "Great / Excellent (VIC)", example: "That was a grouse party!", category: "descriptive", difficulty: "intermediate", termEmotion: "(excited)", exampleEmotion: "(excited)" },
    { id: "stoked", term: "Stoked", meaning: "Very happy / Excited", example: "I'm stoked about the concert next week!", category: "descriptive", difficulty: "beginner", termEmotion: "(excited)", exampleEmotion: "(excited)" },
    { id: "chockers", term: "Chockers", meaning: "Completely full / Packed", example: "The train was chockers this morning.", category: "descriptive", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)", termPronunciation: "Chock-ers" },
    { id: "chock-a-block", term: "Chock-a-block", meaning: "Completely full", example: "The car park was chock-a-block.", category: "descriptive", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "slammed", term: "Slammed", meaning: "Very busy", example: "I'm totally slammed at work this week.", category: "descriptive", difficulty: "intermediate", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)" },
    { id: "flat-out", term: "Flat out", meaning: "Very busy / At maximum speed", example: "I've been flat out at work all week.", category: "descriptive", difficulty: "intermediate", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)" },
    { id: "knackered", term: "Knackered", meaning: "Exhausted / Very tired", example: "I'm absolutely knackered after that hike.", category: "descriptive", difficulty: "intermediate", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)(sighing)" },
    { id: "stuffed", term: "Stuffed", meaning: "Broken / Exhausted / Full from eating", example: "The TV's stuffed, we need a new one.", category: "descriptive", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(disappointed)" },
    { id: "wrecked", term: "Wrecked", meaning: "Very drunk or exhausted", example: "I was absolutely wrecked after the party.", category: "descriptive", difficulty: "intermediate", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)" },
    { id: "pissed", term: "Pissed", meaning: "Drunk (not angry like in US)", example: "He got absolutely pissed at the party.", category: "descriptive", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)" },
    { id: "dodgy", term: "Dodgy", meaning: "Suspicious / Poor quality", example: "That kebab shop looks a bit dodgy.", category: "descriptive", difficulty: "intermediate", termEmotion: "(suspicious)", exampleEmotion: "(suspicious)(worried)" },
    { id: "suss", term: "Suss", meaning: "Suspicious / Suspect", example: "That deal sounds a bit suss to me.", category: "descriptive", difficulty: "intermediate", termEmotion: "(suspicious)", exampleEmotion: "(doubtful)" },
    { id: "bodgy", term: "Bodgy", meaning: "Poor quality / Badly made", example: "That's a bodgy repair job.", category: "descriptive", difficulty: "advanced", termEmotion: "(disapproving)", exampleEmotion: "(disappointed)" },
    { id: "cactus", term: "Cactus", meaning: "Broken / Not working", example: "My phone's cactus, need a new one.", category: "descriptive", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)" },
    { id: "bung", term: "Bung", meaning: "Broken / Not working", example: "The TV's gone bung again.", category: "descriptive", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)(sighing)" },
    { id: "crook", term: "Crook", meaning: "Sick or broken", example: "I'm feeling a bit crook today.", category: "descriptive", difficulty: "intermediate", termEmotion: "(unwell)", exampleEmotion: "(unwell)" },
    { id: "wonky", term: "Wonky", meaning: "Unsteady / Not quite right", example: "This table leg is a bit wonky.", category: "descriptive", difficulty: "intermediate", termEmotion: "(uncertain)", exampleEmotion: "(uncertain)" },
    { id: "daggy", term: "Daggy", meaning: "Unfashionable / Dorky but endearing", example: "That outfit is a bit daggy.", category: "descriptive", difficulty: "intermediate", termEmotion: "(amused)", exampleEmotion: "(amused)", termPronunciation: "Daggy" },
    { id: "feral", term: "Feral", meaning: "Wild / Uncivilised", example: "Those kids are completely feral.", category: "descriptive", difficulty: "intermediate", termEmotion: "(disapproving)", exampleEmotion: "(exasperated)" },
    { id: "bonkers", term: "Bonkers", meaning: "Crazy / Insane", example: "The traffic today was absolutely bonkers.", category: "descriptive", difficulty: "intermediate", termEmotion: "(surprised)", exampleEmotion: "(frustrated)" },
    { id: "aggro", term: "Aggro", meaning: "Aggressive / Angry", example: "Don't get aggro with me!", category: "descriptive", difficulty: "intermediate", termEmotion: "(angry)", exampleEmotion: "(frustrated)", termPronunciation: "Agro" },
    { id: "spewin", term: "Spewin'", meaning: "Very upset / Angry", example: "I was spewin' when I lost my wallet.", category: "descriptive", difficulty: "intermediate", termEmotion: "(upset)", exampleEmotion: "(upset)", termPronunciation: "Spewin" },
    { id: "devo", term: "Devo", meaning: "Devastated", example: "I was devo when they cancelled the concert.", category: "descriptive", difficulty: "intermediate", termEmotion: "(sad)", exampleEmotion: "(sad)(disappointed)", termPronunciation: "Devvo" },
    { id: "fair-dinkum", term: "Fair dinkum", meaning: "Genuine / True / Really?", example: "Fair dinkum? I can't believe he said that!", category: "descriptive", difficulty: "intermediate", termEmotion: "(surprised)", exampleEmotion: "(surprised)" },
    { id: "deadset", term: "Deadset", meaning: "Absolutely / Completely true", example: "That's deadset the best pie I've ever had.", category: "descriptive", difficulty: "intermediate", termEmotion: "(confident)", exampleEmotion: "(confident)(satisfied)" },
    { id: "mad", term: "Mad", meaning: "Great / Awesome (not angry)", example: "That party was mad!", category: "descriptive", difficulty: "intermediate", termEmotion: "(excited)", exampleEmotion: "(excited)", termPronunciation: "Mad" },
    { id: "crikey", term: "Crikey", meaning: "Expression of surprise", example: "Crikey! That spider is huge!", category: "descriptive", difficulty: "beginner", termEmotion: "(surprised)", exampleEmotion: "(surprised)(scared)" },

    // ============================================
    // THINGS & OBJECTS
    // ============================================
    { id: "thongs", term: "Thongs", meaning: "Flip-flops (NOT underwear!)", example: "Wear your thongs to the beach.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Thongs" },
    { id: "sunnies", term: "Sunnies", meaning: "Sunglasses", example: "Don't forget your sunnies, it's bright out.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(helpful)", termPronunciation: "Sun-eez" },
    { id: "trackies", term: "Trackies", meaning: "Tracksuit pants / Sweatpants", example: "I'm just lounging around in my trackies today.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Track-eez" },
    { id: "runners", term: "Runners", meaning: "Running shoes / Sneakers", example: "Grab your runners, we're going for a jog.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(enthusiastic)" },
    { id: "cossie", term: "Cossie", meaning: "Swimming costume (NSW)", example: "Don't forget your cossie for the beach.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(helpful)", termPronunciation: "Coz-ee" },
    { id: "togs", term: "Togs", meaning: "Swimming costume (QLD)", example: "Pack your togs, we're going to the pool.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(excited)" },
    { id: "bathers", term: "Bathers", meaning: "Swimming costume (VIC)", example: "I need to buy new bathers for summer.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Baythers" },
    { id: "ute", term: "Ute", meaning: "Utility vehicle / Pickup truck", example: "He's got all his tools in the back of his ute.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Yoot" },
    { id: "akubra", term: "Akubra", meaning: "Wide-brimmed hat", example: "He wore his Akubra in the outback.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Akubra" },
    { id: "swag", term: "Swag", meaning: "Camping bedroll / Sleeping bag", example: "We rolled out our swags under the stars.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)(nostalgic)", termPronunciation: "Swag" },
    { id: "booze-bus", term: "Booze bus", meaning: "Police breath-testing van", example: "Watch out, there's a booze bus ahead.", category: "things", difficulty: "intermediate", termEmotion: "(worried)", exampleEmotion: "(worried)(whispering)" },
    { id: "road-train", term: "Road train", meaning: "Large truck with multiple trailers", example: "Watch out for road trains in the outback.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(cautious)" },
    { id: "roo-bar", term: "Roo bar", meaning: "Bull bar on a vehicle", example: "Good thing I had a roo bar, hit a roo last night.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relieved)", termPronunciation: "Roo bar" },
    { id: "rego", term: "Rego", meaning: "Vehicle registration", example: "My rego is due next month.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(sighing)", termPronunciation: "Rego" },
    { id: "ciggie", term: "Ciggie", meaning: "Cigarette", example: "He went outside for a ciggie.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Sig-ee" },
    { id: "prezzie", term: "Prezzie", meaning: "Present / Gift", example: "I got some great Chrissie prezzies!", category: "things", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(excited)(happy)", termPronunciation: "Prez-ee" },
    { id: "chrissie", term: "Chrissie", meaning: "Christmas", example: "What are your plans for Chrissie?", category: "things", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(curious)(friendly)", termPronunciation: "Chris-ee" },
    { id: "rello", term: "Rello", meaning: "Relative", example: "We're visiting the rellos this weekend.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)", termPronunciation: "Rello" },
    { id: "doco", term: "Doco", meaning: "Documentary", example: "There's a good doco on SBS tonight.", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(interested)", termPronunciation: "Dock-oh" },
    { id: "facey", term: "Facey", meaning: "Facebook", example: "Did you see the photos on Facey?", category: "things", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(curious)", termPronunciation: "Face-ee" },
    { id: "byo", term: "BYO", meaning: "Bring your own (usually alcohol)", example: "It's a BYO barbecue, bring your own drinks.", category: "things", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(friendly)", termPronunciation: "B Y O" },

    // ============================================
    // MONEY
    // ============================================
    { id: "bucks", term: "Bucks", meaning: "Dollars", example: "That'll be twenty bucks.", category: "money", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "pineapple", term: "Pineapple", meaning: "$50 note (yellow colour)", example: "Can you break a pineapple?", category: "money", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(curious)" },
    { id: "lobster", term: "Lobster", meaning: "$20 note (red colour)", example: "Just got a lobster from the ATM.", category: "money", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "blue-swimmer", term: "Blue swimmer", meaning: "$10 note (blue colour)", example: "Got any blue swimmers for the parking meter?", category: "money", difficulty: "advanced", termEmotion: "(relaxed)", exampleEmotion: "(hopeful)" },
    { id: "big-bikkies", term: "Big bikkies", meaning: "A lot of money / Expensive", example: "That car cost big bikkies.", category: "money", difficulty: "intermediate", termEmotion: "(surprised)", exampleEmotion: "(impressed)" },
    { id: "mates-rates", term: "Mates rates", meaning: "Discount for friends", example: "He gave me mates rates on the job.", category: "money", difficulty: "beginner", termEmotion: "(friendly)", exampleEmotion: "(grateful)" },

    // ============================================
    // WILDLIFE & NATURE
    // ============================================
    { id: "mozzie", term: "Mozzie", meaning: "Mosquito", example: "The mozzies are terrible tonight!", category: "wildlife", difficulty: "beginner", termEmotion: "(annoyed)", exampleEmotion: "(frustrated)", termPronunciation: "Mozzy" },
    { id: "roo", term: "Roo", meaning: "Kangaroo", example: "Watch out for roos on the road at night.", category: "wildlife", difficulty: "beginner", termEmotion: "(relaxed)", exampleEmotion: "(cautious)", termPronunciation: "Roo" },
    { id: "cocky", term: "Cocky", meaning: "Cockatoo", example: "The cockies are making a racket this morning.", category: "wildlife", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(annoyed)(amused)", termPronunciation: "Cocky" },
    { id: "croc", term: "Croc", meaning: "Crocodile", example: "Don't swim there, there's crocs!", category: "wildlife", difficulty: "beginner", termEmotion: "(nervous)", exampleEmotion: "(worried)(urgent)" },
    { id: "wombat", term: "Wombat", meaning: "Cute burrowing marsupial", example: "We saw a wombat crossing the road.", category: "wildlife", difficulty: "beginner", termEmotion: "(happy)", exampleEmotion: "(delighted)" },
    { id: "bluey", term: "Bluey", meaning: "Blue heeler dog / Redheaded person", example: "My bluey is the best cattle dog.", category: "wildlife", difficulty: "intermediate", termEmotion: "(affectionate)", exampleEmotion: "(proud)(affectionate)", termPronunciation: "Bluey" },
    { id: "drop-bear", term: "Drop bear", meaning: "Fictional dangerous koala (joke for tourists)", example: "Watch out for drop bears!", category: "wildlife", difficulty: "intermediate", termEmotion: "(sarcastic)", exampleEmotion: "(sarcastic)(whispering)" },

    // ============================================
    // RHYMING SLANG
    // ============================================
    { id: "captain-cook", term: "Captain Cook", meaning: "Have a look (rhyming slang)", example: "Let me have a Captain Cook at that.", category: "rhyming", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(curious)" },
    { id: "frog-and-toad", term: "Frog and toad", meaning: "Road (rhyming slang)", example: "Let's hit the frog and toad.", category: "rhyming", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(enthusiastic)" },
    { id: "john-dory", term: "What's the John Dory?", meaning: "What's the story? (rhyming slang)", example: "So what's the John Dory with the new job?", category: "rhyming", difficulty: "advanced", termEmotion: "(curious)", exampleEmotion: "(curious)(friendly)" },

    // ============================================
    // COLORFUL EXPRESSIONS
    // ============================================
    { id: "going-off-frog", term: "Going off like a frog in a sock", meaning: "Very excited / Energetic", example: "The kids were going off like frogs in a sock.", category: "expressions", difficulty: "advanced", termEmotion: "(excited)", exampleEmotion: "(amused)(excited)" },
    { id: "few-roos-loose", term: "Few roos loose in the top paddock", meaning: "A bit crazy / Not all there", example: "He's got a few roos loose in the top paddock.", category: "expressions", difficulty: "advanced", termEmotion: "(sarcastic)", exampleEmotion: "(sarcastic)(amused)" },
    { id: "flat-out-lizard", term: "Flat out like a lizard drinking", meaning: "Extremely busy", example: "I've been flat out like a lizard drinking all week.", category: "expressions", difficulty: "advanced", termEmotion: "(exhausted)", exampleEmotion: "(exhausted)(sighing)" },
    { id: "happy-as-larry", term: "Happy as Larry", meaning: "Very happy", example: "Give him a beer and he's happy as Larry.", category: "expressions", difficulty: "intermediate", termEmotion: "(happy)", exampleEmotion: "(happy)(amused)" },
    { id: "mad-as-a-cut-snake", term: "Mad as a cut snake", meaning: "Very angry or crazy", example: "She was mad as a cut snake when she found out.", category: "expressions", difficulty: "advanced", termEmotion: "(angry)", exampleEmotion: "(nervous)" },
    { id: "dogs-breakfast", term: "Dog's breakfast", meaning: "A mess / Disaster", example: "This project has turned into a dog's breakfast.", category: "expressions", difficulty: "advanced", termEmotion: "(frustrated)", exampleEmotion: "(frustrated)(sighing)" },
    { id: "up-the-creek", term: "Up the creek without a paddle", meaning: "In big trouble", example: "If we miss this deadline, we're up the creek.", category: "expressions", difficulty: "intermediate", termEmotion: "(worried)", exampleEmotion: "(worried)" },
    { id: "built-like-brick-shithouse", term: "Built like a brick shithouse", meaning: "Very solidly built", example: "That rugby player is built like a brick shithouse.", category: "expressions", difficulty: "advanced", termEmotion: "(impressed)", exampleEmotion: "(impressed)" },
    { id: "tell-him-dreaming", term: "Tell him he's dreaming", meaning: "That's unrealistic / No way", example: "He wants how much? Tell him he's dreaming!", category: "expressions", difficulty: "intermediate", termEmotion: "(sarcastic)", exampleEmotion: "(incredulous)(laughing)" },
    { id: "carry-on-pork-chop", term: "Carry on like a pork chop", meaning: "Behave ridiculously", example: "Stop carrying on like a pork chop!", category: "expressions", difficulty: "advanced", termEmotion: "(amused)", exampleEmotion: "(frustrated)" },
    { id: "not-my-cup-of-tea", term: "Not my cup of tea", meaning: "Not my preference / Not my thing", example: "Cricket's not really my cup of tea.", category: "expressions", difficulty: "intermediate", termEmotion: "(relaxed)", exampleEmotion: "(relaxed)" },
    { id: "few-sandwiches-short", term: "A few sandwiches short of a picnic", meaning: "Not very smart", example: "He's a few sandwiches short of a picnic.", category: "expressions", difficulty: "advanced", termEmotion: "(sarcastic)", exampleEmotion: "(sarcastic)(amused)" },
    { id: "all-over-the-shop", term: "All over the shop", meaning: "Disorganised / Chaotic", example: "His presentation was all over the shop.", category: "expressions", difficulty: "intermediate", termEmotion: "(frustrated)", exampleEmotion: "(disappointed)" }
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
    rhyming: "Rhyming Slang"
};

// Sentence templates for sentence builder game (using slang terms)
const sentenceTemplates = [
    { sentence: "I'll meet you this ___ at the pub.", answer: "arvo", hint: "afternoon" },
    { sentence: "___ mate! How ya going?", answer: "G'day", hint: "hello" },
    { sentence: "Thanks for the help - you're a ___!", answer: "legend", hint: "great person" },
    { sentence: "Let's fire up the ___ and cook some snags.", answer: "barbie", hint: "barbecue" },
    { sentence: "I'm absolutely ___ after that workout.", answer: "knackered", hint: "exhausted" },
    { sentence: "Grab us a ___ from the esky.", answer: "coldie", hint: "cold beer" },
    { sentence: "___ worries, I'll help you move.", answer: "No", hint: "no problem" },
    { sentence: "Don't stress, she'll be ___.", answer: "right", hint: "okay" },
    { sentence: "That kebab shop looks a bit ___.", answer: "dodgy", hint: "suspicious" },
    { sentence: "He's a good ___, you'll like him.", answer: "bloke", hint: "man" },
    { sentence: "Chuck some ___ on the barbie.", answer: "snags", hint: "sausages" },
    { sentence: "The drinks are in the ___.", answer: "esky", hint: "cooler" },
    { sentence: "I could really go for a ___ right now.", answer: "cuppa", hint: "cup of tea" },
    { sentence: "Stop being a ___ and help out!", answer: "bludger", hint: "lazy person" },
    { sentence: "I haven't seen him in ___!", answer: "yonks", hint: "a long time" },
    { sentence: "That was a ___ of a game!", answer: "ripper", hint: "excellent" },
    { sentence: "I'm ___ about the concert!", answer: "stoked", hint: "excited" },
    { sentence: "It's ___ hot today!", answer: "bloody", hint: "very" },
    { sentence: "Let's meet for ___ at nine.", answer: "brekkie", hint: "breakfast" },
    { sentence: "I made a vegemite ___ for lunch.", answer: "sanga", hint: "sandwich" },
    { sentence: "Don't forget your ___ for the beach!", answer: "thongs", hint: "flip-flops" },
    { sentence: "The train was ___ this morning.", answer: "chockers", hint: "completely full" },
    { sentence: "What time do you ___ work?", answer: "knock off", hint: "finish" },
    { sentence: "I'm totally ___ at work this week.", answer: "slammed", hint: "very busy" },
    { sentence: "Can you take a ___ at this?", answer: "squiz", hint: "look" },
    { sentence: "He gave me ___ rates on the job.", answer: "mates", hint: "friend discount" },
    { sentence: "Are you coming? ___, yeah.", answer: "Nah", hint: "casual yes" },
    { sentence: "She was ___ when she lost her wallet.", answer: "spewin'", hint: "upset" },
    { sentence: "That car cost big ___.", answer: "bikkies", hint: "a lot of money" },
    { sentence: "Pull into the ___, we need petrol.", answer: "servo", hint: "service station" }
];

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { slangData, categories, difficultyLevels, difficultyNames, categoryNames, sentenceTemplates };
}
