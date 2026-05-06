// app.js - This file contains all the AI logic for the fitness recommendation system

// ===== EXERCISE DATABASE =====
// This object stores workout plans organised by fitness goal and difficulty level
// Each goal has 5 difficulty levels (1 = easiest, 5 = hardest / elite)
var workoutPlans = {

    // Workouts for users whose goal is to lose weight
    lose_weight: {
        1: ["10 Push-Ups", "15 Squats", "10 minute brisk walk", "20 Jumping Jacks"],
        2: ["15 Push-Ups", "20 Squats", "15 minute jog", "30 Jumping Jacks"],
        3: ["20 Push-Ups", "25 Squats", "20 minute run", "3 sets of 10 Lunges"],
        4: ["30 Push-Ups", "30 Squats", "25 minute run", "3 sets of 15 Burpees"],
        5: ["50 Push-Ups", "50 Squats", "35 minute run", "4 sets of 20 Burpees", "3 sets of 20 Mountain Climbers"]
        // Level 5 is elite - extra exercise added and reps increased significantly
    },

    // Workouts for users whose goal is to build muscle
    build_muscle: {
        1: ["10 Push-Ups", "10 Chair Dips", "15 Squats", "10 Sit-Ups"],
        2: ["15 Push-Ups", "15 Chair Dips", "20 Squats", "15 Sit-Ups"],
        3: ["3 sets of 10 Push-Ups", "3 sets of 10 Chair Dips", "3 sets of 15 Squats", "20 Sit-Ups"],
        4: ["4 sets of 12 Push-Ups", "4 sets of 12 Chair Dips", "4 sets of 20 Squats", "3 sets of 20 Sit-Ups"],
        5: ["5 sets of 20 Push-Ups", "5 sets of 15 Chair Dips", "5 sets of 25 Squats", "4 sets of 20 Sit-Ups", "3 sets of 15 Pike Push-Ups"]
        // Level 5 elite - five exercises, high volume
    },

    // Workouts for users whose goal is to improve general fitness
    improve_fitness: {
        1: ["10 minute walk", "10 Push-Ups", "15 Sit-Ups", "10 Star Jumps"],
        2: ["15 minute jog", "15 Push-Ups", "20 Sit-Ups", "20 Star Jumps"],
        3: ["20 minute run", "20 Push-Ups", "25 Sit-Ups", "30 Star Jumps"],
        4: ["25 minute run", "25 Push-Ups", "30 Sit-Ups", "40 Star Jumps"],
        5: ["35 minute run", "4 sets of 20 Push-Ups", "4 sets of 20 Sit-Ups", "4 sets of 20 Burpees", "50 Star Jumps"]
        // Level 5 elite - longer run, sets added to every exercise
    },

    // Workouts for users whose goal is to maintain their current fitness
    maintain: {
        1: ["10 Push-Ups", "10 Squats", "10 Sit-Ups", "5 minute stretch"],
        2: ["15 Push-Ups", "15 Squats", "15 Sit-Ups", "10 minute walk"],
        3: ["20 Push-Ups", "20 Squats", "20 Sit-Ups", "15 minute walk"],
        4: ["25 Push-Ups", "25 Squats", "25 Sit-Ups", "20 minute jog"],
        5: ["30 Push-Ups", "30 Squats", "30 Sit-Ups", "25 minute run", "3 sets of 15 Lunges"]
        // Level 5 elite - run replaces jog, lunges added
    }
};

// ===== MEAL DATABASE =====
// Each dietary preference has 3 rotating meal sets per goal
// Each meal set includes breakfast, lunch, dinner, and approximate nutrition info
// The system cycles through sets 0, 1, 2 to give variety each day
var mealPlans = {

    // Meals for users with no dietary restrictions
    no_preference: {
        lose_weight: [
            { breakfast: "Scrambled eggs with spinach", lunch: "Grilled chicken salad", dinner: "Baked salmon with steamed vegetables", nutrition: { calories: "~1,500 kcal", protein: "~130g", carbs: "~100g", fat: "~50g" } },
            { breakfast: "Greek yogurt with mixed berries", lunch: "Turkey and avocado wrap", dinner: "Grilled cod with roasted vegetables", nutrition: { calories: "~1,450 kcal", protein: "~120g", carbs: "~110g", fat: "~45g" } },
            { breakfast: "Poached eggs on wholemeal toast", lunch: "Tuna salad bowl", dinner: "Chicken stir-fry with broccoli", nutrition: { calories: "~1,480 kcal", protein: "~125g", carbs: "~105g", fat: "~48g" } },
            { breakfast: "Smoked salmon with cream cheese on rye bread", lunch: "Prawn and cucumber salad", dinner: "Baked chicken breast with green beans and sweet potato", nutrition: { calories: "~1,460 kcal", protein: "~128g", carbs: "~98g", fat: "~47g" } },
            { breakfast: "Boiled eggs and avocado on wholemeal toast", lunch: "Chicken and vegetable broth with barley", dinner: "Turkey breast with stir-fried asparagus and brown rice", nutrition: { calories: "~1,440 kcal", protein: "~122g", carbs: "~102g", fat: "~44g" } },
            { breakfast: "Cottage cheese with pineapple and oatcakes", lunch: "Tuna stuffed pepper with side salad", dinner: "Baked white fish with roasted courgette and peppers", nutrition: { calories: "~1,420 kcal", protein: "~118g", carbs: "~100g", fat: "~43g" } }
        ],
        build_muscle: [
            { breakfast: "Oats with banana and a protein shake", lunch: "Chicken, rice and broccoli", dinner: "Steak with sweet potato", nutrition: { calories: "~2,600 kcal", protein: "~185g", carbs: "~260g", fat: "~72g" } },
            { breakfast: "4 scrambled eggs with wholemeal toast", lunch: "Tuna pasta with vegetables", dinner: "Salmon with rice and stir-fried vegetables", nutrition: { calories: "~2,500 kcal", protein: "~175g", carbs: "~250g", fat: "~68g" } },
            { breakfast: "Peanut butter on toast with a glass of milk", lunch: "Chicken wrap with cheese and salad", dinner: "Beef mince with pasta and tomato sauce", nutrition: { calories: "~2,550 kcal", protein: "~180g", carbs: "~255g", fat: "~70g" } },
            { breakfast: "Oat pancakes with eggs and maple syrup", lunch: "Beef and rice bowl with roasted vegetables", dinner: "Chicken thighs with mashed potato and broccoli", nutrition: { calories: "~2,580 kcal", protein: "~182g", carbs: "~258g", fat: "~71g" } },
            { breakfast: "Smashed avocado and eggs on thick-cut toast", lunch: "Tuna and sweetcorn jacket potato with cheese", dinner: "Pork loin with roasted potatoes and greens", nutrition: { calories: "~2,520 kcal", protein: "~176g", carbs: "~252g", fat: "~69g" } },
            { breakfast: "High-protein granola with whole milk and banana", lunch: "Grilled chicken and avocado wrap with salad", dinner: "Lamb mince shepherd's pie with peas", nutrition: { calories: "~2,560 kcal", protein: "~179g", carbs: "~255g", fat: "~70g" } }
        ],
        improve_fitness: [
            { breakfast: "Greek yogurt with mixed berries", lunch: "Tuna wrap with salad", dinner: "Grilled chicken with wholegrain pasta", nutrition: { calories: "~2,000 kcal", protein: "~150g", carbs: "~200g", fat: "~65g" } },
            { breakfast: "Porridge with sliced banana", lunch: "Chicken salad sandwich on wholemeal", dinner: "Salmon with sweet potato and greens", nutrition: { calories: "~1,950 kcal", protein: "~145g", carbs: "~195g", fat: "~62g" } },
            { breakfast: "Scrambled eggs on toast with orange juice", lunch: "Prawn and avocado salad", dinner: "Turkey meatballs with spaghetti", nutrition: { calories: "~2,020 kcal", protein: "~152g", carbs: "~205g", fat: "~66g" } },
            { breakfast: "Wholegrain toast with eggs and sliced tomatoes", lunch: "Sweet potato and black bean wrap", dinner: "Grilled sea bass with new potatoes and greens", nutrition: { calories: "~1,980 kcal", protein: "~148g", carbs: "~198g", fat: "~64g" } },
            { breakfast: "Banana and oat smoothie with almond butter", lunch: "Jacket potato with tuna and sweetcorn", dinner: "Chicken and vegetable stir-fry with egg noodles", nutrition: { calories: "~2,010 kcal", protein: "~152g", carbs: "~202g", fat: "~65g" } },
            { breakfast: "Muesli with semi-skimmed milk and fresh fruit", lunch: "Grilled chicken and hummus wrap", dinner: "Baked salmon with roasted new potatoes", nutrition: { calories: "~1,960 kcal", protein: "~146g", carbs: "~196g", fat: "~63g" } }
        ],
        maintain: [
            { breakfast: "Porridge with honey", lunch: "Chicken sandwich on wholemeal", dinner: "Spaghetti bolognese", nutrition: { calories: "~1,800 kcal", protein: "~140g", carbs: "~180g", fat: "~60g" } },
            { breakfast: "Boiled eggs with wholemeal toast", lunch: "Ham and cheese wrap with salad", dinner: "Grilled salmon with new potatoes", nutrition: { calories: "~1,780 kcal", protein: "~135g", carbs: "~175g", fat: "~58g" } },
            { breakfast: "Cereal with semi-skimmed milk", lunch: "Tuna jacket potato", dinner: "Chicken curry with basmati rice", nutrition: { calories: "~1,820 kcal", protein: "~142g", carbs: "~185g", fat: "~61g" } },
            { breakfast: "Smoked salmon and cream cheese bagel", lunch: "Chicken Caesar wrap", dinner: "Baked cod with chips and mushy peas", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~183g", fat: "~61g" } },
            { breakfast: "Beans on wholemeal toast with two poached eggs", lunch: "Grilled chicken with quinoa salad", dinner: "Lamb chops with roasted vegetables and minted potatoes", nutrition: { calories: "~1,795 kcal", protein: "~138g", carbs: "~180g", fat: "~60g" } },
            { breakfast: "Granola with mixed berries and natural yogurt", lunch: "Prawn and avocado wrap with salad", dinner: "Beef steak with sweet potato wedges and salad", nutrition: { calories: "~1,830 kcal", protein: "~143g", carbs: "~186g", fat: "~62g" } }
        ]
    },

    // Meals for vegetarian users
    vegetarian: {
        lose_weight: [
            { breakfast: "Greek yogurt with fresh fruit", lunch: "Lentil soup with wholemeal bread", dinner: "Stir-fried tofu with mixed vegetables", nutrition: { calories: "~1,450 kcal", protein: "~95g", carbs: "~145g", fat: "~42g" } },
            { breakfast: "Smoothie bowl with granola and seeds", lunch: "Caprese salad with wholemeal bread", dinner: "Light vegetable curry with cauliflower rice", nutrition: { calories: "~1,400 kcal", protein: "~88g", carbs: "~150g", fat: "~40g" } },
            { breakfast: "Poached eggs with avocado on toast", lunch: "Roasted vegetable wrap with hummus", dinner: "Courgette noodles with tomato and basil sauce", nutrition: { calories: "~1,420 kcal", protein: "~90g", carbs: "~148g", fat: "~41g" } },
            { breakfast: "Overnight oats with chia seeds and berries", lunch: "Halloumi salad with lemon dressing", dinner: "Roasted aubergine with tomato sauce and quinoa", nutrition: { calories: "~1,400 kcal", protein: "~85g", carbs: "~145g", fat: "~40g" } },
            { breakfast: "Fruit salad with cottage cheese and seeds", lunch: "Spinach and feta wrap with salad", dinner: "Grilled paneer with stir-fried vegetables", nutrition: { calories: "~1,380 kcal", protein: "~82g", carbs: "~140g", fat: "~38g" } },
            { breakfast: "Smoothie with spinach, banana and almond milk", lunch: "Tomato and lentil soup with rye bread", dinner: "Egg fried rice with broccoli and peas (light oil)", nutrition: { calories: "~1,410 kcal", protein: "~87g", carbs: "~147g", fat: "~39g" } }
        ],
        build_muscle: [
            { breakfast: "Oats with mixed nuts and seeds", lunch: "Chickpea curry with basmati rice", dinner: "Lentil dal with naan bread", nutrition: { calories: "~2,400 kcal", protein: "~130g", carbs: "~280g", fat: "~65g" } },
            { breakfast: "Peanut butter toast with banana and milk", lunch: "Halloumi and quinoa salad", dinner: "Bean and cheese burrito", nutrition: { calories: "~2,380 kcal", protein: "~125g", carbs: "~275g", fat: "~63g" } },
            { breakfast: "Cottage cheese with fresh fruit", lunch: "Lentil and vegetable soup with bread", dinner: "Paneer tikka with rice", nutrition: { calories: "~2,420 kcal", protein: "~132g", carbs: "~282g", fat: "~66g" } },
            { breakfast: "Egg and cheese omelette with wholemeal toast", lunch: "Greek salad with extra halloumi and bread", dinner: "Chickpea and spinach curry with basmati rice", nutrition: { calories: "~2,400 kcal", protein: "~128g", carbs: "~278g", fat: "~64g" } },
            { breakfast: "Banana and peanut butter smoothie with oats", lunch: "Veggie burger with cheese and sweet potato fries", dinner: "Lentil and mushroom bolognese with pasta", nutrition: { calories: "~2,420 kcal", protein: "~130g", carbs: "~280g", fat: "~65g" } },
            { breakfast: "French toast with eggs and maple syrup", lunch: "Mixed bean and avocado bowl with rice", dinner: "Spinach and ricotta stuffed pasta with tomato sauce", nutrition: { calories: "~2,440 kcal", protein: "~132g", carbs: "~285g", fat: "~66g" } }
        ],
        improve_fitness: [
            { breakfast: "Banana and spinach smoothie", lunch: "Veggie wrap with hummus and salad", dinner: "Pasta with tomato sauce and cheese", nutrition: { calories: "~1,900 kcal", protein: "~85g", carbs: "~240g", fat: "~58g" } },
            { breakfast: "Porridge with mixed berries and honey", lunch: "Egg salad sandwich on wholemeal", dinner: "Vegetable stir-fry with noodles", nutrition: { calories: "~1,880 kcal", protein: "~82g", carbs: "~235g", fat: "~56g" } },
            { breakfast: "Yogurt parfait with granola and fruit", lunch: "Tomato soup with crusty bread", dinner: "Mushroom and pea risotto", nutrition: { calories: "~1,920 kcal", protein: "~86g", carbs: "~242g", fat: "~59g" } },
            { breakfast: "Avocado on toast with a poached egg", lunch: "Vegetable and bean chilli wrap", dinner: "Courgette and goat's cheese frittata with salad", nutrition: { calories: "~1,870 kcal", protein: "~80g", carbs: "~232g", fat: "~57g" } },
            { breakfast: "Blueberry and almond overnight oats", lunch: "Halloumi and quinoa salad with lemon dressing", dinner: "Vegetable curry with basmati rice and naan", nutrition: { calories: "~1,910 kcal", protein: "~84g", carbs: "~238g", fat: "~59g" } },
            { breakfast: "Nut butter and banana on wholemeal toast", lunch: "Lentil and roasted pepper soup with crusty bread", dinner: "Pasta with roasted vegetables and pesto", nutrition: { calories: "~1,890 kcal", protein: "~82g", carbs: "~235g", fat: "~58g" } }
        ],
        maintain: [
            { breakfast: "Toast with fried eggs and avocado", lunch: "Caprese salad with balsamic dressing", dinner: "Vegetable lasagne", nutrition: { calories: "~1,750 kcal", protein: "~80g", carbs: "~195g", fat: "~62g" } },
            { breakfast: "Pancakes with fruit and honey", lunch: "Quiche with green salad", dinner: "Vegetable and lentil stew with bread", nutrition: { calories: "~1,730 kcal", protein: "~78g", carbs: "~190g", fat: "~60g" } },
            { breakfast: "Granola with milk and mixed berries", lunch: "Cheese and tomato toastie with salad", dinner: "Butternut squash soup with crusty bread", nutrition: { calories: "~1,760 kcal", protein: "~81g", carbs: "~198g", fat: "~63g" } },
            { breakfast: "Avocado toast with feta and cherry tomatoes", lunch: "Tomato and mozzarella panini with salad", dinner: "Sweet potato and red lentil dhal with roti", nutrition: { calories: "~1,740 kcal", protein: "~79g", carbs: "~193g", fat: "~61g" } },
            { breakfast: "Porridge with almond butter and banana", lunch: "Roasted vegetable and hummus flatbread", dinner: "Mushroom stroganoff with rice", nutrition: { calories: "~1,760 kcal", protein: "~81g", carbs: "~196g", fat: "~62g" } },
            { breakfast: "Yogurt with mango, mixed seeds and honey", lunch: "Spinach and feta quesadilla with salsa", dinner: "Pea and asparagus risotto with parmesan", nutrition: { calories: "~1,770 kcal", protein: "~82g", carbs: "~198g", fat: "~63g" } }
        ]
    },

    // Meals for vegan users
    vegan: {
        lose_weight: [
            { breakfast: "Overnight oats with almond milk and seeds", lunch: "Mixed bean and corn salad", dinner: "Roasted vegetables with quinoa", nutrition: { calories: "~1,380 kcal", protein: "~75g", carbs: "~160g", fat: "~38g" } },
            { breakfast: "Fruit smoothie with flaxseeds and oat milk", lunch: "Chickpea and spinach salad with lemon dressing", dinner: "Lentil soup with wholemeal bread", nutrition: { calories: "~1,350 kcal", protein: "~70g", carbs: "~155g", fat: "~36g" } },
            { breakfast: "Chia pudding with fresh berries", lunch: "Tofu and roasted vegetable wrap", dinner: "Courgette noodles with avocado and tomato", nutrition: { calories: "~1,360 kcal", protein: "~72g", carbs: "~157g", fat: "~37g" } },
            { breakfast: "Green smoothie with kale, apple and ginger", lunch: "Roasted vegetable and lentil salad", dinner: "Butternut squash and chickpea tagine", nutrition: { calories: "~1,340 kcal", protein: "~68g", carbs: "~152g", fat: "~35g" } },
            { breakfast: "Banana oat pancakes with berries", lunch: "Avocado and tomato salad on rye bread", dinner: "Tofu and broccoli stir-fry with brown rice", nutrition: { calories: "~1,360 kcal", protein: "~70g", carbs: "~155g", fat: "~36g" } },
            { breakfast: "Mango and coconut chia pudding", lunch: "Spiced chickpea and spinach soup", dinner: "Grilled aubergine with lentils and tomato sauce", nutrition: { calories: "~1,370 kcal", protein: "~71g", carbs: "~157g", fat: "~37g" } }
        ],
        build_muscle: [
            { breakfast: "Peanut butter on toast with banana", lunch: "Tofu fried rice with vegetables", dinner: "Lentil and chickpea stew with bread", nutrition: { calories: "~2,300 kcal", protein: "~110g", carbs: "~290g", fat: "~60g" } },
            { breakfast: "Oat and nut granola with soy milk", lunch: "Tempeh and quinoa power bowl", dinner: "Black bean tacos with avocado", nutrition: { calories: "~2,280 kcal", protein: "~108g", carbs: "~285g", fat: "~58g" } },
            { breakfast: "Tofu scramble on toast with tomatoes", lunch: "Edamame and brown rice bowl", dinner: "Seitan stir-fry with rice noodles", nutrition: { calories: "~2,320 kcal", protein: "~112g", carbs: "~292g", fat: "~61g" } },
            { breakfast: "Avocado toast with hemp seeds and tomato", lunch: "Lentil and sweet potato bowl with tahini", dinner: "Soy mince bolognese with spaghetti", nutrition: { calories: "~2,260 kcal", protein: "~106g", carbs: "~282g", fat: "~57g" } },
            { breakfast: "Overnight oats with protein powder and seeds", lunch: "Chickpea salad with tahini and pitta", dinner: "Peanut butter tofu with rice noodles", nutrition: { calories: "~2,290 kcal", protein: "~110g", carbs: "~288g", fat: "~59g" } },
            { breakfast: "Smoothie bowl with protein powder, seeds and banana", lunch: "Black bean and rice burrito with salsa", dinner: "Mushroom and tempeh stir-fry with rice", nutrition: { calories: "~2,310 kcal", protein: "~113g", carbs: "~292g", fat: "~60g" } }
        ],
        improve_fitness: [
            { breakfast: "Fruit smoothie with oat milk and banana", lunch: "Falafel wrap with salad and hummus", dinner: "Vegan curry with basmati rice", nutrition: { calories: "~1,850 kcal", protein: "~72g", carbs: "~255g", fat: "~52g" } },
            { breakfast: "Avocado toast with sliced tomatoes", lunch: "Hummus and roasted vegetable pitta", dinner: "Lentil bolognese with spaghetti", nutrition: { calories: "~1,820 kcal", protein: "~70g", carbs: "~250g", fat: "~50g" } },
            { breakfast: "Porridge with banana and maple syrup", lunch: "Mixed vegetable sushi rolls", dinner: "Sweet potato and black bean chilli", nutrition: { calories: "~1,870 kcal", protein: "~73g", carbs: "~258g", fat: "~53g" } },
            { breakfast: "Mango and oat smoothie bowl with nuts", lunch: "Roasted vegetable and quinoa wrap", dinner: "Red lentil soup with crusty bread and olive oil", nutrition: { calories: "~1,840 kcal", protein: "~69g", carbs: "~248g", fat: "~51g" } },
            { breakfast: "Toast with almond butter and sliced banana", lunch: "Pea and mint soup with pitta bread", dinner: "Tofu and vegetable curry with basmati rice", nutrition: { calories: "~1,860 kcal", protein: "~71g", carbs: "~252g", fat: "~52g" } },
            { breakfast: "Mixed berry compote with vegan granola and soy milk", lunch: "Falafel and tabbouleh salad", dinner: "Lentil and mushroom shepherd's pie", nutrition: { calories: "~1,880 kcal", protein: "~73g", carbs: "~255g", fat: "~53g" } }
        ],
        maintain: [
            { breakfast: "Porridge with mixed berries", lunch: "Hummus and veggie pitta bread", dinner: "Vegetable stir-fry with noodles", nutrition: { calories: "~1,700 kcal", protein: "~68g", carbs: "~210g", fat: "~55g" } },
            { breakfast: "Banana and almond butter on toast", lunch: "Mixed bean and vegetable soup", dinner: "Mushroom and lentil shepherd's pie", nutrition: { calories: "~1,680 kcal", protein: "~65g", carbs: "~205g", fat: "~53g" } },
            { breakfast: "Vegan yogurt with granola and fruit", lunch: "Roasted vegetable and quinoa salad", dinner: "Thai green vegetable curry with rice", nutrition: { calories: "~1,720 kcal", protein: "~69g", carbs: "~215g", fat: "~56g" } },
            { breakfast: "Avocado and tomato on sourdough", lunch: "Sweet potato and black bean quesadilla", dinner: "Spaghetti with roasted tomato and basil sauce", nutrition: { calories: "~1,660 kcal", protein: "~62g", carbs: "~208g", fat: "~52g" } },
            { breakfast: "Overnight oats with chia, mango and coconut", lunch: "Tofu and vegetable wrap with hummus", dinner: "Green curry with tofu and jasmine rice", nutrition: { calories: "~1,690 kcal", protein: "~65g", carbs: "~212g", fat: "~54g" } },
            { breakfast: "Smoothie with spinach, oat milk and frozen fruit", lunch: "Chickpea and roasted pepper flatbread", dinner: "Aubergine and lentil moussaka with salad", nutrition: { calories: "~1,710 kcal", protein: "~67g", carbs: "~215g", fat: "~55g" } }
        ]
    },

    // Meals for halal users
    halal: {
        lose_weight: [
            { breakfast: "Eggs with wholemeal toast", lunch: "Grilled chicken breast with green salad", dinner: "Lamb kofta with salad and pitta", nutrition: { calories: "~1,500 kcal", protein: "~128g", carbs: "~105g", fat: "~52g" } },
            { breakfast: "Labneh with cucumber and wholemeal pitta", lunch: "Chicken tabbouleh salad", dinner: "Grilled sea bass with roasted vegetables", nutrition: { calories: "~1,470 kcal", protein: "~122g", carbs: "~108g", fat: "~49g" } },
            { breakfast: "Shakshuka (eggs poached in tomato sauce)", lunch: "Grilled chicken skewers with fattoush salad", dinner: "Baked trout with roasted Mediterranean vegetables", nutrition: { calories: "~1,490 kcal", protein: "~125g", carbs: "~110g", fat: "~51g" } },
            { breakfast: "Boiled eggs with labneh and wholemeal toast", lunch: "Grilled chicken kofta with fattoush salad", dinner: "Baked salmon with steamed asparagus and quinoa", nutrition: { calories: "~1,460 kcal", protein: "~120g", carbs: "~107g", fat: "~48g" } },
            { breakfast: "Vegetable omelette with one roti", lunch: "Grilled turkey strips with tabbouleh", dinner: "Lamb kebab with grilled vegetables and couscous", nutrition: { calories: "~1,480 kcal", protein: "~124g", carbs: "~110g", fat: "~50g" } },
            { breakfast: "Low-fat labneh with cucumber, tomato and one pitta", lunch: "Spiced chicken broth with barley", dinner: "Grilled cod with steamed carrots and small portion of brown rice", nutrition: { calories: "~1,440 kcal", protein: "~118g", carbs: "~105g", fat: "~46g" } }
        ],
        build_muscle: [
            { breakfast: "Oats with dates, honey and milk", lunch: "Chicken shawarma with rice and salad", dinner: "Grilled lamb chops with sweet potato", nutrition: { calories: "~2,600 kcal", protein: "~182g", carbs: "~265g", fat: "~72g" } },
            { breakfast: "Eggs and avocado on wholemeal toast", lunch: "Beef and rice bowl with vegetables", dinner: "Lamb chops with roasted potatoes and salad", nutrition: { calories: "~2,580 kcal", protein: "~178g", carbs: "~260g", fat: "~70g" } },
            { breakfast: "Full halal breakfast (eggs, turkey, baked beans)", lunch: "Grilled chicken and quinoa bowl", dinner: "Slow-cooked lamb with lentils and bread", nutrition: { calories: "~2,620 kcal", protein: "~185g", carbs: "~268g", fat: "~73g" } },
            { breakfast: "Halal beef sausages with eggs and wholemeal toast", lunch: "Lamb biryani with yogurt and salad", dinner: "Grilled chicken thighs with lentils and bread", nutrition: { calories: "~2,610 kcal", protein: "~184g", carbs: "~266g", fat: "~73g" } },
            { breakfast: "Oats with honey, dates and a glass of milk", lunch: "Chicken and vegetable rice (kabsa)", dinner: "Beef steak with sweet potato and salad", nutrition: { calories: "~2,590 kcal", protein: "~180g", carbs: "~262g", fat: "~71g" } },
            { breakfast: "4 eggs any style with wholemeal toast and avocado", lunch: "Grilled lamb shawarma with rice", dinner: "Slow-cooked chicken with couscous and roasted vegetables", nutrition: { calories: "~2,620 kcal", protein: "~185g", carbs: "~268g", fat: "~73g" } }
        ],
        improve_fitness: [
            { breakfast: "Labneh with cucumber and wholemeal pitta", lunch: "Grilled chicken breast with rice", dinner: "Grilled fish with vegetables and couscous", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~205g", fat: "~65g" } },
            { breakfast: "Vegetable omelette with wholemeal toast", lunch: "Chicken and vegetable soup with bread", dinner: "Grilled lamb with couscous and salad", nutrition: { calories: "~1,980 kcal", protein: "~145g", carbs: "~200g", fat: "~63g" } },
            { breakfast: "Ful medames (fava beans) with eggs and pitta", lunch: "Tuna and salad wrap", dinner: "Baked chicken thighs with rice and vegetables", nutrition: { calories: "~2,010 kcal", protein: "~150g", carbs: "~208g", fat: "~66g" } },
            { breakfast: "Cheese and spinach omelette with one roti", lunch: "Chicken and lentil salad with lemon dressing", dinner: "Grilled lamb patties with couscous and mint yogurt", nutrition: { calories: "~1,990 kcal", protein: "~147g", carbs: "~203g", fat: "~65g" } },
            { breakfast: "Halal turkey slices with eggs and toast", lunch: "Tuna and chickpea salad with pitta", dinner: "Chicken tagine with couscous and salad", nutrition: { calories: "~2,010 kcal", protein: "~150g", carbs: "~207g", fat: "~66g" } },
            { breakfast: "Overnight oats with dates and low-fat milk", lunch: "Grilled chicken and vegetable soup", dinner: "Baked sea bass with bulgur wheat and salad", nutrition: { calories: "~1,970 kcal", protein: "~144g", carbs: "~200g", fat: "~63g" } }
        ],
        maintain: [
            { breakfast: "Turkey slices with scrambled eggs", lunch: "Grilled chicken wrap with salad", dinner: "Lamb stew with flatbread", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~180g", fat: "~60g" } },
            { breakfast: "Cheese and egg toastie on wholemeal", lunch: "Grilled chicken pitta with salad", dinner: "Beef mince with rice and vegetables", nutrition: { calories: "~1,780 kcal", protein: "~135g", carbs: "~175g", fat: "~58g" } },
            { breakfast: "Halal sausage with scrambled eggs and toast", lunch: "Chicken and lentil soup with bread", dinner: "Grilled fish with bulgur wheat and salad", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~182g", fat: "~61g" } },
            { breakfast: "Eggs with sauteed vegetables and one roti", lunch: "Chicken and rice salad with herbs", dinner: "Lamb chops with couscous and roasted vegetables", nutrition: { calories: "~1,790 kcal", protein: "~136g", carbs: "~178g", fat: "~60g" } },
            { breakfast: "Shakshuka with one pitta bread", lunch: "Halal beef wrap with salad", dinner: "Grilled chicken with daal and basmati rice", nutrition: { calories: "~1,805 kcal", protein: "~139g", carbs: "~181g", fat: "~61g" } },
            { breakfast: "Turkish-style eggs with yogurt and bread", lunch: "Grilled chicken pitta with tzatziki and vegetables", dinner: "Slow-cooked beef with rice and bread", nutrition: { calories: "~1,820 kcal", protein: "~142g", carbs: "~184g", fat: "~62g" } }
        ]
    },

    // Meals for gluten-free users
    gluten_free: {
        lose_weight: [
            { breakfast: "Scrambled eggs with avocado", lunch: "Grilled salmon and mixed leaf salad", dinner: "Grilled chicken with roasted vegetables", nutrition: { calories: "~1,450 kcal", protein: "~128g", carbs: "~80g", fat: "~55g" } },
            { breakfast: "Greek yogurt with fruit and mixed seeds", lunch: "Tuna and cucumber lettuce wraps", dinner: "Baked cod with sweet potato mash", nutrition: { calories: "~1,400 kcal", protein: "~120g", carbs: "~85g", fat: "~50g" } },
            { breakfast: "Spinach and mushroom omelette", lunch: "Chicken and vegetable soup (GF)", dinner: "Grilled turkey with salad and boiled eggs", nutrition: { calories: "~1,420 kcal", protein: "~122g", carbs: "~82g", fat: "~52g" } },
            { breakfast: "Smoked salmon with cream cheese on rice cakes", lunch: "Chicken and vegetable lettuce wraps", dinner: "Grilled trout with steamed green beans and sweet potato", nutrition: { calories: "~1,410 kcal", protein: "~118g", carbs: "~83g", fat: "~51g" } },
            { breakfast: "Eggs any style with sliced avocado and tomatoes", lunch: "Tuna and avocado salad bowl", dinner: "Chicken breast with roasted peppers and courgette", nutrition: { calories: "~1,430 kcal", protein: "~122g", carbs: "~86g", fat: "~53g" } },
            { breakfast: "Coconut yogurt with mango and seeds", lunch: "Grilled chicken with salsa and corn tortilla", dinner: "Baked salmon fillet with asparagus and sweet potato mash", nutrition: { calories: "~1,390 kcal", protein: "~116g", carbs: "~81g", fat: "~49g" } }
        ],
        build_muscle: [
            { breakfast: "Rice cakes with peanut butter and banana", lunch: "Grilled chicken with rice and broccoli", dinner: "Beef stir-fry with rice noodles", nutrition: { calories: "~2,500 kcal", protein: "~175g", carbs: "~255g", fat: "~68g" } },
            { breakfast: "Eggs with smashed avocado on GF toast", lunch: "Salmon and rice power bowl", dinner: "Lamb mince with rice and salad", nutrition: { calories: "~2,480 kcal", protein: "~170g", carbs: "~250g", fat: "~66g" } },
            { breakfast: "GF granola with milk and berries", lunch: "Chicken and quinoa bowl with vegetables", dinner: "King prawn stir-fry with rice", nutrition: { calories: "~2,520 kcal", protein: "~178g", carbs: "~258g", fat: "~69g" } },
            { breakfast: "Peanut butter on rice cakes with banana and milk", lunch: "Chicken and rice bowl with roasted vegetables", dinner: "King prawn and vegetable stir-fry with rice", nutrition: { calories: "~2,490 kcal", protein: "~172g", carbs: "~252g", fat: "~67g" } },
            { breakfast: "GF granola with whole milk, banana and nuts", lunch: "Beef and rice power bowl with greens", dinner: "Baked chicken thighs with sweet potato and salad", nutrition: { calories: "~2,510 kcal", protein: "~176g", carbs: "~256g", fat: "~68g" } },
            { breakfast: "Smoked salmon and scrambled eggs on GF toast", lunch: "Turkey and quinoa salad with olive oil", dinner: "Steak with roasted sweet potato and greens", nutrition: { calories: "~2,530 kcal", protein: "~179g", carbs: "~258g", fat: "~69g" } }
        ],
        improve_fitness: [
            { breakfast: "Banana and berry smoothie", lunch: "Tuna and rice salad with lemon dressing", dinner: "Grilled chicken with sweet potato wedges", nutrition: { calories: "~1,900 kcal", protein: "~140g", carbs: "~198g", fat: "~60g" } },
            { breakfast: "Rice porridge with honey and fruit", lunch: "Prawn and avocado salad", dinner: "Baked salmon with roasted vegetables", nutrition: { calories: "~1,880 kcal", protein: "~135g", carbs: "~192g", fat: "~58g" } },
            { breakfast: "GF toast with eggs and sliced tomatoes", lunch: "Chicken and sweetcorn soup (GF)", dinner: "Turkey breast with roasted sweet potatoes", nutrition: { calories: "~1,920 kcal", protein: "~142g", carbs: "~200g", fat: "~61g" } },
            { breakfast: "Fruit salad with GF granola and Greek yogurt", lunch: "Grilled chicken and corn salad", dinner: "Salmon with steamed broccoli and brown rice", nutrition: { calories: "~1,890 kcal", protein: "~136g", carbs: "~194g", fat: "~59g" } },
            { breakfast: "Smoothie with GF oats, banana and peanut butter", lunch: "Prawn and mango salad with lime dressing", dinner: "Chicken and vegetable curry with rice (GF)", nutrition: { calories: "~1,910 kcal", protein: "~140g", carbs: "~198g", fat: "~61g" } },
            { breakfast: "Boiled eggs with sliced avocado and rice crackers", lunch: "Tuna and cucumber rice bowl", dinner: "Turkey meatballs with courgetti and tomato sauce", nutrition: { calories: "~1,870 kcal", protein: "~135g", carbs: "~190g", fat: "~58g" } }
        ],
        maintain: [
            { breakfast: "Gluten-free porridge with honey", lunch: "Chicken and quinoa bowl", dinner: "Salmon with steamed vegetables", nutrition: { calories: "~1,780 kcal", protein: "~132g", carbs: "~185g", fat: "~62g" } },
            { breakfast: "Eggs with tomatoes and GF toast", lunch: "Tuna jacket potato with salad", dinner: "Chicken thighs with rice and greens", nutrition: { calories: "~1,760 kcal", protein: "~128g", carbs: "~180g", fat: "~60g" } },
            { breakfast: "Fruit salad with GF granola and yogurt", lunch: "Prawn and rice salad", dinner: "Beef with roasted potatoes and carrots", nutrition: { calories: "~1,800 kcal", protein: "~135g", carbs: "~188g", fat: "~63g" } },
            { breakfast: "GF toast with avocado and a poached egg", lunch: "Chicken and vegetable soup (GF)", dinner: "Baked cod with rice and peas", nutrition: { calories: "~1,770 kcal", protein: "~130g", carbs: "~182g", fat: "~61g" } },
            { breakfast: "Smoothie bowl with GF granola and mixed berries", lunch: "Egg fried rice with prawns and vegetables", dinner: "Grilled salmon with new potatoes and asparagus", nutrition: { calories: "~1,790 kcal", protein: "~133g", carbs: "~185g", fat: "~62g" } },
            { breakfast: "GF cereal with whole milk and sliced banana", lunch: "Jacket potato with tuna and salad", dinner: "Chicken thighs with roasted butternut squash and greens", nutrition: { calories: "~1,810 kcal", protein: "~136g", carbs: "~188g", fat: "~63g" } }
        ]
    }
};

// ===== CUISINE-BASED MEAL DATABASE =====
// These meals are used when the user selects a specific cultural cuisine preference
// Each cuisine has 3 rotating meal sets per fitness goal, just like the main meal database
// NOTE: Halal, vegan, vegetarian and gluten-free users always use their dietary preference meals
// instead of cuisine meals, since those are strict requirements that must always be respected
var cuisineMeals = {

    // South Asian cuisine (Indian, Pakistani, Bangladeshi)
    south_asian: {
        lose_weight: [
            { breakfast: "Egg bhurji (spiced scrambled eggs) with one roti", lunch: "Daal soup with a small salad", dinner: "Grilled tandoori chicken with raita and salad", nutrition: { calories: "~1,480 kcal", protein: "~125g", carbs: "~110g", fat: "~48g" } },
            { breakfast: "Low-fat lassi with fruit", lunch: "Chickpea chaat with yogurt", dinner: "Grilled fish with vegetable curry (no rice)", nutrition: { calories: "~1,420 kcal", protein: "~115g", carbs: "~115g", fat: "~44g" } },
            { breakfast: "Oats cooked with cardamom and low-fat milk", lunch: "Lentil soup with a wholemeal roti", dinner: "Chicken tikka with cucumber raita and salad", nutrition: { calories: "~1,450 kcal", protein: "~120g", carbs: "~112g", fat: "~46g" } },
            { breakfast: "Moong dal cheela (lentil pancake) with chutney", lunch: "Grilled chicken tikka with raita and salad", dinner: "Fish curry (light coconut) with a small portion of brown rice", nutrition: { calories: "~1,430 kcal", protein: "~118g", carbs: "~113g", fat: "~45g" } },
            { breakfast: "Low-fat dahi (yogurt) with fresh fruit", lunch: "Grilled seekh kebab with salad and mint chutney", dinner: "Palak chicken with a small roti", nutrition: { calories: "~1,410 kcal", protein: "~115g", carbs: "~108g", fat: "~43g" } },
            { breakfast: "Boiled eggs with one wholemeal roti and chai", lunch: "Tuna and chickpea chaat", dinner: "Chicken shorba (soup) with brown bread", nutrition: { calories: "~1,450 kcal", protein: "~120g", carbs: "~112g", fat: "~46g" } }
        ],
        build_muscle: [
            { breakfast: "Paratha with two fried eggs and yogurt", lunch: "Chicken biryani with raita", dinner: "Lamb karahi with two naan breads", nutrition: { calories: "~2,600 kcal", protein: "~182g", carbs: "~265g", fat: "~72g" } },
            { breakfast: "Daal with two eggs and roti", lunch: "Chicken handi with basmati rice", dinner: "Beef kofta curry with rice and salad", nutrition: { calories: "~2,550 kcal", protein: "~178g", carbs: "~258g", fat: "~70g" } },
            { breakfast: "Aloo paratha with yogurt and eggs", lunch: "Chicken and rice (murgh pulao)", dinner: "Seekh kebab with rice and daal", nutrition: { calories: "~2,580 kcal", protein: "~180g", carbs: "~262g", fat: "~71g" } },
            { breakfast: "Haleem with two rotis and a glass of milk", lunch: "Chicken karahi with basmati rice", dinner: "Mutton biryani with raita and salad", nutrition: { calories: "~2,570 kcal", protein: "~180g", carbs: "~260g", fat: "~71g" } },
            { breakfast: "Eggs with potato bhaji and two parathas", lunch: "Grilled fish with daal and rice", dinner: "Chicken handi with naan and salad", nutrition: { calories: "~2,560 kcal", protein: "~176g", carbs: "~258g", fat: "~70g" } },
            { breakfast: "Sabudana khichdi with milk and fruit", lunch: "Butter chicken with basmati rice and salad", dinner: "Lamb saag with two rotis and raita", nutrition: { calories: "~2,590 kcal", protein: "~181g", carbs: "~263g", fat: "~72g" } }
        ],
        improve_fitness: [
            { breakfast: "Poha (spiced flattened rice with vegetables)", lunch: "Grilled chicken tikka wrap with chutney", dinner: "Daal makhani with basmati rice", nutrition: { calories: "~1,980 kcal", protein: "~148g", carbs: "~205g", fat: "~63g" } },
            { breakfast: "Upma (semolina porridge with vegetables)", lunch: "Baked samosa with green salad", dinner: "Fish curry with brown rice", nutrition: { calories: "~1,950 kcal", protein: "~142g", carbs: "~200g", fat: "~61g" } },
            { breakfast: "Idli (steamed rice cakes) with coconut chutney", lunch: "Chicken and vegetable soup with roti", dinner: "Mixed vegetable biryani with raita", nutrition: { calories: "~2,000 kcal", protein: "~145g", carbs: "~210g", fat: "~64g" } },
            { breakfast: "Dosa with sambar and coconut chutney", lunch: "Chicken tikka wrap with green salad", dinner: "Egg curry with brown rice", nutrition: { calories: "~1,960 kcal", protein: "~144g", carbs: "~202g", fat: "~62g" } },
            { breakfast: "Paratha (one) with yogurt and fruit", lunch: "Grilled fish tikka with couscous and salad", dinner: "Daal tadka with basmati rice and salad", nutrition: { calories: "~1,940 kcal", protein: "~140g", carbs: "~198g", fat: "~61g" } },
            { breakfast: "Semolina upma with vegetables and chai", lunch: "Chicken and lentil shorba with roti", dinner: "Grilled tandoori fish with sauteed vegetables", nutrition: { calories: "~1,980 kcal", protein: "~146g", carbs: "~205g", fat: "~63g" } }
        ],
        maintain: [
            { breakfast: "Paratha with natural yogurt", lunch: "Chicken roll with chutney", dinner: "Chicken curry with basmati rice", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~182g", fat: "~61g" } },
            { breakfast: "Chai with two slices of wholemeal toast and eggs", lunch: "Daal with rice", dinner: "Lamb stew with roti and salad", nutrition: { calories: "~1,780 kcal", protein: "~135g", carbs: "~178g", fat: "~59g" } },
            { breakfast: "Egg paratha with yogurt", lunch: "Tandoori chicken wrap", dinner: "Fish curry with rice", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~184g", fat: "~62g" } },
            { breakfast: "Aloo paratha with yogurt", lunch: "Grilled chicken wrap with mint chutney", dinner: "Keema rice with raita and salad", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~182g", fat: "~61g" } },
            { breakfast: "Masala omelette with two rotis", lunch: "Chicken and vegetable pulao with raita", dinner: "Fish karahi with one naan", nutrition: { calories: "~1,790 kcal", protein: "~136g", carbs: "~180g", fat: "~60g" } },
            { breakfast: "Fried egg with paratha and yogurt", lunch: "Daal and rice with pickles", dinner: "Chicken tikka masala with basmati rice", nutrition: { calories: "~1,820 kcal", protein: "~141g", carbs: "~185g", fat: "~62g" } }
        ]
    },

    // Middle Eastern and North African cuisine
    middle_eastern: {
        lose_weight: [
            { breakfast: "Labneh with cucumber, tomato and wholemeal pitta", lunch: "Fattoush salad with grilled chicken strips", dinner: "Grilled sea bass with tabbouleh", nutrition: { calories: "~1,460 kcal", protein: "~122g", carbs: "~108g", fat: "~46g" } },
            { breakfast: "Shakshuka (two eggs poached in tomato sauce)", lunch: "Grilled chicken kofta with green salad", dinner: "Baked sea bream with couscous and salad", nutrition: { calories: "~1,440 kcal", protein: "~120g", carbs: "~106g", fat: "~44g" } },
            { breakfast: "Hummus with crudites and two boiled eggs", lunch: "Grilled chicken shawarma salad (no bread)", dinner: "Lamb kofta with grilled vegetables and salad", nutrition: { calories: "~1,480 kcal", protein: "~125g", carbs: "~110g", fat: "~47g" } },
            { breakfast: "Low-fat labneh with olives, cucumber and one small pitta", lunch: "Grilled chicken kofta salad with pomegranate", dinner: "Baked sea bream with lemon herbs and salad", nutrition: { calories: "~1,430 kcal", protein: "~118g", carbs: "~105g", fat: "~44g" } },
            { breakfast: "Boiled eggs with sliced tomatoes and za'atar toast", lunch: "Turkey tabbouleh salad", dinner: "Lamb mince stuffed pepper with salad", nutrition: { calories: "~1,450 kcal", protein: "~122g", carbs: "~108g", fat: "~46g" } },
            { breakfast: "Watermelon and feta salad", lunch: "Chicken and chickpea salad with lemon", dinner: "Grilled salmon with bulgur wheat and roasted vegetables", nutrition: { calories: "~1,460 kcal", protein: "~120g", carbs: "~110g", fat: "~47g" } }
        ],
        build_muscle: [
            { breakfast: "Ful medames (fava beans) with two eggs and pitta", lunch: "Chicken shawarma with rice and salad", dinner: "Grilled lamb chops with fattoush and bread", nutrition: { calories: "~2,600 kcal", protein: "~182g", carbs: "~265g", fat: "~72g" } },
            { breakfast: "Za'atar eggs on toasted pitta with olive oil", lunch: "Chicken and rice (kabsa style)", dinner: "Grilled lamb with couscous and harissa", nutrition: { calories: "~2,570 kcal", protein: "~178g", carbs: "~260g", fat: "~70g" } },
            { breakfast: "Oats with dates, honey and warm milk", lunch: "Beef kafta with rice and salad", dinner: "Slow-cooked lamb with lentils and bread", nutrition: { calories: "~2,590 kcal", protein: "~180g", carbs: "~263g", fat: "~71g" } },
            { breakfast: "Menemen (Turkish scrambled eggs with tomatoes) and toast", lunch: "Chicken kabsa with rice and salad", dinner: "Grilled lamb adana with rice pilaf", nutrition: { calories: "~2,580 kcal", protein: "~179g", carbs: "~262g", fat: "~71g" } },
            { breakfast: "Borek (cheese-filled pastry) with two eggs", lunch: "Beef shawarma with rice and garlic sauce", dinner: "Slow-cooked lamb shoulder with lentils and bread", nutrition: { calories: "~2,590 kcal", protein: "~180g", carbs: "~264g", fat: "~72g" } },
            { breakfast: "Oats with pistachios, honey and dates", lunch: "Chicken mansaf with rice", dinner: "Grilled mixed grill with rice and fattoush", nutrition: { calories: "~2,600 kcal", protein: "~182g", carbs: "~265g", fat: "~72g" } }
        ],
        improve_fitness: [
            { breakfast: "Manakish (flatbread with za'atar and olive oil)", lunch: "Falafel wrap with hummus and salad", dinner: "Grilled chicken with couscous and roasted vegetables", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~205g", fat: "~65g" } },
            { breakfast: "Hummus with two eggs and toasted pitta", lunch: "Chicken and tabbouleh wrap", dinner: "Fish tagine with crusty bread", nutrition: { calories: "~1,970 kcal", protein: "~144g", carbs: "~200g", fat: "~63g" } },
            { breakfast: "Smoothie with dates, banana and almond milk", lunch: "Lentil soup with wholemeal bread", dinner: "Grilled chicken with bulgur wheat and salad", nutrition: { calories: "~1,990 kcal", protein: "~146g", carbs: "~202g", fat: "~64g" } },
            { breakfast: "Turkish breakfast plate (olives, cheese, egg, tomato, bread)", lunch: "Chicken souvlaki pitta with salad", dinner: "Lamb and vegetable stew with crusty bread", nutrition: { calories: "~1,985 kcal", protein: "~146g", carbs: "~202g", fat: "~64g" } },
            { breakfast: "Sesame ka'ak with low-fat labneh", lunch: "Grilled chicken with tabbouleh", dinner: "Fish tagine with couscous", nutrition: { calories: "~1,960 kcal", protein: "~142g", carbs: "~198g", fat: "~62g" } },
            { breakfast: "Banana and almond smoothie with a handful of dates", lunch: "Chicken and roasted pepper wrap with hummus", dinner: "Grilled lamb chops with bulgur and roasted vegetables", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~205g", fat: "~65g" } }
        ],
        maintain: [
            { breakfast: "Flatbread with labneh and olive oil", lunch: "Chicken shawarma wrap with garlic sauce", dinner: "Lamb stew with rice", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~182g", fat: "~61g" } },
            { breakfast: "Cheese and za'atar on toast", lunch: "Grilled chicken pitta with salad", dinner: "Grilled fish with vegetables and couscous", nutrition: { calories: "~1,775 kcal", protein: "~134g", carbs: "~178g", fat: "~59g" } },
            { breakfast: "Two eggs with pitta and tomatoes", lunch: "Hummus and chicken wrap", dinner: "Beef kebab with rice and salad", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~184g", fat: "~62g" } },
            { breakfast: "Cheese manaqeesh with olives and tea", lunch: "Grilled chicken and rice with harissa", dinner: "Moroccan lamb tagine with couscous", nutrition: { calories: "~1,805 kcal", protein: "~138g", carbs: "~183g", fat: "~62g" } },
            { breakfast: "Eggs with sujuk (spiced sausage) and toast", lunch: "Mixed kebab platter with pitta and salad", dinner: "Fish kofta with rice and salad", nutrition: { calories: "~1,820 kcal", protein: "~141g", carbs: "~185g", fat: "~63g" } },
            { breakfast: "Pitta with tahini, honey and banana", lunch: "Chicken kofta sandwich with garlic sauce", dinner: "Grilled sea bass with couscous and salad", nutrition: { calories: "~1,790 kcal", protein: "~136g", carbs: "~180g", fat: "~61g" } }
        ]
    },

    // East Asian cuisine (Chinese, Japanese, Korean)
    east_asian: {
        lose_weight: [
            { breakfast: "Miso soup with tofu and steamed rice (small)", lunch: "Sushi rolls (8 pieces, light filling)", dinner: "Steamed fish with bok choy and soy sauce", nutrition: { calories: "~1,400 kcal", protein: "~110g", carbs: "~155g", fat: "~38g" } },
            { breakfast: "Congee (rice porridge) with ginger and spring onion", lunch: "Grilled chicken teriyaki salad", dinner: "Steamed salmon with stir-fried vegetables", nutrition: { calories: "~1,380 kcal", protein: "~108g", carbs: "~150g", fat: "~36g" } },
            { breakfast: "Green tea with rice crackers and fruit", lunch: "Korean bibimbap (light, no egg yolk)", dinner: "Grilled mackerel with steamed rice and miso soup", nutrition: { calories: "~1,420 kcal", protein: "~112g", carbs: "~158g", fat: "~39g" } },
            { breakfast: "Warm soy milk with rice crackers and fruit", lunch: "Japanese-style grilled chicken salad with sesame dressing", dinner: "Steamed sea bass with ginger and spring onion with cauliflower rice", nutrition: { calories: "~1,360 kcal", protein: "~106g", carbs: "~148g", fat: "~35g" } },
            { breakfast: "Miso soup with wakame and two soft-boiled eggs", lunch: "Korean tofu soup (sundubu jjigae, light)", dinner: "Grilled chicken teriyaki with steamed vegetables (no rice)", nutrition: { calories: "~1,390 kcal", protein: "~110g", carbs: "~152g", fat: "~37g" } },
            { breakfast: "Steamed bun (one) with green tea and fruit", lunch: "Prawn and avocado sushi salad", dinner: "Chicken and broccoli oyster sauce stir-fry with small rice portion", nutrition: { calories: "~1,400 kcal", protein: "~112g", carbs: "~154g", fat: "~38g" } }
        ],
        build_muscle: [
            { breakfast: "Tamago gohan (egg over rice) with miso soup", lunch: "Chicken teriyaki with large rice portion", dinner: "Beef bulgogi with rice and kimchi", nutrition: { calories: "~2,500 kcal", protein: "~172g", carbs: "~258g", fat: "~67g" } },
            { breakfast: "Congee with chicken and century egg", lunch: "Chinese steamed chicken with rice and greens", dinner: "Korean galbi (beef short ribs) with rice", nutrition: { calories: "~2,480 kcal", protein: "~168g", carbs: "~252g", fat: "~65g" } },
            { breakfast: "Omelette rice (omurice)", lunch: "Ramen with chicken and egg", dinner: "Pork bulgogi with rice and kimchi", nutrition: { calories: "~2,520 kcal", protein: "~175g", carbs: "~262g", fat: "~68g" } },
            { breakfast: "Chicken congee with boiled eggs and spring onion", lunch: "Korean soybean paste stew with rice and beef", dinner: "Teriyaki salmon with large rice portion and edamame", nutrition: { calories: "~2,490 kcal", protein: "~170g", carbs: "~255g", fat: "~66g" } },
            { breakfast: "Steamed rice with grilled salmon and miso soup", lunch: "Gyudon (beef rice bowl) with salad", dinner: "Pork and vegetable gyoza with rice and miso soup", nutrition: { calories: "~2,510 kcal", protein: "~173g", carbs: "~259g", fat: "~67g" } },
            { breakfast: "Korean soft tofu stew with rice and eggs", lunch: "Chicken yakitori with fried rice", dinner: "Spicy Korean pork belly with rice and kimchi", nutrition: { calories: "~2,530 kcal", protein: "~175g", carbs: "~262g", fat: "~68g" } }
        ],
        improve_fitness: [
            { breakfast: "Miso soup with rice and pickled vegetables", lunch: "Chicken teriyaki bento with rice", dinner: "Stir-fried vegetables and chicken with udon noodles", nutrition: { calories: "~1,950 kcal", protein: "~142g", carbs: "~205g", fat: "~60g" } },
            { breakfast: "Overnight oats with matcha and fruit", lunch: "Soba noodle salad with grilled chicken", dinner: "Japanese chicken curry with rice", nutrition: { calories: "~1,920 kcal", protein: "~138g", carbs: "~200g", fat: "~58g" } },
            { breakfast: "Fruit with yogurt and granola", lunch: "Korean bibim naengmyeon (cold noodles)", dinner: "Steamed dumplings with miso soup and rice", nutrition: { calories: "~1,970 kcal", protein: "~144g", carbs: "~208g", fat: "~61g" } },
            { breakfast: "Banana with a handful of mixed nuts and green tea", lunch: "Soba noodles with grilled chicken and sesame dressing", dinner: "Steamed dumplings (gyoza) with miso soup and rice", nutrition: { calories: "~1,940 kcal", protein: "~140g", carbs: "~202g", fat: "~59g" } },
            { breakfast: "Tamago gohan with miso soup and side fruit", lunch: "Vietnamese pho soup with chicken", dinner: "Korean bibimbap with chicken and mixed vegetables", nutrition: { calories: "~1,960 kcal", protein: "~143g", carbs: "~205g", fat: "~60g" } },
            { breakfast: "Rice porridge with sweet potato and green onion", lunch: "Chinese steamed chicken rice (hainanese style)", dinner: "Beef and broccoli stir-fry with noodles", nutrition: { calories: "~1,975 kcal", protein: "~145g", carbs: "~208g", fat: "~61g" } }
        ],
        maintain: [
            { breakfast: "Steamed buns (bao) with egg", lunch: "Egg fried rice with vegetables", dinner: "Sweet and sour chicken with steamed rice", nutrition: { calories: "~1,800 kcal", protein: "~135g", carbs: "~190g", fat: "~60g" } },
            { breakfast: "Congee with pickled vegetables and egg", lunch: "Udon noodle soup with chicken", dinner: "Korean bibimbap with mixed vegetables", nutrition: { calories: "~1,775 kcal", protein: "~132g", carbs: "~185g", fat: "~58g" } },
            { breakfast: "Steamed rice with miso soup", lunch: "Chicken teriyaki bento box", dinner: "Beef and vegetable stir-fry with noodles", nutrition: { calories: "~1,810 kcal", protein: "~138g", carbs: "~192g", fat: "~61g" } },
            { breakfast: "Steamed rice with pickled vegetables and miso soup", lunch: "Chicken fried rice with vegetables", dinner: "Japanese katsu chicken with rice and salad", nutrition: { calories: "~1,790 kcal", protein: "~134g", carbs: "~188g", fat: "~60g" } },
            { breakfast: "Rice crackers with avocado and sesame seeds", lunch: "Ramen with pork and soft-boiled egg", dinner: "Korean BBQ beef with rice and kimchi", nutrition: { calories: "~1,810 kcal", protein: "~137g", carbs: "~192g", fat: "~62g" } },
            { breakfast: "Tofu scramble on rice with soy sauce", lunch: "Vietnamese summer rolls with chicken and peanut dipping sauce", dinner: "Kung pao chicken with steamed rice", nutrition: { calories: "~1,800 kcal", protein: "~136g", carbs: "~190g", fat: "~61g" } }
        ]
    },

    // West African and Caribbean cuisine
    west_african: {
        lose_weight: [
            { breakfast: "Akara (bean cakes, baked) with fresh fruit", lunch: "Grilled tilapia with vegetable soup (no starch)", dinner: "Grilled chicken with garden egg stew and salad", nutrition: { calories: "~1,460 kcal", protein: "~118g", carbs: "~125g", fat: "~45g" } },
            { breakfast: "Boiled yam with light egg sauce", lunch: "Light pepper soup with fish", dinner: "Grilled fish with garden egg stew and salad", nutrition: { calories: "~1,440 kcal", protein: "~115g", carbs: "~120g", fat: "~43g" } },
            { breakfast: "Fresh fruit salad with low-fat yogurt", lunch: "Grilled chicken with a small portion of jollof rice", dinner: "Fish stew with steamed vegetables (no starch)", nutrition: { calories: "~1,480 kcal", protein: "~120g", carbs: "~128g", fat: "~46g" } },
            { breakfast: "Groundnut soup (light) with one small slice of yam", lunch: "Grilled tilapia with a salad", dinner: "Chicken peppersoup with a small side of rice", nutrition: { calories: "~1,430 kcal", protein: "~115g", carbs: "~118g", fat: "~43g" } },
            { breakfast: "Boiled corn with low-fat yogurt and fruit", lunch: "Baked plantain with garden egg sauce", dinner: "Grilled fish with vegetable stew (no starch)", nutrition: { calories: "~1,410 kcal", protein: "~112g", carbs: "~115g", fat: "~42g" } },
            { breakfast: "Light ogi porridge with low-fat milk and honey", lunch: "Suya chicken skewers with salad and tomato sauce", dinner: "Steamed fish with jollof vegetables (no rice)", nutrition: { calories: "~1,450 kcal", protein: "~118g", carbs: "~120g", fat: "~44g" } }
        ],
        build_muscle: [
            { breakfast: "Ogi (corn porridge) with milk, honey and groundnuts", lunch: "Jollof rice with grilled chicken and fried plantain", dinner: "Egusi soup with fufu and grilled fish", nutrition: { calories: "~2,580 kcal", protein: "~178g", carbs: "~268g", fat: "~71g" } },
            { breakfast: "Yam and scrambled eggs with tomato sauce", lunch: "Rice and chicken stew with fried plantain", dinner: "Grilled fish with pounded yam and vegetable soup", nutrition: { calories: "~2,550 kcal", protein: "~175g", carbs: "~262g", fat: "~69g" } },
            { breakfast: "Bread with eggs, beans and fried plantain", lunch: "Pounded yam with egusi soup and chicken", dinner: "Jerk chicken with rice and peas and coleslaw", nutrition: { calories: "~2,600 kcal", protein: "~180g", carbs: "~270g", fat: "~72g" } },
            { breakfast: "Tuwo shinkafa (rice pudding) with groundnut soup", lunch: "Jerk chicken with rice, peas and fried plantain", dinner: "Egusi soup with semovita and grilled fish", nutrition: { calories: "~2,570 kcal", protein: "~178g", carbs: "~265g", fat: "~70g" } },
            { breakfast: "Maize porridge with milk and groundnuts", lunch: "Grilled chicken with jollof rice and fried plantain", dinner: "Banga soup with starch and grilled meat", nutrition: { calories: "~2,590 kcal", protein: "~180g", carbs: "~268g", fat: "~71g" } },
            { breakfast: "Akara with gari soakings and milk", lunch: "Moimoi (bean pudding) with rice and stew", dinner: "Jerk pork with rice and peas", nutrition: { calories: "~2,610 kcal", protein: "~182g", carbs: "~272g", fat: "~72g" } }
        ],
        improve_fitness: [
            { breakfast: "Akara with oats porridge", lunch: "Vegetable pepper soup with a small portion of rice", dinner: "Jollof rice with grilled chicken and salad", nutrition: { calories: "~1,980 kcal", protein: "~145g", carbs: "~208g", fat: "~63g" } },
            { breakfast: "Fried plantain with scrambled eggs", lunch: "Grilled chicken with green salad", dinner: "Fish and okra soup with a small portion of rice", nutrition: { calories: "~1,950 kcal", protein: "~140g", carbs: "~202g", fat: "~61g" } },
            { breakfast: "Fruit smoothie with groundnut butter", lunch: "Grilled chicken with rice and salad", dinner: "Grilled tilapia with steamed vegetables and yam", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~210g", fat: "~64g" } },
            { breakfast: "Yam porridge with palm oil (small portion)", lunch: "Grilled chicken with rice and beans", dinner: "Egusi soup with a moderate portion of eba", nutrition: { calories: "~1,960 kcal", protein: "~142g", carbs: "~205g", fat: "~62g" } },
            { breakfast: "Fruit smoothie with groundnuts and oat milk", lunch: "Suya beef skewers with salad and rice", dinner: "Chicken okra soup with small portion of rice", nutrition: { calories: "~1,980 kcal", protein: "~145g", carbs: "~208g", fat: "~63g" } },
            { breakfast: "Boiled plantain with eggs and tomato sauce", lunch: "Grilled tilapia with yam and pepper sauce", dinner: "Jollof rice with grilled chicken and coleslaw", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~212g", fat: "~64g" } }
        ],
        maintain: [
            { breakfast: "Bread with beans and fried egg", lunch: "Jollof rice with chicken stew", dinner: "Egusi soup with rice and fish", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~185g", fat: "~62g" } },
            { breakfast: "Fried plantain with two eggs", lunch: "Chicken stew with rice and salad", dinner: "Grilled fish with yam and pepper sauce", nutrition: { calories: "~1,790 kcal", protein: "~136g", carbs: "~182g", fat: "~60g" } },
            { breakfast: "Oats with fruit and groundnut butter", lunch: "Pepper chicken with rice", dinner: "Okra soup with fufu and grilled chicken", nutrition: { calories: "~1,820 kcal", protein: "~142g", carbs: "~188g", fat: "~63g" } },
            { breakfast: "Fried yam with egg sauce", lunch: "Rice and beans with chicken stew", dinner: "Groundnut soup with fufu and fish", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~183g", fat: "~62g" } },
            { breakfast: "Akara with pap and honey", lunch: "Baked plantain with egg and salad", dinner: "Suya chicken with rice and tomato sauce", nutrition: { calories: "~1,785 kcal", protein: "~136g", carbs: "~180g", fat: "~61g" } },
            { breakfast: "Cornmeal porridge with groundnut butter", lunch: "Pepper chicken with fried rice", dinner: "Catfish pepper soup with a portion of eba", nutrition: { calories: "~1,820 kcal", protein: "~141g", carbs: "~186g", fat: "~63g" } }
        ]
    },

    // Mediterranean cuisine (Greek, Italian, Spanish)
    mediterranean: {
        lose_weight: [
            { breakfast: "Greek yogurt with honey, walnuts and berries", lunch: "Greek salad with grilled chicken and olive oil dressing", dinner: "Grilled sea bass with roasted vegetables and lemon", nutrition: { calories: "~1,450 kcal", protein: "~118g", carbs: "~108g", fat: "~48g" } },
            { breakfast: "Fresh fruit with a handful of almonds", lunch: "Tuna, olive and tomato salad with wholemeal bread", dinner: "Baked cod with courgette and cherry tomatoes", nutrition: { calories: "~1,400 kcal", protein: "~112g", carbs: "~105g", fat: "~44g" } },
            { breakfast: "Sliced avocado on toast with lemon and olive oil", lunch: "Chicken souvlaki salad with tzatziki", dinner: "Grilled prawns with tomato and olive salad", nutrition: { calories: "~1,440 kcal", protein: "~115g", carbs: "~106g", fat: "~46g" } },
            { breakfast: "Fruit salad with a handful of pistachios", lunch: "Nicoise salad with tuna and boiled egg", dinner: "Grilled sea bream with steamed courgette and lemon", nutrition: { calories: "~1,380 kcal", protein: "~110g", carbs: "~103g", fat: "~43g" } },
            { breakfast: "Smashed avocado with lemon and chilli on rye", lunch: "Grilled chicken souvlaki with tzatziki and tomato salad", dinner: "Baked salmon with roasted cherry tomatoes and olive oil", nutrition: { calories: "~1,420 kcal", protein: "~114g", carbs: "~107g", fat: "~45g" } },
            { breakfast: "Low-fat Greek yogurt with honey and walnuts", lunch: "Prawn and spinach salad with feta and lemon", dinner: "Chicken and vegetable caponata (Sicilian stew)", nutrition: { calories: "~1,440 kcal", protein: "~116g", carbs: "~108g", fat: "~46g" } }
        ],
        build_muscle: [
            { breakfast: "Greek yogurt with granola, honey and banana", lunch: "Chicken souvlaki with pitta, tzatziki and chips", dinner: "Lamb kebab with rice pilaf and salad", nutrition: { calories: "~2,580 kcal", protein: "~178g", carbs: "~265g", fat: "~70g" } },
            { breakfast: "Eggs with feta cheese and tomatoes on toast", lunch: "Grilled chicken with hummus and crusty bread", dinner: "Grilled lamb chops with roasted potatoes and salad", nutrition: { calories: "~2,550 kcal", protein: "~175g", carbs: "~258g", fat: "~68g" } },
            { breakfast: "Spinach and feta omelette with toast", lunch: "Tuna pasta with olive oil and capers", dinner: "Greek beef moussaka with salad", nutrition: { calories: "~2,600 kcal", protein: "~180g", carbs: "~268g", fat: "~72g" } },
            { breakfast: "Ricotta toast with figs and honey", lunch: "Chicken and orzo soup with crusty bread", dinner: "Moussaka with Greek salad and bread", nutrition: { calories: "~2,560 kcal", protein: "~176g", carbs: "~262g", fat: "~69g" } },
            { breakfast: "Shakshuka with extra eggs and crusty bread", lunch: "Grilled lamb pitta with tzatziki and chips", dinner: "Spaghetti bolognese with parmesan and salad", nutrition: { calories: "~2,590 kcal", protein: "~180g", carbs: "~266g", fat: "~71g" } },
            { breakfast: "Omelette with feta, olives and tomatoes", lunch: "Chicken and chickpea stew with crusty bread", dinner: "Grilled swordfish with orzo pasta and salad", nutrition: { calories: "~2,610 kcal", protein: "~183g", carbs: "~268g", fat: "~72g" } }
        ],
        improve_fitness: [
            { breakfast: "Wholemeal toast with olive oil and sliced tomatoes", lunch: "Falafel wrap with tzatziki and salad", dinner: "Chicken and vegetable pasta with olive oil", nutrition: { calories: "~2,000 kcal", protein: "~148g", carbs: "~205g", fat: "~65g" } },
            { breakfast: "Fruit salad with Greek yogurt and honey", lunch: "Hummus and grilled vegetable wrap", dinner: "Prawn saganaki with crusty bread and salad", nutrition: { calories: "~1,970 kcal", protein: "~144g", carbs: "~200g", fat: "~63g" } },
            { breakfast: "Porridge with figs, honey and walnuts", lunch: "Greek salad with bread and olive oil", dinner: "Chicken souvlaki with couscous and tzatziki", nutrition: { calories: "~2,010 kcal", protein: "~150g", carbs: "~208g", fat: "~66g" } },
            { breakfast: "Granola with Greek yogurt, fig and honey", lunch: "Grilled chicken and vegetable flatbread", dinner: "Seafood paella with green salad", nutrition: { calories: "~1,985 kcal", protein: "~147g", carbs: "~203g", fat: "~64g" } },
            { breakfast: "Overnight oats with orange zest and pistachios", lunch: "Chicken and tabbouleh pitta", dinner: "Lamb souvlaki with couscous and yogurt dip", nutrition: { calories: "~2,005 kcal", protein: "~150g", carbs: "~207g", fat: "~65g" } },
            { breakfast: "Tomato and olive bruschetta with two eggs", lunch: "Greek lentil soup with bread and olive oil", dinner: "Grilled sea bass with roasted red peppers and potatoes", nutrition: { calories: "~1,960 kcal", protein: "~143g", carbs: "~200g", fat: "~63g" } }
        ],
        maintain: [
            { breakfast: "Wholemeal toast with olive oil and feta", lunch: "Greek salad with bread and olives", dinner: "Slow-cooked lamb with orzo pasta", nutrition: { calories: "~1,800 kcal", protein: "~138g", carbs: "~182g", fat: "~62g" } },
            { breakfast: "Greek yogurt with fruit and mixed nuts", lunch: "Chicken pitta with tzatziki and salad", dinner: "Spaghetti with tomato sauce and olive oil", nutrition: { calories: "~1,775 kcal", protein: "~134g", carbs: "~178g", fat: "~60g" } },
            { breakfast: "Tomato and herb omelette with toast", lunch: "Hummus with pitta bread and olives", dinner: "Grilled swordfish with Greek salad and bread", nutrition: { calories: "~1,810 kcal", protein: "~140g", carbs: "~184g", fat: "~63g" } },
            { breakfast: "Croissant with jam and Greek yogurt", lunch: "Pasta primavera with parmesan", dinner: "Chicken souvlaki with rice pilaf and tzatziki", nutrition: { calories: "~1,795 kcal", protein: "~135g", carbs: "~182g", fat: "~62g" } },
            { breakfast: "Bircher muesli with apple, honey and yogurt", lunch: "Grilled sardines on toast with salad", dinner: "Beef stifado (Greek stew) with crusty bread", nutrition: { calories: "~1,810 kcal", protein: "~138g", carbs: "~185g", fat: "~63g" } },
            { breakfast: "Spanish omelette (tortilla) with salad", lunch: "Stuffed pitta with chicken, feta and olives", dinner: "Whole baked sea bass with roasted vegetables", nutrition: { calories: "~1,820 kcal", protein: "~140g", carbs: "~186g", fat: "~63g" } }
        ]
    }
};

// ===== MOTIVATIONAL MESSAGES =====
// Each level has 3 different messages - one is picked randomly each visit
// This keeps the messages feeling fresh and personal over a long period of time
var motivationalMessages = {
    1: [
        "Starting is the hardest part, and you have already done it. Every step forward, no matter how small, is a victory. Keep showing up!",
        "Every great athlete started exactly where you are right now. Be proud of yourself. Your journey has officially begun and it is going to be incredible!",
        "Day one is the foundation of everything great that is coming. You showed up today and that already makes you extraordinary. Let us build from here!"
    ],
    2: [
        "You are building real habits now, and that is exactly where transformation begins. Stay consistent, trust the process, and watch yourself grow!",
        "Look how far you have already come! You are getting stronger every single session. Your future self is cheering you on, so keep going!",
        "Consistency is the secret weapon of every successful athlete. You are proving every single day that you have got exactly what it takes to reach your goals!"
    ],
    3: [
        "Halfway to elite level and absolutely flying! You have turned exercise from an effort into a lifestyle. That is something truly remarkable to be proud of!",
        "Level 3! You are well and truly in the zone now. This is where the real results start to show up. You have earned every bit of this progress. Keep pushing!",
        "You are no longer a beginner. You have levelled up and it shows. You are becoming the best version of yourself, one session at a time. Outstanding work!"
    ],
    4: [
        "Level 4! You are pushing limits that most people never even attempt. This kind of dedication and commitment is what separates the good from the truly great!",
        "You are operating at a level that very few people ever reach. Champions are not born. They are built exactly like this, one session at a time. You are doing it!",
        "Just one step away from the summit now! Your commitment throughout this journey is genuinely inspiring. Elite level is right in front of you, so do not stop!"
    ],
    5: [
        "ELITE LEVEL UNLOCKED! You are a TRUE ATHLETE. Your discipline, dedication and consistency throughout this journey have been nothing short of extraordinary!",
        "MAXIMUM LEVEL ACHIEVED! You have proved beyond any doubt that with consistency and heart, there are absolutely no limits to what you can accomplish. You are at the very top!",
        "You have reached the peak that most people only dream about, and you have LIVED it! This is where legends are made. You are one of them. Absolutely incredible!"
    ]
};

// ===== HELPER FUNCTIONS =====
// These small functions are used across all pages

// Saves the user's profile to localStorage (the browser's built-in memory)
function saveProfile(profile) {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    // JSON.stringify converts the object into text so it can be stored
}

// Loads the user's profile from localStorage
function loadProfile() {
    var data = localStorage.getItem("userProfile");
    if (data === null) {
        return null; // Return null if no profile has been saved yet
    }
    return JSON.parse(data); // JSON.parse converts the text back into an object
}

// Saves the current difficulty level and updates the all-time best if higher
function saveDifficulty(level) {
    localStorage.setItem("difficultyLevel", level);
    var best = parseInt(localStorage.getItem("bestDifficulty") || "0");
    if (level > best) { localStorage.setItem("bestDifficulty", level); }
}

// Loads the current difficulty level from localStorage
function getDifficulty() {
    var level = localStorage.getItem("difficultyLevel");
    if (level === null) {
        return 1; // Default to level 1 if nothing has been saved yet
    }
    return parseInt(level); // parseInt turns the stored text into a number
}

// Returns the highest difficulty level the user has ever reached
function getBestDifficulty() {
    var best = localStorage.getItem("bestDifficulty");
    if (best === null) { return getDifficulty(); }
    return parseInt(best);
}

// Sets the starting difficulty based on the user's selected activity level
function getStartingDifficulty(activityLevel) {
    if (activityLevel === "beginner") {
        return 1; // Beginners start at the easiest level
    } else if (activityLevel === "intermediate") {
        return 3; // Intermediate users start in the middle
    } else {
        return 5; // Advanced users start at the hardest level
    }
}

// Gets the current meal day number (used to rotate between the 3 meal sets)
function getMealDay() {
    var day = localStorage.getItem("mealDay");
    if (day === null) {
        return 0; // Start on meal set 0 by default
    }
    return parseInt(day);
}

// Moves to the next meal set - called after the user completes a workout
// The % 6 makes it cycle through all 6 sets before repeating
function incrementMealDay() {
    var currentDay = getMealDay();
    var nextDay = (currentDay + 1) % 6; // Wraps back to 0 after reaching 5
    localStorage.setItem("mealDay", nextDay);
}

// Returns a randomly chosen motivational message for the given difficulty level
// Math.random() gives a random decimal between 0 and 1
// Multiplying by the number of messages and using Math.floor() picks index 0, 1 or 2
function getMotivationalMessage(level) {
    var messages = motivationalMessages[level];
    var randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// ===== AI FEEDBACK FUNCTION =====
// This is the core AI of the system - it adapts difficulty based on the user's response
// Returns an object with the new level and flags for reaching max or min
function applyFeedback(feedback) {
    var currentLevel = getDifficulty(); // Get the current difficulty level
    var maxReached = false; // Flag for when the user is already at the top
    var minReached = false; // Flag for when the user is already at the bottom

    if (feedback === "too_easy") {
        if (currentLevel < 5) {
            currentLevel = currentLevel + 1; // Increase difficulty by one level
        } else {
            maxReached = true; // Already at level 5 - cannot go higher
        }
    } else if (feedback === "too_hard") {
        if (currentLevel > 1) {
            currentLevel = currentLevel - 1; // Decrease difficulty by one level
        } else {
            minReached = true; // Already at level 1 - cannot go lower
        }
    }
    // If feedback is "manageable", the difficulty stays exactly the same

    saveDifficulty(currentLevel); // Save the updated difficulty level

    // Return an object with the new level and the two flags
    return {
        level: currentLevel,
        maxReached: maxReached, // True if the user hit the ceiling at level 5
        minReached: minReached  // True if the user hit the floor at level 1
    };
}

// Returns the list of exercises for the given goal and difficulty level
function getWorkout(goal, difficultyLevel) {
    return workoutPlans[goal][difficultyLevel]; // Look up exercises from the database
}

// Returns today's meal set based on dietary preference, goal, cuisine, and the current meal day
// Strict dietary needs (halal, vegan, vegetarian, gluten-free) always take priority over cuisine
// This ensures religious and health requirements are never overridden by a style preference
function getMeal(dietaryPreference, goal, cuisine) {
    var day = getMealDay(); // Get the current meal rotation day 

    // Check if the user has manually chosen a whole meal set on the feedback page 
    var manualChoice = localStorage.getItem("tomorrowMealChoice");
    if (manualChoice !== null) {
        day = parseInt(manualChoice);
        localStorage.removeItem("tomorrowMealChoice");
    }

    // Get the base meal set using dietary/cuisine priority rules
    var mealSet;

    // Strict dietary requirements always take priority over cuisine preference
    if (dietaryPreference === "halal" || dietaryPreference === "vegan" ||
        dietaryPreference === "vegetarian" || dietaryPreference === "gluten_free") {
        mealSet = mealPlans[dietaryPreference][goal][day];

    } else if (cuisine && cuisine !== "no_preference") {
        // User picked a specific cuisine - use the culturally relevant meals
        mealSet = cuisineMeals[cuisine][goal][day];

    } else {
        // No strict requirement and no cuisine - use the default dietary preference meals
        mealSet = mealPlans[dietaryPreference][goal][day];
    }

    // Check if the user picked individual meals per slot on the feedback page
    // These override just the breakfast, lunch, or dinner while keeping the rest as default
    var customBreakfast = localStorage.getItem("customBreakfast");
    var customLunch     = localStorage.getItem("customLunch");
    var customDinner    = localStorage.getItem("customDinner");

    if (customBreakfast !== null || customLunch !== null || customDinner !== null) {
        // Build a new meal object using the custom choices where available
        mealSet = {
            breakfast: customBreakfast !== null ? customBreakfast : mealSet.breakfast,
            lunch:     customLunch     !== null ? customLunch     : mealSet.lunch,
            dinner:    customDinner    !== null ? customDinner    : mealSet.dinner,
            nutrition: mealSet.nutrition // Nutrition stays from the default set (values are approximate)
        };

        // Clear the custom choices after use so they only apply once
        localStorage.removeItem("customBreakfast");
        localStorage.removeItem("customLunch");
        localStorage.removeItem("customDinner");
    }

    return mealSet;
}

// Returns all available meal set options for a given profile - used on the feedback page meal chooser
function getAllMealOptions(dietaryPreference, goal, cuisine) {

    // Strict dietary requirements always take full priority - only return matching meals
    if (dietaryPreference === "halal" || dietaryPreference === "vegan" ||
        dietaryPreference === "vegetarian" || dietaryPreference === "gluten_free") {
        return mealPlans[dietaryPreference][goal]; // 3 sets, all matching the requirement
    }

    // If a specific cuisine is selected, only return that cuisine's meals
    if (cuisine && cuisine !== "no_preference") {
        return cuisineMeals[cuisine][goal]; // 3 sets from the chosen cuisine
    }

    // No preference on diet AND cuisine - return ALL available meals so the user has full choice
    // Each set gets a sourceLabel so the picker can show where the meal comes from
    var allSets = [];

    // All 3 standard mixed/western sets
    var standardSets = mealPlans["no_preference"][goal];
    for (var i = 0; i < standardSets.length; i++) {
        allSets.push({
            breakfast:   standardSets[i].breakfast,
            lunch:       standardSets[i].lunch,
            dinner:      standardSets[i].dinner,
            nutrition:   standardSets[i].nutrition,
            sourceLabel: "Mixed / Western" // Label shown in the meal picker
        });
    }

    // All 3 sets from each world cuisine
    var cuisineCategories = [
        { key: "south_asian",    label: "South Asian" },
        { key: "middle_eastern", label: "Middle Eastern" },
        { key: "east_asian",     label: "East Asian" },
        { key: "west_african",   label: "West African / Caribbean" },
        { key: "mediterranean",  label: "Mediterranean" }
    ];

    for (var c = 0; c < cuisineCategories.length; c++) {
        var category = cuisineCategories[c];
        var sets = cuisineMeals[category.key][goal];
        for (var j = 0; j < sets.length; j++) {
            allSets.push({
                breakfast:   sets[j].breakfast,
                lunch:       sets[j].lunch,
                dinner:      sets[j].dinner,
                nutrition:   sets[j].nutrition,
                sourceLabel: category.label
            });
        }
    }

    return allSets; // Up to 18 sets total - full variety for users with no preference
}

// ===== DATE HELPERS =====

// Returns today's date as a whole number of days since 1 Jan 1970 (in local time)
// Using a number instead of a formatted string avoids any chance of text mismatch
// Example: April 24 2026 returns 20571
function getTodayDayNumber() {
    var now          = new Date();
    var localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // new Date(year, month, day) creates a Date at midnight in local time
    // dividing by milliseconds-per-day converts the timestamp to a whole day number
    return Math.floor(localMidnight.getTime() / (1000 * 60 * 60 * 24));
}

// ===== STREAK SYSTEM =====

// Returns the current consecutive-day streak from localStorage
function getStreak() {
    var streak = localStorage.getItem("streakCount");
    if (streak === null) { return 0; }
    return parseInt(streak);
}

// Returns the total number of sessions ever completed
function getTotalSessions() {
    var t = localStorage.getItem("totalSessions");
    return t === null ? 0 : parseInt(t);
}

// Returns the highest consecutive-day streak the user has ever achieved
function getBestStreak() {
    var b = localStorage.getItem("bestStreak");
    return b === null ? getStreak() : parseInt(b);
}

// Called when the user completes a workout (submits feedback).
// streakCount   = consecutive active days (rest days are neutral — they don't break the streak)
// totalSessions = all-time session count (never resets)
// Returns the new streak so the rest of the page can use it.
function updateStreak() {
    var todayNum  = getTodayDayNumber();
    var lastDay   = localStorage.getItem("lastWorkoutDay");
    var streak    = getStreak();
    var restDays  = getRestDays();

    if (lastDay === null) {
        // First ever session
        streak = 1;
        localStorage.setItem("firstSessionDay", todayNum);
    } else {
        var lastDayNum = parseInt(lastDay);
        if (lastDayNum === todayNum) {
            // Second session same day — streak stays the same
        } else {
            // Walk every day between last workout and today.
            // If any of those days is not a planned rest day, the streak is broken.
            var gapBroken = false;
            for (var d = lastDayNum + 1; d < todayNum; d++) {
                if (restDays.indexOf(d) === -1) {
                    gapBroken = true;
                    break;
                }
            }
            streak = gapBroken ? 1 : streak + 1;
        }
    }

    // Keep track of the best streak ever
    var best = parseInt(localStorage.getItem("bestStreak") || "0");
    if (streak > best) { localStorage.setItem("bestStreak", streak); }

    localStorage.setItem("streakCount", streak);
    localStorage.setItem("lastWorkoutDay", todayNum);

    // Total sessions always increments regardless of day logic
    localStorage.setItem("totalSessions", getTotalSessions() + 1);

    // Record this day in the workout day log used by the activity calendar
    var wDays = getWorkoutDays();
    if (wDays.indexOf(todayNum) === -1) {
        wDays.push(todayNum);
        var cutoff = todayNum - 90;
        wDays = wDays.filter(function(d) { return d >= cutoff; });
        localStorage.setItem("workoutDays", JSON.stringify(wDays));
    }

    return streak;
}

// Returns the day number of the user's very first session (used to avoid
// showing red squares on the calendar before the app was in use)
function getFirstSessionDay() {
    var f = localStorage.getItem("firstSessionDay");
    return f === null ? getTodayDayNumber() : parseInt(f);
}

// Returns the array of day numbers (integers) when the user completed a workout
function getWorkoutDays() {
    var w = localStorage.getItem("workoutDays");
    return w === null ? [] : JSON.parse(w);
}

// Returns the array of day numbers the user has planned as rest days
function getRestDays() {
    var r = localStorage.getItem("restDays");
    return r === null ? [] : JSON.parse(r);
}

// Marks a specific day number as a planned rest day
function markRestDay(dayNum) {
    var rDays = getRestDays();
    if (rDays.indexOf(dayNum) === -1) {
        rDays.push(dayNum);
        localStorage.setItem("restDays", JSON.stringify(rDays));
    }
}

// Removes a planned rest day (undo)
function unmarkRestDay(dayNum) {
    var rDays = getRestDays().filter(function(d) { return d !== dayNum; });
    localStorage.setItem("restDays", JSON.stringify(rDays));
}

// Returns true if a rest day should be suggested (3+ consecutive days)
function shouldSuggestRestDay() {
    return getStreak() >= 3;
}

// Returns true if the user has already submitted feedback at least once today
function hasWorkedOutToday() {
    var lastNum = localStorage.getItem("lastWorkoutDay");
    if (lastNum === null) { return false; }
    return parseInt(lastNum) === getTodayDayNumber();
}

// ===== PROGRESS HISTORY =====

// Returns the stored array of the last 7 difficulty levels
function getHistory() {
    var history = localStorage.getItem("difficultyHistory");
    if (history === null) { return []; }
    return JSON.parse(history); // JSON.parse converts the stored text back into an array
}

// Adds the current difficulty level to the history and keeps only the last 7 entries
function updateHistory(level) {
    var history = getHistory();
    history.push(level); // Add the new level to the end of the array
    if (history.length > 7) {
        history.shift(); // Remove the oldest entry when there are more than 7
    }
    localStorage.setItem("difficultyHistory", JSON.stringify(history));
}

// ===== BADGE SYSTEM =====

// The complete list of all badges that can be earned
// id: used in code, name: shown to the user, description: explains how to earn it
var allBadges = [
    { id: "first_step",        name: "First Step",        description: "Complete your very first workout session" },
    { id: "on_a_roll",         name: "On a Roll",         description: "Complete 3 sessions" },
    { id: "double_digits",     name: "Double Digits",     description: "Complete 10 sessions" },
    { id: "week_warrior",      name: "Week Warrior",      description: "Complete 20 sessions" },
    { id: "committed",         name: "Committed",         description: "Complete 30 sessions" },
    { id: "fortnight_fighter", name: "Fortnight Fighter", description: "Complete 50 sessions" },
    { id: "half_century",      name: "Half Century",      description: "Complete 75 sessions" },
    { id: "centurion",         name: "Centurion",         description: "Complete 100 sessions" },
    { id: "rising_star",       name: "Rising Star",       description: "Reach difficulty level 3" },
    { id: "challenger",        name: "Challenger",        description: "Reach difficulty level 4" },
    { id: "elite",             name: "Elite",             description: "Reach difficulty level 5" },
    { id: "meal_planner",      name: "Meal Planner",      description: "Customise your meal plan for the first time" }
];

// Returns the array of badge IDs the user has already unlocked
function getUnlockedBadges() {
    var badges = localStorage.getItem("unlockedBadges");
    if (badges === null) { return []; }
    return JSON.parse(badges);
}

// Checks whether any new badges have been earned this session.
// streak       = current consecutive-day streak
// difficulty   = current difficulty level
// totalSessions = all-time session count (used for count-based badges so they survive a streak reset)
// Returns an array of newly earned badge names so they can be shown as a notification
function checkAndUnlockBadges(streak, difficulty, totalSessions) {
    var unlocked      = getUnlockedBadges();
    var newlyUnlocked = []; // Will hold the names of any badges earned this session

    // Helper function: checks if a badge ID is already in the unlocked list
    function hasIt(id) {
        return unlocked.indexOf(id) !== -1;
    }

    // Count-based badges use totalSessions so they are never lost when a streak resets
    if (totalSessions >= 1   && !hasIt("first_step"))        { unlocked.push("first_step");        newlyUnlocked.push("First Step"); }
    if (totalSessions >= 3   && !hasIt("on_a_roll"))         { unlocked.push("on_a_roll");         newlyUnlocked.push("On a Roll"); }
    if (totalSessions >= 10  && !hasIt("double_digits"))     { unlocked.push("double_digits");     newlyUnlocked.push("Double Digits"); }
    if (totalSessions >= 20  && !hasIt("week_warrior"))      { unlocked.push("week_warrior");      newlyUnlocked.push("Week Warrior"); }
    if (totalSessions >= 30  && !hasIt("committed"))         { unlocked.push("committed");         newlyUnlocked.push("Committed"); }
    if (totalSessions >= 50  && !hasIt("fortnight_fighter")) { unlocked.push("fortnight_fighter"); newlyUnlocked.push("Fortnight Fighter"); }
    if (totalSessions >= 75  && !hasIt("half_century"))      { unlocked.push("half_century");      newlyUnlocked.push("Half Century"); }
    if (totalSessions >= 100 && !hasIt("centurion"))         { unlocked.push("centurion");         newlyUnlocked.push("Centurion"); }
    if (difficulty >= 3 && !hasIt("rising_star"))     { unlocked.push("rising_star");       newlyUnlocked.push("Rising Star"); }
    if (difficulty >= 4 && !hasIt("challenger"))      { unlocked.push("challenger");        newlyUnlocked.push("Challenger"); }
    if (difficulty >= 5 && !hasIt("elite"))           { unlocked.push("elite");             newlyUnlocked.push("Elite"); }
    if (localStorage.getItem("everSavedCustomMeal") === "true" && !hasIt("meal_planner")) {
        unlocked.push("meal_planner");
        newlyUnlocked.push("Meal Planner");
    }

    localStorage.setItem("unlockedBadges", JSON.stringify(unlocked)); // Save the updated list
    return newlyUnlocked; // Return new badge names so the UI can notify the user
}

// ===== WATER & BMI HELPERS =====

// Returns a recommended daily water intake string based on weight and activity level.
// Base formula: 35 ml per kg of body weight, with extra for more active users.
function getWaterTarget(weight, activityLevel) {
    var w = parseFloat(weight);
    if (!w || w < 30) { return null; }
    var ml = w * 35;
    if (activityLevel === "intermediate") { ml += 300; }
    if (activityLevel === "advanced")     { ml += 500; }
    return "~" + (ml / 1000).toFixed(1) + "L";
}

// Calculates BMI from weight (kg) and height (cm).
// Returns an object with a numeric value and a WHO category string, or null if data is missing.
function getBMI(weight, height) {
    var w = parseFloat(weight);
    var h = parseFloat(height) / 100; // convert cm to metres
    if (!w || !h || h <= 0) { return null; }
    var bmi = w / (h * h);
    var category, cssClass;
    if      (bmi < 18.5) { category = "Underweight";    cssClass = "bmi-underweight"; }
    else if (bmi < 25)   { category = "Healthy weight";  cssClass = "bmi-healthy"; }
    else if (bmi < 30)   { category = "Overweight";      cssClass = "bmi-overweight"; }
    else                 { category = "Obese";            cssClass = "bmi-obese"; }
    return { value: bmi.toFixed(1), category: category, cssClass: cssClass };
}

// ===== ACCESSIBILITY SETTINGS =====

// Reads saved accessibility preferences from localStorage and applies them to the page
// This runs automatically at the bottom of this file so every page gets the correct settings
function loadAccessibility() {
    if (localStorage.getItem("acc_dark")     === "on") document.body.classList.add("dark-mode");
    if (localStorage.getItem("acc_large")    === "on") document.body.classList.add("large-text");
    if (localStorage.getItem("acc_contrast") === "on") document.body.classList.add("high-contrast");
}

// Toggles dark mode on or off and saves the new state
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("acc_dark", document.body.classList.contains("dark-mode") ? "on" : "off");
    refreshAccessibilityPanel(); // Update the button labels to show current state
}

// Toggles larger text on or off and saves the new state
function toggleLargeText() {
    document.body.classList.toggle("large-text");
    localStorage.setItem("acc_large", document.body.classList.contains("large-text") ? "on" : "off");
    refreshAccessibilityPanel();
}

// Toggles high contrast mode on or off and saves the new state
function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem("acc_contrast", document.body.classList.contains("high-contrast") ? "on" : "off");
    refreshAccessibilityPanel();
}

// Shows or hides the accessibility settings panel
function toggleAccessibilityPanel() {
    var panel = document.getElementById("accessibilityPanel");
    if (!panel) { return; }
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
        refreshAccessibilityPanel(); // Make sure labels are up to date when panel opens
    } else {
        panel.style.display = "none";
    }
}

// Updates the active/inactive style on each toggle button to reflect current state
function refreshAccessibilityPanel() {
    var darkBtn     = document.getElementById("acc_darkBtn");
    var largeBtn    = document.getElementById("acc_largeBtn");
    var contrastBtn = document.getElementById("acc_contrastBtn");

    // If the mode is active, add the acc-active class to highlight the button
    if (darkBtn) {
        darkBtn.className = "acc-option" +
            (document.body.classList.contains("dark-mode")     ? " acc-active" : "");
    }
    if (largeBtn) {
        largeBtn.className = "acc-option" +
            (document.body.classList.contains("large-text")    ? " acc-active" : "");
    }
    if (contrastBtn) {
        contrastBtn.className = "acc-option" +
            (document.body.classList.contains("high-contrast") ? " acc-active" : "");
    }
}

// ===== PERSONALISED NUTRITION TARGETS =====

// Calculates personalised daily calorie and macro targets based on the user's weight and goal.
// Uses a simplified version of the Mifflin-St Jeor formula scaled to the goal.
// weight is in kg (stored as a string in localStorage, so we parse it here).
// Returns an object with calories, protein, carbs and fat as formatted strings.
function getWeightTargets(weight, goal) {
    var w = parseFloat(weight);

    if (!w || w < 30 || w > 300) {
        return null; // No valid weight - caller should fall back to meal defaults
    }

    // Base calorie estimate: roughly 22 kcal per kg of body weight (sedentary baseline)
    // We then apply a goal multiplier to scale up or down
    var baseCalories = Math.round(w * 22);

    var calories, proteinG, carbsG, fatG;

    if (goal === "lose_weight") {
        // Deficit: ~15% below base, higher protein to preserve muscle
        calories = Math.round(baseCalories * 0.85);
        proteinG = Math.round(w * 2.0);   // 2 g per kg
        fatG     = Math.round(w * 0.8);   // 0.8 g per kg
        carbsG   = Math.round((calories - (proteinG * 4) - (fatG * 9)) / 4);

    } else if (goal === "build_muscle") {
        // Surplus: ~20% above base, very high protein
        calories = Math.round(baseCalories * 1.20);
        proteinG = Math.round(w * 2.2);   // 2.2 g per kg
        fatG     = Math.round(w * 1.0);
        carbsG   = Math.round((calories - (proteinG * 4) - (fatG * 9)) / 4);

    } else if (goal === "improve_fitness") {
        // Maintenance + small surplus, balanced macros
        calories = Math.round(baseCalories * 1.10);
        proteinG = Math.round(w * 1.8);
        fatG     = Math.round(w * 0.9);
        carbsG   = Math.round((calories - (proteinG * 4) - (fatG * 9)) / 4);

    } else {
        // maintain - straight maintenance calories
        calories = baseCalories;
        proteinG = Math.round(w * 1.6);
        fatG     = Math.round(w * 0.85);
        carbsG   = Math.round((calories - (proteinG * 4) - (fatG * 9)) / 4);
    }

    // Guard against negative carbs if weight/goal combo pushes macros over calories
    if (carbsG < 0) { carbsG = 0; }

    return {
        calories: "~" + calories + " kcal",
        protein:  "~" + proteinG + "g",
        carbs:    "~" + carbsG + "g",
        fat:      "~" + fatG + "g"
    };
}

// Apply saved settings immediately when this file loads - works on every page automatically
loadAccessibility();
