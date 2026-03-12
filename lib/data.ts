export interface Property {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;

  rating: number;
  reviewCount: number;
  airbnbUrl: string;
  airbnbListingId: string;
  superhost: boolean;
  instantBook: boolean;
  responseTime: string;
  responseRate: number;
  heroImage: string;
  images: { src: string; alt: string }[];
  amenityHighlights: string[];
  features: string[];
}

export interface Testimonial {
  name: string;
  property: string;
  rating: number;
  text: string;
  date: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

const floridaGetaway: Property = {
  slug: "florida-getaway",
  name: "Florida Getaway",
  tagline: "Your Tropical Paradise Awaits",
  description:
    "The whole group will enjoy easy access to everything from this centrally located southwest Florida home between Sarasota and Fort Myers — from beaches, amusement parks, shopping, restaurants, live entertainment and much more. 3 bedrooms, 2 bath, open concept kitchen and living room with 80 in. TV. Enjoy outdoor living on the extra large covered patio with lounger, TV, and table for 6. Saltwater heated pool under screened in lanai, and outdoor shower.",
  bedrooms: 3,
  bathrooms: 2,
  maxGuests: 6,

  rating: 5.0,
  reviewCount: 27,
  airbnbUrl: "https://www.airbnb.com/rooms/818184240745799799",
  airbnbListingId: "818184240745799799",
  superhost: true,
  instantBook: true,
  responseTime: "within an hour",
  responseRate: 100,
  heroImage: "/images/properties/florida-getaway/exterior.jpeg",
  images: [
    { src: "/images/properties/florida-getaway/exterior.jpeg", alt: "Florida Getaway exterior view of the home" },
    { src: "/images/properties/florida-getaway/pool.jpeg", alt: "Saltwater heated pool under screened lanai" },
    { src: "/images/properties/florida-getaway/patio.jpeg", alt: "Extra large covered patio with lounger and TV" },
    { src: "/images/properties/florida-getaway/living-room.jpeg", alt: "Open concept living room with 80 inch TV" },
    { src: "/images/properties/florida-getaway/kitchen.jpeg", alt: "Fully equipped modern kitchen" },
    { src: "/images/properties/florida-getaway/dining.jpeg", alt: "Dining area with seating for the whole family" },
    { src: "/images/properties/florida-getaway/bedroom1.jpeg", alt: "Primary bedroom with spacious walk-in closet" },
    { src: "/images/properties/florida-getaway/bedroom2.jpeg", alt: "Second bedroom with comfortable bedding" },
    { src: "/images/properties/florida-getaway/bedroom3.jpeg", alt: "Third bedroom" },
    { src: "/images/properties/florida-getaway/bathroom1.jpeg", alt: "Primary bathroom" },
    { src: "/images/properties/florida-getaway/bathroom2.jpeg", alt: "Second bathroom" },
    { src: "/images/properties/florida-getaway/backyard.jpeg", alt: "Private backyard with pool and outdoor dining" },
  ],
  amenityHighlights: ["Heated Saltwater Pool", "80\" HDTV", "Self Check-in", "Full Kitchen", "Free Parking"],
  features: [
    "Heated Saltwater Pool",
    "Outdoor Shower",
    "80\" HDTV",
    "Self Check-in",
    "High-Speed WiFi",
    "Full Kitchen",
    "BBQ Grill",
    "Extra Large Covered Patio",
    "Free Parking (3 spaces)",
    "Washer & Dryer",
    "Central AC & Heating",
    "Security Cameras (Exterior)",
    "Beach Gear Provided",
    "Single Level Home",
    "Pack 'n Play / Travel Crib",
    "24/7 Support",
  ],
};

const coastalCottage: Property = {
  slug: "coastal-cottage",
  name: "Coastal Cottage",
  tagline: "Seaside Serenity Starts Here",
  description:
    "Cozy home perfect for 2 couples, small family of 4, or for you and your significant other at this peaceful and centrally-located place. 25 minutes from beaches, Punta Gorda for night life and Fisherman's Village for shopping. Come enjoy this cute 2 bedroom home with an amazing patio for outdoor living — this is where you will love spending a quiet evening or playing a game of darts.",
  bedrooms: 2,
  bathrooms: 2,
  maxGuests: 4,

  rating: 5.0,
  reviewCount: 12,
  airbnbUrl: "https://www.airbnb.com/rooms/1073345215474384545",
  airbnbListingId: "1073345215474384545",
  superhost: true,
  instantBook: true,
  responseTime: "within an hour",
  responseRate: 100,
  heroImage: "/images/properties/coastal-cottage/exterior.jpeg",
  images: [
    { src: "/images/properties/coastal-cottage/exterior.jpeg", alt: "Coastal Cottage exterior view of the home" },
    { src: "/images/properties/coastal-cottage/pool.jpeg", alt: "Refreshing swimming pool" },
    { src: "/images/properties/coastal-cottage/patio.jpeg", alt: "Screened patio with comfortable seating" },
    { src: "/images/properties/coastal-cottage/living-room.jpeg", alt: "Cozy living room with coastal decor" },
    { src: "/images/properties/coastal-cottage/kitchen.jpeg", alt: "Fully equipped kitchen with modern appliances" },
    { src: "/images/properties/coastal-cottage/bedroom1.jpeg", alt: "Primary bedroom with queen-size bed" },
    { src: "/images/properties/coastal-cottage/bedroom2.jpeg", alt: "Second bedroom with comfortable bedding" },
    { src: "/images/properties/coastal-cottage/bathroom1.jpeg", alt: "Primary bathroom with modern fixtures" },
    { src: "/images/properties/coastal-cottage/bathroom2.jpeg", alt: "Second bathroom with shower" },
    { src: "/images/properties/coastal-cottage/backyard.jpeg", alt: "Landscaped backyard with pool area" },
  ],
  amenityHighlights: ["Heated Saltwater Pool", "65\" HDTV", "Self Check-in", "Full Kitchen", "Dedicated Workspace"],
  features: [
    "Heated Saltwater Pool",
    "Outdoor Shower",
    "65\" HDTV & Sound System",
    "Self Check-in",
    "High-Speed WiFi",
    "Full Kitchen",
    "Dedicated Workspace",
    "Screened Patio",
    "Free Garage Parking (2 spaces)",
    "Washer & Dryer",
    "Central AC & Heating",
    "Security Cameras (Exterior)",
    "Beach Gear Provided",
    "Single Level Home",
    "Long Term Stays Allowed",
    "Room-Darkening Shades",
    "24/7 Support",
  ],
};

export const properties: Property[] = [floridaGetaway, coastalCottage];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export const testimonials: Testimonial[] = [
  // Florida Getaway Reviews
  {
    name: "Mike",
    property: "Florida Getaway",
    rating: 5,
    text: "We really enjoyed our stay in Florida at Lisa's place. The pool was a huge plus, we spent a lot of time there. The kitchen area was very nice and spacious for when some of our family would come and dine. I really liked the large closets in the larger bedroom. We would definitely like to come and stay again.",
    date: "2025-07-15",
  },
  {
    name: "Kathy",
    property: "Florida Getaway",
    rating: 5,
    text: "Our 2nd time choosing to stay here. Stayed 2 weeks. Absolutely beautiful, spotless home. Everything about this home is A++. Looking forward to yet another stay here!!",
    date: "2025-12-10",
  },
  {
    name: "JoAnna",
    property: "Florida Getaway",
    rating: 5,
    text: "Lisa was a wonderful host; she is very responsive and easy to communicate with. The home is beautiful! We loved every moment of our stay. The pool was immaculate, and the outside area was private and tranquil, perfect for enjoying your coffee in the morning. The inside of the home was spotless and spacious. The furniture was comfortable, and the kitchen was the most fully stocked one we had ever seen on Airbnb. We'll come back again. I was sad to leave!",
    date: "2025-04-15",
  },
  {
    name: "Diana",
    property: "Florida Getaway",
    rating: 5,
    text: "This house was even better than the pictures. We were in awe. Lisa was so accommodating and friendly. We would highly recommend it. Thank you Lisa!",
    date: "2025-03-20",
  },
  {
    name: "Susan",
    property: "Florida Getaway",
    rating: 5,
    text: "Definitely, home away from home -- even better, since there was a heated swimming pool. Home was warm and inviting, comfortable and spacious. Every room was beautifully decorated, kitchen was well-equipped with plenty of spices and condiments. We will definitely stay again.",
    date: "2024-12-15",
  },
  {
    name: "Samantha",
    property: "Florida Getaway",
    rating: 5,
    text: "We stay in Florida for a week twice a year and Lisa's place is by far our favorite place thus far. She had all the things you would need, things we normally have to buy to stay somewhere was there and stocked and saved us time shopping and additional money. The home was beautiful and spacious, beds were comfy, all the kitchen things you would need, the lanai & the pool were perfect (heated feature was awesome to have) with pool floats & even a volleyball net setup. We loved our stay & will definitely be back.",
    date: "2025-01-20",
  },
  {
    name: "Rebecca",
    property: "Florida Getaway",
    rating: 5,
    text: "We loved this private oasis! Our sons loved swimming, throwing darts, and hanging out on the lanai. It felt like their private hangout. The neighborhood is very peaceful with low traffic. The house was spotlessly clean, and felt very comfortable, with so many thoughtful touches. Beds were very comfortable. We would love to stay here again. Overall, a fantastic time and GREAT value for your dollar! You will love it!",
    date: "2025-02-10",
  },
  {
    name: "Elizabeth",
    property: "Florida Getaway",
    rating: 5,
    text: "My family and I had a wonderful time at Lisa's place! It was definitely our home away from home for the week. The house had pretty much anything we could think of from beach towels and chairs to lots of spices to cook with! Everything was as described in the listing and we were incredibly pleased with the place!",
    date: "2024-03-15",
  },
  {
    name: "Teri",
    property: "Florida Getaway",
    rating: 5,
    text: "Had a wonderful time there. The house was very nice just like the pictures show. And Lisa was very good about responding to all my questions. Would definitely stay there again!!",
    date: "2024-03-10",
  },
  {
    name: "Anthony",
    property: "Florida Getaway",
    rating: 5,
    text: "Everything was as stated. House/pool area were awesome. Very comfortable stay and communication with her was awesome.",
    date: "2024-03-20",
  },
  {
    name: "Ronald",
    property: "Florida Getaway",
    rating: 5,
    text: "An excellent, well cared for, comfortable house. We loved our time there. Enjoyed the pool many times. Lisa is a terrific person.",
    date: "2025-02-15",
  },
  {
    name: "Janis",
    property: "Florida Getaway",
    rating: 5,
    text: "Great stay. Enjoyed the house and the pool was very inviting. Would definitely stay there again.",
    date: "2025-02-20",
  },
  {
    name: "Heather",
    property: "Florida Getaway",
    rating: 5,
    text: "Wonderful place to stay! Host is very responsive and helpful. This home is beautiful! Clean, comfortable and relaxing.",
    date: "2024-04-10",
  },
  {
    name: "Karen",
    property: "Florida Getaway",
    rating: 5,
    text: "Fantastic location. The house is more than we expected in every way. Lisa deserves five stars in every way!!!",
    date: "2024-04-15",
  },
  {
    name: "Jonathan",
    property: "Florida Getaway",
    rating: 5,
    text: "Very roomy, new appliances, everything works.",
    date: "2024-12-20",
  },
  {
    name: "Lynn",
    property: "Florida Getaway",
    rating: 5,
    text: "Our experience was all positive, everything at the home was as advertised and more! Really appreciated the extra touches, such as beach towels, chairs, umbrella, water. There were extra toiletries, plenty of paper goods, kitchen was well stocked. Lisa gave helpful recommendations and was responsive to any questions. We especially enjoyed the pool and lanai! Would stay here again!",
    date: "2024-03-25",
  },
  {
    name: "Jim",
    property: "Florida Getaway",
    rating: 5,
    text: "We had a great stay. The location is very quiet and felt very private. The house was clean and well appointed. The pool was clean and very nicely heated during our stay. The house is in a convenient location for restaurants and activities. There is a great big screen television in the living room area. We would stay here again if in the area.",
    date: "2024-02-15",
  },
  {
    name: "Denise",
    property: "Florida Getaway",
    rating: 5,
    text: "We loved our time at Lisa's place. Everything we hoped for and more. Very disability friendly and spacious. Loved the heated salt water pool. Very responsive host. Hope to return!",
    date: "2024-01-20",
  },
  {
    name: "Sue",
    property: "Florida Getaway",
    rating: 5,
    text: "We were very impressed with Lisa's home. The house was much bigger than expected and had everything we needed and more! It was clean and in a very nice, quiet neighborhood. Lisa was available for anything we needed. We would definitely stay here again and recommend Lisa's home for your stay.",
    date: "2024-01-15",
  },
  {
    name: "Jill",
    property: "Florida Getaway",
    rating: 5,
    text: "Lisa's place was stocked with everything you need and more. The lanai was our favorite part. Quiet, peaceful and everything you would want for outdoor entertainment. All furniture and decor was very nice. We are bed snobs and the beds were very comfortable too.",
    date: "2024-01-10",
  },
  {
    name: "Jennifer",
    property: "Florida Getaway",
    rating: 5,
    text: "Lisa's place was beautiful and very clean. She thought of everything to make the stay amazing. Lots of details and thoughtful extras. I would highly recommend this place and would love to come back.",
    date: "2023-06-15",
  },
  {
    name: "Chris",
    property: "Florida Getaway",
    rating: 5,
    text: "Such a comfortable place, with all the necessities of home. We highly recommend this beautiful home.",
    date: "2024-03-18",
  },
  {
    name: "Joe",
    property: "Florida Getaway",
    rating: 5,
    text: "Was sad to leave. Lisa got a nice gem there, she thought of everything!",
    date: "2023-07-15",
  },
  {
    name: "Maureen",
    property: "Florida Getaway",
    rating: 5,
    text: "Beautiful home — high end finishes — easily accessible to Tamiami Trail where everything is!",
    date: "2023-06-20",
  },
  // Coastal Cottage Reviews
  {
    name: "Cheryl",
    property: "Coastal Cottage",
    rating: 5,
    text: "We loved this house. Very cozy feel, just like our own home would be. Great outdoor spaces that enabled us to host immediate family for a holiday get together. The kids loved the pool and had ample space to play in the yard. We had everything we needed. Lisa was very responsive and very kind. Will definitely look to see if this house is available the next time we visit the area.",
    date: "2026-01-15",
  },
  {
    name: "Kathy",
    property: "Coastal Cottage",
    rating: 5,
    text: "Lisa's home was very clean and neat. The neighborhood was quiet and peaceful. She has thought of special things that made life easier, hooks for towels and clothing, plenty of hangers and the ability to make it dark so we could sleep in. If we find ourselves going to this area again we would definitely check to see if this place is available.",
    date: "2026-02-15",
  },
  {
    name: "Kimberly",
    property: "Coastal Cottage",
    rating: 5,
    text: "Lisa's place was more than expected. She has everything. It was very clean. Plenty of space. Several nice set up areas for enjoying the pool and the outdoors.",
    date: "2026-02-20",
  },
  {
    name: "Tracey",
    property: "Coastal Cottage",
    rating: 5,
    text: "Absolute Gem!!! This Coastal Cottage lives up to its name!!! It's more than a Cottage, it's a beautiful decorative house with all of the Coastal vibes!! House is very spacious and clean!! The moment we walked into the house, it felt like home!! You can feel the warmth and all of the thoughtful touches and attention to detail. The house was well stocked with all the comforts of home. The lanai and sitting by the pool was just so relaxing. The host, Lisa, was in constant touch to make sure there were no issues. I would definitely stay here again!!!",
    date: "2024-03-15",
  },
  {
    name: "Kaydence",
    property: "Coastal Cottage",
    rating: 5,
    text: "This home in Port Charlotte was exactly what we were looking for. Everything was as pictured and the home itself was beautiful. The neighborhood was quiet and calm which was refreshing for a chill vacation. The location was about 5-10 mins from local restaurants, and about 30-45 to multiple beaches. The pool was very nice and relaxing. Everything was clean & the kitchen had everything you needed. Lisa was very responsive and answered almost immediately every time we chatted. I would definitely recommend and would book again if coming to this area!",
    date: "2024-04-10",
  },
  {
    name: "Valerie",
    property: "Coastal Cottage",
    rating: 5,
    text: "Lisa's house was beyond our expectations. It is spacious and beautifully decorated. Everything was provided, including beach gear. It made for a peaceful, homey vacation.",
    date: "2025-03-20",
  },
  {
    name: "Deborah",
    property: "Coastal Cottage",
    rating: 5,
    text: "My cousins, my husband and I were looking for a place to get relief from the winter weather in the north. We're all retired and took a chance on Lisa's listing. We weren't disappointed! The house was perfect for us. We especially loved the heated pool.",
    date: "2025-03-10",
  },
  {
    name: "Debra",
    property: "Coastal Cottage",
    rating: 5,
    text: "Lisa is an exceptional host. Very responsive to any concerns, with fast response time. Home is beautifully decorated & so tasteful. Back yard is quite private & neighborhood is quiet with minimal traffic. Able to walk & feel safe! Kitchen is well equipped.",
    date: "2025-02-15",
  },
  {
    name: "JD",
    property: "Coastal Cottage",
    rating: 5,
    text: "We were so excited to be able to stay blocks from our family for Christmas. I loved the location, the comforts of home and space. Coffee on the Lanai, poolside relaxation. Everything was perfect. Lisa was super responsive to all our needs while we were here. Thanks to the awesome host. We plan to be back next year if the family remains local to this area.",
    date: "2024-12-20",
  },
  {
    name: "Randi",
    property: "Coastal Cottage",
    rating: 5,
    text: "We had a great week at Lisa's beautiful home. The pictures were exactly what the house looked like. The home was stocked with everything anyone could, or would need. There were clear instructions in the house about what needed to be done, trash, etc., and we loved that all the light switches were marked! The pool was great to have, and so refreshing with the HOT weather. Lisa was very responsive when we texted her with questions. We especially loved the screened in patio area. Thank you Lisa, for sharing your home with us!",
    date: "2024-07-15",
  },
  {
    name: "Alex",
    property: "Coastal Cottage",
    rating: 5,
    text: "Great location. Clean. Matched the pictures and description.",
    date: "2025-01-15",
  },
  {
    name: "Renee",
    property: "Coastal Cottage",
    rating: 5,
    text: "Although we were never able to stay at Lisa's place — we experienced a medical emergency the day before our arrival — Lisa was sympathetic and cooperative to cancel our last-minute reservation. After we are cleared and on the road to recovery, we look forward to rebooking. Thank you, again, Lisa for making the process stress-free. You are very kind!!!!!",
    date: "2026-02-25",
  },
];

export const amenities: Amenity[] = [
  {
    title: "Heated Pools",
    description: "Take a dip year-round in our sparkling heated pools",
    icon: "fire",
  },
  {
    title: "Fully Furnished",
    description: "Move-in ready with premium furniture and linens",
    icon: "home",
  },
  {
    title: "Prime Location",
    description: "Just 25 minutes from stunning Gulf Coast beaches",
    icon: "map-pin",
  },
  {
    title: "Modern Kitchen",
    description: "Fully equipped kitchens for home-cooked meals",
    icon: "fork-knife",
  },
  {
    title: "Entertainment",
    description: "Smart TVs, high-speed WiFi, and streaming services",
    icon: "tv",
  },
  {
    title: "Outdoor Spaces",
    description: "Patios, pools, and beautifully landscaped yards",
    icon: "sun",
  },
  {
    title: "Free Parking",
    description: "Complimentary private parking for all guests",
    icon: "car",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock host support for your peace of mind",
    icon: "phone",
  },
  {
    title: "Self Check-in",
    description: "Easy keyless entry for a seamless arrival",
    icon: "key",
  },
];

export const siteConfig = {
  name: "Nunez Vacation Homes",
  description:
    "Experience luxury vacation rentals in Port Charlotte, Florida. Stunning homes with pools near Gulf Coast beaches.",
  url: "https://nunezvacationhomes.com",
  email: "info@nunezvacationhomes.com",
  location: "Port Charlotte, FL",
  coordinates: { lat: 26.976, lng: -82.091 },
  social: { facebook: "#", instagram: "#", airbnb: "#" },
};
