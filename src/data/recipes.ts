import shakeA from '../../assets/recipes/Screenshot 2026-10-22 at 22.02.22.webp';
import crepesA from '../../assets/recipes/Screenshot 2026-10-22 at 22.04.03.webp';
import breadRolls from '../../assets/recipes/Screenshot 2026-10-22 at 22.04.14.webp';
import lavaCookies from '../../assets/recipes/Screenshot 2026-10-22 at 22.04.25.webp';
import cookies from '../../assets/recipes/Screenshot 2026-10-22 at 22.04.44.webp';
import miniBites from '../../assets/recipes/Screenshot 2026-10-22 at 22.04.53.webp';
import churrosB from '../../assets/recipes/Screenshot 2026-10-22 at 22.05.08.webp';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Breakfast' | 'Dessert' | 'Quick Bite';
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium';
  servings: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
  imageTheme: 'toast' | 'waffle' | 'pancake' | 'icecream';
  image?: string;
}

type RecipeSeed = Pick<Recipe, 'id' | 'title' | 'subtitle' | 'category' | 'image'> & Partial<Recipe>;

const makeRecipe = (recipe: RecipeSeed): Recipe => ({
  prepTime: '10 mins',
  cookTime: '10 mins',
  difficulty: 'Easy',
  servings: 'To be confirmed',
  description: `${recipe.title} made with Woxwaffy chocolate spread. This recipe card is serving inspiration; final quantities and allergen guidance remain to be verified.`,
  ingredients: ['Woxwaffy chocolate spread', 'Supporting ingredients shown on the recipe card', 'Optional toppings to taste'],
  instructions: ['Review the pictured recipe card and prepare the listed ingredients.', 'Combine and cook or blend as illustrated.', 'Finish with Woxwaffy and serve fresh.'],
  tips: 'Confirm final ingredients, quantities, temperature guidance and allergens before publishing.',
  imageTheme: 'toast',
  ...recipe,
});

export const RECIPES: Recipe[] = [
  makeRecipe({ id:'woxwaffy-shake-classic', title:'Classic Woxwaffy Shake', subtitle:'A cold and creamy chocolate shake.', category:'Quick Bite', image:shakeA, cookTime:'0 mins', imageTheme:'icecream' }),
  makeRecipe({ id:'woxwaffy-crepes-classic', title:'Chocolate-Filled Woxwaffy Crepes', subtitle:'Soft crepes rolled around a chocolate centre.', category:'Breakfast', image:crepesA, imageTheme:'pancake' }),
  makeRecipe({ id:'woxwaffy-bread-rolls', title:'Crispy Woxwaffy Bread Rolls', subtitle:'Golden bread rolls with a gooey centre.', category:'Quick Bite', image:breadRolls, imageTheme:'toast' }),
  makeRecipe({ id:'woxwaffy-lava-cookies', title:'Woxwaffy Lava Cookies', subtitle:'Chocolate cookies with a molten centre.', category:'Dessert', image:lavaCookies, prepTime:'15 mins', cookTime:'13 mins', difficulty:'Medium', imageTheme:'toast' }),
  makeRecipe({ id:'woxwaffy-cookies', title:'Soft Woxwaffy Chocolate Cookies', subtitle:'Soft, gooey and chocolatey cookies.', category:'Dessert', image:cookies, prepTime:'15 mins', cookTime:'11 mins', imageTheme:'toast' }),
  makeRecipe({ id:'woxwaffy-mini-bites', title:'Mini Woxwaffy Bites', subtitle:'Small chocolate-topped bread bites for sharing.', category:'Quick Bite', image:miniBites, imageTheme:'toast' }),
  makeRecipe({ id:'woxwaffy-churros-full', title:'Cinnamon Churros & Woxwaffy Dip', subtitle:'The complete homemade churros guide.', category:'Dessert', image:churrosB, prepTime:'10 mins', cookTime:'20 mins', difficulty:'Medium', imageTheme:'toast' }),
];
