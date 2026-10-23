import secondProductImage from '../../assets/Screenshot 2026-10-22 at 21.18.31.webp';
import thirdProductImage from '../../assets/Unknown.webp';

export interface Product {
  id: string;
  name: string;
  sinhalaName: string;
  tagline: string;
  weight: string;
  status: 'available' | 'coming-soon';
  description: string;
  image: string;
  keyFeatures: string[];
  pairingSuggestions: string[];
  ingredientsVerified: string[];
  servingSize: string;
  packaging: string;
  origin: string;
  accentColor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'woxwaffy-peanut-200g',
    name: 'Woxwaffy Chocolate Spread with Peanut',
    sinhalaName: 'රටකජු මිශ්‍ර චොක්ලට් තැවරැම',
    tagline: 'Spread The Happiness',
    weight: '200g (Net Wt.)',
    status: 'available',
    image: '/assets/woxwaffy-chocolate-spread-jar.webp',
    description:
      'The signature Woxwaffy creation: rich, velvety cocoa blended smoothly with crunchy roasted peanuts. Crafted in Sri Lanka to bring authentic warmth and indulgent sweetness to every slice, waffle, and spoon.',
    keyFeatures: [
      'Velvety smooth cocoa base with roasted peanut bits',
      'Effortless spreadability at room temperature',
      'Airtight glass jar with golden preservation lid',
      'Ideal for breakfast toast, warm waffles, pancakes, and dessert dips',
    ],
    pairingSuggestions: [
      'Fresh toasted sourdough or brioche',
      'Golden Belgian buttermilk waffles',
      'Fluffy pancake stacks with sliced bananas',
      'Dip for strawberries and crisp butter biscuits',
    ],
    ingredientsVerified: [
      'Refined Sugar',
      'Vegetable Oil / Fat',
      'Roasted Peanuts (Ground & Crushed Bits)',
      'Cocoa Powder',
      'Milk Solids / Skim Milk Powder',
      'Emulsifier (Soy Lecithin / Plant-Derived)',
      'Natural & Nature-Identical Vanilla Flavoring',
    ],
    servingSize: '20g (Approx. 1 Tablespoon)',
    packaging: 'Recyclable Premium Glass Jar (200g)',
    origin: 'Crafted in Sri Lanka',
    accentColor: '#C27D38',
  },
  {
    id: 'woxwaffy-dark-cocoa-200g',
    name: 'Woxwaffy Deep Dark Cocoa Spread',
    sinhalaName: 'තද චොක්ලට් තැවරැම',
    tagline: 'Bold, Intense & Luscious',
    weight: '200g (Net Wt.)',
    status: 'coming-soon',
    image: secondProductImage,
    description:
      'An intense, high-cacao variant crafted for dark chocolate connoisseurs. Deeper bittersweet notes paired with our signature silky texture.',
    keyFeatures: [
      'High-cacao dark roast blend',
      'Balanced bittersweet finish with subtle caramel undertones',
      'Ultra-smooth dessert finish',
      'Single-origin inspired recipe',
    ],
    pairingSuggestions: [
      'Dark roast espresso and warm croissants',
      'Tart fresh berries and Greek yogurt bowls',
      'Lava cake centers and pastry fillings',
    ],
    ingredientsVerified: [
      'Premium Cocoa Mass & Cocoa Powder',
      'Vegetable Oil',
      'Cane Sugar',
      'Roasted Peanut Essence',
      'Emulsifier',
    ],
    servingSize: '20g (Approx. 1 Tablespoon)',
    packaging: 'Recyclable Premium Glass Jar (200g)',
    origin: 'Crafted in Sri Lanka',
    accentColor: '#381E13',
  },
  {
    id: 'woxwaffy-crunch-caramel-200g',
    name: 'Woxwaffy Hazelnut & Honey Crunch',
    sinhalaName: 'කැරමල් සහ ඇට වර්ග තැවරැම',
    tagline: 'Crisp Texture & Golden Honey Sweetness',
    weight: '200g (Net Wt.)',
    status: 'coming-soon',
    image: thirdProductImage,
    description:
      'A playful crunch profile featuring roasted nuts and honeycomb crisps suspended in velvety chocolate spread.',
    keyFeatures: [
      'Extra crunchy texture in every spoonful',
      'Golden caramel and roasted nut notes',
      'Perfect topping for artisanal ice creams and crepes',
      'Slow-churned consistency',
    ],
    pairingSuggestions: [
      'Crispy Belgian waffle grids',
      'French crepes with caramelized banana',
      'Chilled vanilla bean gelato',
    ],
    ingredientsVerified: [
      'Cocoa Solids',
      'Roasted Peanuts & Nuts',
      'Honey Caramel Crumbles',
      'Milk Powder',
      'Vegetable Fat',
    ],
    servingSize: '20g (Approx. 1 Tablespoon)',
    packaging: 'Recyclable Premium Glass Jar (200g)',
    origin: 'Crafted in Sri Lanka',
    accentColor: '#D8954F',
  },
];

export const BRAND_HIGHLIGHTS = [
  {
    title: 'Sri Lankan Craft',
    description: 'Born and made in Sri Lanka, celebrating local confectionery passion and tropical warmth.',
    stat: '100%',
    statLabel: 'Locally Produced',
  },
  {
    title: 'Roasted Peanuts',
    description: 'Carefully roasted peanuts folded into velvety chocolate for an unmistakable aroma and crunch.',
    stat: '200g',
    statLabel: 'Generous Glass Jar',
  },
  {
    title: 'Silky Spreadability',
    description: 'Glides smoothly onto delicate bread, warm waffles, or pancakes without tearing the crumb.',
    stat: '0s',
    statLabel: 'Prep Time Needed',
  },
  {
    title: 'Recyclable Glass',
    description: 'Packaged in durable, reusable glass jars with airtight gold seal lids to lock in freshness.',
    stat: 'Eco',
    statLabel: 'Glass Preservation',
  },
];
