import { JigsawActivity } from "./types";

export const PRESET_ACTIVITIES: JigsawActivity[] = [
  {
    id: "preset-internet",
    title: "How the Internet Works",
    topic: "Computer Networking",
    level: "High School / Introductory College",
    description: "Deconstruct the hidden infrastructure of the web of networks, tracing a simple mouse click to a response arriving in milliseconds.",
    expertTopics: [
      {
        id: "topic-1",
        title: "IP Routing & Packet Switching",
        guide: `## The Foundation of Transferring Data

The Internet is a packet-switched network. When you send email, load a website, or stream video, the data is broken down into small pieces called **packets**. Each packet is capped in size (typically 1500 bytes) and contains a header with vital metadata: the **Source IP address**, the **Destination IP address**, and the sequence number.

Rather than occupying an entire physical wire from your computer to a server, packets are individually dispatched. This is called **packet switching**.

### Key Concept: Routers as Post Offices
Think of **routers** as digital post offices. Every time a packet arrives at a router, the router examines its destination IP address and consults its routing table—a map of the adjacent networking territory. It then passes the packet to the next closest router (next hop).

### IP Addresses (v4 vs. v6)
*   **IPv4**: Uses 32-bit addresses written in dotted-decimal format (e.g., \`192.168.1.1\`). It supports about 4.3 billion unique devices, which is no longer enough for the modern world.
*   **IPv6**: Uses 128-bit addresses written in hexadecimal format (e.g., \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`). This creates an astronomical number of addresses, ensuring every smart device on Earth can have a unique, direct address.

### The Self-Healing Nature of IP Routing
Because routing is dynamic, if one line goes down, routers automatically find an alternative route. This means packets belonging to the same document might travel different paths across the globe, arriving out of order. They are reassembled at their final destination using their sequence numbers of the TCP layer.`,
        keyTakeaways: [
          "Data is sliced into small packets instead of being sent as a single unbroken stream.",
          "Routers act as independent traffic guides, utilizing routing tables to direct packets toward their destination.",
          "IPv6 expands on IPv4's limited address pool by utilizing 128-bit addresses to fit billions of IoT and server systems."
        ],
        discussionPrompts: [
          "Explain why packet switching is more reliable and efficient than circuit switching (where a physical line is dedicated, like in old telephone networks).",
          "What happens if packets arrive out of order, and whose job is it to reassemble them correctly?",
          "How do IP addresses compare to physical mailing addresses in your own words?"
        ],
        teachingTips: [
          "Use the **Postcard Analogy**: Imagine sending a long book to a friend by tearing out the pages, writing mailing addresses on the margin of each page, and sending them separately. They might arrive in different mail trucks, but your friend can put them back together using the page numbers.",
          "Focus on the dynamic routing: point out that if a router breaks down mid-way, the packets instantly detour."
        ]
      },
      {
        id: "topic-2",
        title: "The Domain Name System (DNS)",
        guide: `## The Phonebook of the Web

Computers communicate using numbers called IP addresses. However, humans are terrible at memorizing raw strings of digits like \`142.250.190.46\`. We prefer meaningful labels like \`google.com\` or \`wikipedia.org\`. The **Domain Name System (DNS)** is the distributed hierarchical database that translates these user-friendly domain names into machine-readable IP addresses.

Whenever you type a URL into your browser, the first thing your operating system does is ask a DNS server to resolve it.

### The DNS Hierarchy
DNS is organized like an inverted tree:
1.  **DNS Resolver (Your ISP or Public DNS)**: The first stop for your request. It acts like an assistant searching for information. If it doesn't have the IP cached, it goes up the tree.
2.  **Root Name Servers**: These represent the apex (denoted by a silent dot at the end of a domain, e.g., \`example.com.\`). There are 13 logical root server IP addresses worldwide. They direct the resolver to the Top-Level Domain (TLD) server.
3.  **TLD Name Servers**: These manage endings like \`.com\`, \`.org\`, or \`.edu\`. The TLD server directs the resolver to the domain's authoritative server.
4.  **Authoritative Name Servers**: The final authority. This server holds the exact record (the 'A Record') mapping the domain directly to its hosting IP.

### Caching and TTL (Time To Live)
Because resolving this tree every time would slow down the internet, DNS resolution results are cached at multiple levels (your browser, your operating system, and your ISP resolver) for a duration specified as **TTL (Time to Live)** in the DNS record.`,
        keyTakeaways: [
          "DNS resolves human-friendly names (like wikipedia.org) to machine-readable IP addresses.",
          "The system utilizes a hierarchical lookup tree (Resolver -> Root -> TLD -> Authoritative).",
          "Caching at the browser and local OS levels avoids redundant lookups and speeds up navigation."
        ],
        discussionPrompts: [
          "What would happen to the global web if all Root Name Servers suddenly stopped working?",
          "How might an attacker use a fake DNS server to compromise a user's data? (Think about DNS poisoning).",
          "Explain what 'Time to Live' (TTL) in DNS records controls, and why caching is essential."
        ],
        teachingTips: [
          "Use the **Contacts List Analogy**: DNS is like your smartphone's contact list. You search for 'Mom' (Domain Name) because you can't remember her actual phone number (IP address).",
          "Walk through the steps visually: Draw a tree in the air showing how you start at the root, find the room of '.com', and then ask the computer inside that room for the specific website address."
        ]
      },
      {
        id: "topic-3",
        title: "HTTP & Web Servers",
        guide: `## Conversing in Client-Server Language

Once your browser resolves the server's IP address, it must request the actual files. It does this using **HTTP (Hypertext Transfer Protocol)**, which defines the standard vocabulary for communication between a client (your web browser) and a server (the remote host).

HTTP uses a simple, stateless **Request-Response** pattern.

### The Request Lifecycle
Your client initiates a TCP connection to the server on port 80 (or 443 for HTTPS) and sends an HTTP Request:
*   **Request Method**: Tells the server what action to perform. Common methods are \`GET\` (fetch a page), \`POST\` (send data like a form), \`PUT\` (update files), and \`DELETE\`.
*   **Headers**: Metadata containing the browser type, cookies, and accepted data encodings.

### The Server's Response
The web server (software like Apache, Nginx, or an Node.js/Express server) listens for requests, processes them, looks up files, and sends back an HTTP Response:
*   **Status Code**: A three-digit number indicating the outcome of the request.
    *   **1xx**: Informational
    *   **2xx**: Success (e.g., \`200 OK\`)
    *   **3xx**: Redirection (e.g., \`301 Moved Permanently\`)
    *   **4xx**: Client Error (e.g., \`404 Not Found\` or \`403 Forbidden\`)
    *   **5xx**: Server Error (e.g., \`500 Internal Server Error\`)
*   **Response Body**: The requested HTML, CSS, JavaScript, image, or raw JSON data.

### Statelessness and Cookies
HTTP is stateless; the server forgets who you are as soon as a request is completed. To remain logged in or save items to a shopping cart, servers send a header setting a unique **cookie** in your browser. Subsequent requests attach this cookie to verify your identity.`,
        keyTakeaways: [
          "HTTP is a request-response protocol enabling clients (browsers) and web servers to exchange media files and templates.",
          "Every response is categorized by standard numeric status codes (e.g., 200 for OK, 404 for Not Found).",
          "To counter HTTP's stateless legacy, cookies are used client-side to persist session states like logins."
        ],
        discussionPrompts: [
          "What is the difference between a client-side error (4xx) and a server-side error (5xx) in HTTP?",
          "How do cookies help web applications remember that you are logged in even though HTTP is stateless?",
          "How does a web server handle thousands of simultaneous requests without swapping files around?"
        ],
        teachingTips: [
          "Use the **Restaurant Analogy**: The browser is the **customer**, the server is the **chef**, and HTTP is the **standard menu and ordering format** passed back and forth by the **waiter**. A request is placing the order; a response is bringing the food (or a 404 saying they are out of stock).",
          "Teach the status codes in sets of hundreds (e.g. 200s are high fives, 400s are user mistakes, 500s are developer mistakes)."
        ]
      },
      {
        id: "topic-4",
        title: "HTTPS, Cryptography & Security",
        guide: `## Securing the Wires from Eavesdroppers

In the early days, internet packets were sent in plain text. This meant that anyone on the same Wi-Fi network, internet service provider, or intermediary routing nodes could easily read passwords, credit card numbers, or messages. This standard was HTTP.

To secure data traveling across the internet, the industry developed **HTTPS (HTTP Secure)**, which encrypts HTTP communications using **TLS (Transport Layer Security)**.

### Symmetrical vs. Asymmetrical Cryptography
TLS combines two types of encryption to balance speed and maximum security:
1.  **Asymmetrical Cryptography (Public Key Cryptography)**: Uses two mathematically linked keys: a **Public Key** (which anyone can use to encrypt messages) and a **Private Key** (kept secret by the server, which is the only key capable of decrypting what was encrypted with the public key). This is used during the initial 'TLS Handshake' to safely agree on a temporary key.
2.  **Symmetrical Cryptography**: Uses a single shared secret key to both encrypt and decrypt data. Once the initial handshake establishes this shared key securely, symmetrical encryption is used because it is much faster.

### Digital Certificates and CAs
How do you know that \`bank.com\`'s public key actually belongs to your bank, and not to a hacker?
Browsers rely on **SSL/TLS Certificates** issued by trusted third parties called **Certificate Authorities (CAs)** (like Let's Encrypt or DigiCert). These CAs cryptographically sign the certificate to verify that the server's identity has been vetted. If a signature doesn't match, your browser flashes a bright red warning: 'Your Connection is Not Private'.`,
        keyTakeaways: [
          "HTTPS introduces TLS to encrypt plain-text HTTP, blocking interceptors from snooping or editing packets.",
          "Asymmetrical key pairs establish a secure session, which transitions to symmetric encryption for fast transfer.",
          "Certificate Authorities (CAs) act as trusted authenticators verifying domain ownership keys."
        ],
        discussionPrompts: [
          "Why do we need asymmetrical cryptography for the initial handshake instead of just sharing a symmetric key from the start?",
          "What does your browser do when a website presents an SSL certificate that has expired or is signed by an unrecognized Certificate Authority?",
          "How does HTTPS protect you when you are browsing on public library or coffee shop Wi-Fi networks?"
        ],
        teachingTips: [
          "Use the **Locked Box Analogy**: Imagine sending a box with a padlocked key. Symmetrical is having identical keys. Asymmetrical is when the server sends an open box. You put your secret inside, click the lock shut (anyone can do this), and send it back. Only the server has the key to unlock it.",
          "Emphasize the 'Padlock Icon' in the URL bar and how it certifies identity."
        ]
      }
    ],
    reviewQuiz: [
      {
        id: "q-1",
        question: "When data is broken down for transfer across the internet, what are these individual digital units called?",
        options: ["Channels", "Packets", "Bandwidths", "Streams"],
        correctIndex: 1,
        explanation: "In packet-switched networks, data is broken down into small units called packets, each complete with a header indicating origins and endpoints."
      },
      {
        id: "q-2",
        question: "Which of the following DNS servers holds the absolute final authority mapping a domain directly to its hosting IP address?",
        options: ["Root Name Server", "TLD Server", "Authoritative Name Server", "DNS Resolver Client"],
        correctIndex: 2,
        explanation: "The Authoritative Name Server is the last step in the lookup hierarchy; it contains the specific zone file record (like the A Record) for the domain."
      },
      {
        id: "q-3",
        question: "If your browser attempts to load a webpage but is blocked because you are logged out, which range of HTTP status codes should the server return?",
        options: ["2xx Success codes", "3xx Redirection codes", "4xx Client Error codes", "5xx Server Error codes"],
        correctIndex: 2,
        explanation: "Authentication errors are client-side issues, signaling the browser failed to provide proper authorization (e.g., 401 Unauthorized or 403 Forbidden)."
      },
      {
        id: "q-4",
        question: "Why does HTTPS use asymmetrical cryptography primarily for the handshake, but switches to symmetrical cryptography for web traffic?",
        options: [
          "Asymmetrical cryptography is too slow for parsing large, continuous byte flows.",
          "Symmetrical keys cannot encrypt text files.",
          "Asymmetrical cryptography cannot operate with TLS.",
          "Symmetrical cryptography is safer against local Wi-Fi interceptors."
        ],
        correctIndex: 0,
        explanation: "Asymmetrical cryptography requires intense mathematical calculation. Symmetrical cryptography acts significantly faster, making it perfect for rapid data transmission once the secure connection is validated."
      }
    ]
  },
  {
    id: "preset-climate",
    title: "Understanding Climate Change",
    topic: "Environmental Science",
    level: "Middle / High School",
    description: "Break down the systemic science behind rising planetary temperatures: from molecular traps to ecological compound impacts and mitigation technologies.",
    expertTopics: [
      {
        id: "topic-1",
        title: "The Greenhouse Effect",
        guide: `## Earth's Atmospheric Thermal Trap

Our planet maintains a livable temperature because of its atmosphere. Without it, Earth's average temperature would be around -18°C (0°F), instead of our current, comfortable 15°C (59°F). The physical process behind this balance is the **Greenhouse Effect**, where the atmosphere behaves like glass walls covering a garden bed.

Understanding how photons interact with different gaseous compounds is the foundation of climate science.

### The Physics of Solar Heat Absorption
1.  **Incoming Radiation**: The Sun radiates energy mostly in the form of shortwave light waves (ultraviolet and visible light). This energy passes through our atmosphere easily.
2.  **Absorption & Re-radiation**: Earth's surface absorbs this sunlight, warming up, and radiates it back outward as long-wave, lower-frequency **infrared radiation** (heat).
3.  **The Molecular Trap**: While nitrogen and oxygen (99% of the atmosphere) do not react with infrared rays, certain complex molecules with three or more atoms—**Greenhouse Gases (GHGs)**—resonate with infrared frequencies. They absorb this energy, vibrate, and re-emit it in all directions. Half of this heat goes back out into space, but the other half is radiated back to Earth's surface, trapping warmth.

### Primary Greenhouse Gases
*   **Water Vapor (H2O)**: The most abundant GHG, but acts of feedbacks rather than direct human inputs.
*   **Carbon Dioxide (CO2)**: Released by burning fossil fuels, deforestation, and volcanic eruptions. It persists in the atmosphere for centuries.
*   **Methane (CH4)**: Released from agriculture, livestock digestion, decay in landfills, and fossil fuel drilling. It is about 28 times more active at trapping heat than CO2 over a 100-year span, though it decays within a decade.
*   **Nitrous Oxide (N2O)**: Sourced heavily from synthetic fertilizers and industrial chemical processing.`,
        keyTakeaways: [
          "Atmospheric greenhouse gases act as a thermal trap by absorbing long-wave infrared radiation radiated off Earth's surface.",
          "Dual-atom molecules like Nitrogen and Oxygen do not absorb infrared, whereas complex GHGs vibrate and re-emit heat energy.",
          "Methane is far more potent at wrapping thermal heat than carbon dioxide, but breaks down in the atmosphere much quicker."
        ],
        discussionPrompts: [
          "Why do transparent molecules like Nitrogen and Oxygen ignore infrared rays, while Greenhouse Gases capture them?",
          "How is a natural greenhouse effect different from an enhanced greenhouse effect caused by human carbon emissions?",
          "Why is longwave infrared radiation trapped by gases while shortwave solar rays represent a free pass?"
        ],
        teachingTips: [
          "Use the **Winter Blanket Analogy**: GHGs are like layers of wool blankets over a sleeping person. Adding more blankets doesn't generate new body heat; it simply stops the heat your body was already releasing from escaping into the cold room.",
          "Emphasize that the Greenhouse Effect is actually a natural, life-supporting mechanism that is currently being overcharged."
        ]
      },
      {
        id: "topic-2",
        title: "Feedbacks & Albedo Effects",
        guide: `## Climatology's Multiplying Mechanisms

The climate is not linear. A minor initial heating does not just result in a simple proportional temperature increase. Over time, heat triggers chain reactions across planetary spheres (cryosphere, biosphere, atmosphere). These reactions are called **feedback loops**, and they can either amplify warming (**positive feedbacks**) or dampen it (**negative feedbacks**).

The most famous and dangerous amplifying mechanism is the **ice-albedo feedback**.

### Albedo: Planet Earth's Reflective Shield
**Albedo** is a unitless measurement of how reflective a surface is. It ranges from 0 (perfect absorption) to 1 (perfect reflection).
*   **High Albedo (~0.85)**: Pristine sea-ice and snowpack sheets. They act like mirrors, bouncing up to 85% of incoming solar energy directly back into space.
*   **Low Albedo (~0.07)**: Deep ocean water and dark forest canopies. They behave like asphalt, absorbing over 90% of solar rays and heating up.

### The Amplified Albedo Feedback Loop
1.  **Step 1**: Greenhouse gases warm the atmosphere.
2.  **Step 2**: Warmer temperatures melt Arctic snowpacks and ocean sea ice.
3.  **Step 3**: Reflective white ice is replaced by dark, absorbent open water.
4.  **Step 4**: The open water absorbs massive amounts of heat, warming the local sea and melting more surrounding ice.
This represents a self-reinforcing chain reaction.

### Permafrost: The Carbon Bomb
Another dangerous feedback lies in **permafrost**—frozen soils in high northern latitudes. As these soils unfreeze, historic organic material decays, releasing billions of tons of trapped carbon dioxide and methane. This adds more greenhouse gases, accelerating warming, melting more permafrost, and continuing the cycle in an uncontrollable loop.`,
        keyTakeaways: [
          "Albedo defines are surface's solar reflectivity, where snow sheets reflect light, whereas oceans absorb it as heat.",
          "Amplifying feedbacks (like ice-albedo and permafrost defrosting) represent self-reinforcing cycle risks.",
          "Once positive feedback thresholds are crossed, climate changes can trigger tipping points that are impossible to reverse."
        ],
        discussionPrompts: [
          "Explain the complete step-by-step chain of events in the ice-albedo positive feedback loop.",
          "How does a negative feedback loop differ from a positive feedback loop? Can you invent a physical analogy for both?",
          "Why is frozen permafrost referred to by climatologists as a 'carbon bomb waiting to explode'?"
        ],
        teachingTips: [
          "Use the **Microphone Audio Screech Analogy** (Feedback): A positive feedback is like holding a speaker's microphone too close to the speaker. A tiny initial sound goes into the mic, is amplified out of the speaker, goes back inside the mic, and loops rapidly into an ear-piercing screech.",
          "Point out the extreme difference in albedo between a white t-shirt and a black t-shirt on a hot summer afternoon."
        ]
      },
      {
        id: "topic-3",
        title: "Ecological Impacts & Ocean Systems",
        guide: `## Collapsing Balance across the Biosphere

Warming air temperatures represent only one dimension of a changing planet. When global systems adjust, the consequences emerge in oceanic shifts and disrupted ecosystems. The ocean serves as the planet's primary climate regulator, absorbing roughly 90% of global atmospheric heat and nearly 30% of human carbon emissions.

These twin absorption buffers come with severe thermodynamic and chemical consequences.

### Thermal Expansion and Sea Level Rise
Global sea level rise is caused by two distinct physical sources:
1.  **Land Ice Melt**: Ocean water rises as massive continental glaciers on Greenland and Antarctica slide and melt into the sea. (Note: Melting sea ice doesn't raise sea levels because it is already floating, just like melting ice cubes in a water cup!).
2.  **Thermal Expansion**: When water is heated, its molecules vibrate faster and expand, occupying more space. Thermal expansion accounts for nearly half of modern sea level rise.

### The Chemical Shift: Ocean Acidification
When carbon dioxide ($CO_2$) dissolves in ocean water, it reacts to form **carbonic acid** ($H_2CO_3$), which lowers the pH of the ocean, increasing acidity. This process is called **Ocean Acidification**.
This chemical shift makes it difficult for marine calcifying organisms, such as oysters, crabs, and corals, to gather the carbonate ions they need to grow their protective shells.

### Ecosystem Disconnection: Phenological Mismatches
On land, species survive off synchronized timing. Long-standing species interactions are breaking apart due to **phenological mismatches**—where migration, mating, or budding patterns are triggered prematurely. For example, caterpillars might hatch earlier due to warm springs, leaving migrating birds that arrive at their usual time with no caterpillars left to feed their babies.`,
        keyTakeaways: [
          "Sea level rise is driven about equally by melting land glaciers and the thermal expansion of warming ocean water.",
          "Carbon dioxide absorption by sea surfaces creates carbonic acid, blocking shellfish from extracting building minerals.",
          "Phenological mismatches occur when warming temperatures trigger ecological migrations out of sync with natural events."
        ],
        discussionPrompts: [
          "Why does melting glacial ice on land raise sea levels, while melting floating sea ice does not?",
          "How does ocean acidification affect marine food webs (think about small clams, zooplankton, and whales)?",
          "What is a phenological mismatch, and how can it lead to species decline?"
        ],
        teachingTips: [
          "Use the **Soda Can Carbonation Analogy**: The ocean behaves like a carbonated drink. When you open a cold soda, gas dissolves inside, but as it gets warm, it quickly loses stability. Similarly, as the ocean warms up, its ability to act as a carbon sponge begins to degrade.",
          "Remind the home group of the ice cube in a full glass of water. If you melt floating ice, it won't overflow the cup!"
        ]
      },
      {
        id: "topic-4",
        title: "Energy & Policy Mitigation",
        guide: `## Re-Engineering a Low-Carbon Future

Solving human-induced climate change requires active **Mitigation**—reducing the rate of greenhouse gas emissions entering our atmosphere. This represents a monumental re-engineering task, transitioning global infrastructure away from fossil energy sources (coal, oil, gas) to clean alternatives.

This is a challenge requiring both technological engineering and robust international policy.

### Clean Energy Technology
The green transition relies on electrifying our global economy using carbon-free power generators:
*   **Solar Photovoltaics & Wind Power**: Rapidly scaling up, representing the cheapest sources of new electricity in most regions.
*   **Grid Battery Storage**: Solving the intermittency problem (the wind does not blow and the sun does not shine 24/7) by storing energy for grid smoothing.
*   **Nuclear Energy**: Fission reactors that emit no greenhouse gases, providing steady baseline electricity.
*   **Green Hydrogen**: Using renewable power to split water molecules, generating clean clean fuel for heavy transport like flights and industrial container shipping.

### Policy Mechanisms: Carbon Pricing
To change industrial behaviors, governments use two main financial tools:
1.  **Carbon Tax**: Placing a direct fee on each ton of carbon dioxide emitted. This forces industries to pay for their pollution, incentivizing them to transition to clean machinery.
2.  **Cap-and-Trade (Emissions Trading Systems)**: The government sets a strict baseline limit ('cap') on total carbon emissions. Permitted allowances are traded in a marketplace. Companies that cut emissions can sell leftover permits to those struggling to transition.

### Adaptation vs. Mitigation
*   **Mitigation**: Cutting emissions to stop future warming (e.g., building solar plants, restoring mangrove swamps).
*   **Adaptation**: Changing our city designs to survive the warming that is already locked in (e.g., building sea walls, restoring dry farms with heat-tolerant seed grains).`,
        keyTakeaways: [
          "Mitigation targets cutting greenhouse gas emission rates, whereas adaptation focuses on preparing cities for warming events.",
          "Carbon tax structures place direct pricing fees on carbon, whereas cap-and-trade networks set market trading models.",
          "The clean energy transition requires scalable renewable power resources backed by battery grid storage systems."
        ],
        discussionPrompts: [
          "What is the difference between carbon mitigation and adaptive planning? Can you give examples of both?",
          "How does a cap-and-trade market align financial profit motives with global environmental conservation goals?",
          "Why is utility-scale battery storage essential for expanding our dependence on solar and wind power?"
        ],
        teachingTips: [
          "Use the **Leaky Bathtub Analogy**: Imagine a bathtub overflowing with water. **Mitigation** is turning off the faucet to stop more water from flowing in. **Adaptation** is grabbing a mop, getting sandbags, and clearing the drain so you don't ruin the floor while the water is still pooling.",
          "Point out that carbon pricing makes carbon emissions visible on a corporation's balance sheet."
        ]
      }
    ],
    reviewQuiz: [
      {
        id: "q-1",
        question: "Why do Greenhouse Gases (GHGs) absorb infrared heat, while Nitrogen and Oxygen do not?",
        options: [
          "GHGs are physically larger and block light.",
          "GHGs have more complex, asymmetrical structures with three or more atoms that resonate with infrared wavelengths.",
          "GHGs are cold molecules that pull in planetary heat.",
          "Nitrogen and Oxygen are liquified in the atmosphere."
        ],
        correctIndex: 1,
        explanation: "Molecules with three or more atoms (like CO2 and methane) can bend and vibrate, allowing them to absorb and re-emit long-wave infrared energy, unlike simple two-atom molecules."
      },
      {
        id: "q-2",
        question: "How does the ice-albedo feedback loop accelerate global planetary warming?",
        options: [
          "Melting white ice sheets exposes dark ocean waters, lowering reflectivity and causing more heat absorption.",
          "White ice acts like a magnifying glass, focusing heat on dark seafloors.",
          "Melting ice releases massive amounts of synthetic chlorofluorocarbons.",
          "As glaciers melt, they raise sea salt levels, making the air warm."
        ],
        correctIndex: 0,
        explanation: "Sea ice has a high albedo (reflectivity) of around 0.8. As it melts, it exposes dark water with a low albedo which absorbs solar heat, accelerating melting in a self-reinforcing loop."
      },
      {
        id: "q-3",
        question: "In ocean chemistry, what happens when oceans absorb excessive carbon dioxide from human activity?",
        options: [
          "Water temperature drops quickly.",
          "Carbon dioxide reacts to form carbonic acid, lower the water's pH and acidifying the ocean.",
          "Ocean salinity skyrockets, forming crystalline salt domes.",
          "Ocean levels drop because carbon dioxide molecules compress water cells."
        ],
        correctIndex: 1,
        explanation: "CO2 dissolves in seawater to form weak carbonic acid, reducing pH levels (acidification), which steals carbonate ions needed by marine shellbuilders to build shells."
      },
      {
        id: "q-4",
        question: "If a city builds massive sea barriers and dikes to protect streets from storm surges, what classification is this action?",
        options: ["Symmetric Mitigation", "Active Adaptation", "Primary Capital Taxation", "Carbon Offsetting"],
        correctIndex: 1,
        explanation: "Building infrastructure to protect against climate impacts is adaptation, while attempting to reduce emissions to prevent climate change is mitigation."
      }
    ]
  }
];
