// Workout Data with Diet Plans, YouTube Links, and Photos
export const workouts = [
    {
        id: 1,
        title: 'Full Body HIIT Blast',
        type: 'hiit',
        duration: 30,
        calories: 400,
        level: 'intermediate',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&h=300&fit=crop',
        tags: ['Fat Burn', 'No Equipment', 'High Intensity'],
        exercises: [
            { name: 'Burpees', youtube: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
            { name: 'Mountain Climbers', youtube: 'https://www.youtube.com/watch?v=nmwgirgXLYM' },
            { name: 'Jump Squats', youtube: 'https://www.youtube.com/watch?v=A-cFYWvaHr0' },
            { name: 'High Knees', youtube: 'https://www.youtube.com/watch?v=oDdkytliOqE' },
            { name: 'Plank Jacks', youtube: 'https://www.youtube.com/watch?v=9PjpcxPJauw' }
        ],
        diet: {
            pre: 'Banana + Almonds (30 min before)',
            post: 'Protein shake + Whole grain toast',
            tip: 'Stay hydrated with 500ml water during workout'
        }
    },
    {
        id: 2,
        title: 'Upper Body Strength',
        type: 'strength',
        duration: 45,
        calories: 350,
        level: 'intermediate',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop',
        tags: ['Muscle Build', 'Dumbbells', 'Push/Pull'],
        exercises: [
            { name: 'Bench Press 4x12', youtube: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
            { name: 'Shoulder Press 3x10', youtube: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
            { name: 'Bent-over Row 4x10', youtube: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' },
            { name: 'Bicep Curls 3x12', youtube: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
            { name: 'Tricep Dips 3x15', youtube: 'https://www.youtube.com/watch?v=6kALZikXxLc' }
        ],
        diet: {
            pre: 'Oatmeal + Eggs (1hr before)',
            post: '40g Protein + Complex carbs',
            tip: 'Consume 1.6-2.2g protein per kg bodyweight daily'
        }
    },
    {
        id: 3,
        title: 'Core Crusher',
        type: 'strength',
        duration: 20,
        calories: 200,
        level: 'beginner',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        tags: ['Abs', 'Core Stability', 'No Equipment'],
        exercises: [
            { name: 'Plank 60s', youtube: 'https://www.youtube.com/watch?v=ASdvN_XEl_c' },
            { name: 'Bicycle Crunches 3x20', youtube: 'https://www.youtube.com/watch?v=9FGilxCbdz8' },
            { name: 'Leg Raises 3x15', youtube: 'https://www.youtube.com/watch?v=JB2oyawG9KI' },
            { name: 'Russian Twists 3x20', youtube: 'https://www.youtube.com/watch?v=wkD8rjkodUI' },
            { name: 'Dead Bug 3x12', youtube: 'https://www.youtube.com/watch?v=I5xbsA71v4c' }
        ],
        diet: {
            pre: 'Light snack - Greek yogurt',
            post: 'Lean protein + Vegetables',
            tip: 'Reduce sodium to reveal abs faster'
        }
    },
    {
        id: 4,
        title: 'Cardio Endurance',
        type: 'cardio',
        duration: 40,
        calories: 500,
        level: 'beginner',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
        tags: ['Heart Health', 'Endurance', 'Fat Burn'],
        exercises: [
            { name: 'Jogging 10min', youtube: 'https://www.youtube.com/watch?v=bJhvzeZL7JU' },
            { name: 'Jumping Jacks 3x1min', youtube: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8' },
            { name: 'Step-ups 3x2min', youtube: 'https://www.youtube.com/watch?v=dQqApCGd5Ss' },
            { name: 'Skipping 3x1min', youtube: 'https://www.youtube.com/watch?v=FJmRQ5iTXKE' },
            { name: 'Cool Down Walk', youtube: 'https://www.youtube.com/watch?v=SdzCHhwbLlY' }
        ],
        diet: {
            pre: 'Toast with peanut butter',
            post: 'Fruit smoothie + Protein',
            tip: 'Eat complex carbs for sustained energy'
        }
    },
    {
        id: 5,
        title: 'Leg Day Power',
        type: 'strength',
        duration: 50,
        calories: 450,
        level: 'advanced',
        image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop',
        tags: ['Muscle Build', 'Lower Body', 'Strength'],
        exercises: [
            { name: 'Squats 5x5', youtube: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
            { name: 'Romanian Deadlift 4x10', youtube: 'https://www.youtube.com/watch?v=JCXUYuzwNrM' },
            { name: 'Leg Press 4x12', youtube: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
            { name: 'Walking Lunges 3x20', youtube: 'https://www.youtube.com/watch?v=L8fvypPrzzs' },
            { name: 'Calf Raises 4x15', youtube: 'https://www.youtube.com/watch?v=gwLzBJYoWlI' }
        ],
        diet: {
            pre: 'Rice + Chicken (2hrs before)',
            post: 'High protein meal + Sweet potato',
            tip: 'Leg day burns most calories - eat accordingly'
        }
    },
    {
        id: 6,
        title: 'Yoga Flow',
        type: 'flexibility',
        duration: 35,
        calories: 180,
        level: 'beginner',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        tags: ['Flexibility', 'Mind-Body', 'Recovery'],
        exercises: [
            { name: 'Sun Salutation', youtube: 'https://www.youtube.com/watch?v=73sjOu0g58M' },
            { name: 'Warrior Poses', youtube: 'https://www.youtube.com/watch?v=k4qaVoAbeHM' },
            { name: 'Downward Dog', youtube: 'https://www.youtube.com/watch?v=j97SSGsnCAQ' },
            { name: 'Child Pose', youtube: 'https://www.youtube.com/watch?v=eqVMAPM00DM' },
            { name: 'Savasana', youtube: 'https://www.youtube.com/watch?v=1VYlOKUdylM' }
        ],
        diet: {
            pre: 'Light - herbal tea + fruit',
            post: 'Hydrating foods + Light protein',
            tip: 'Practice on empty stomach for best results'
        }
    },
    {
        id: 7,
        title: 'Tabata Fat Burner',
        type: 'hiit',
        duration: 25,
        calories: 380,
        level: 'advanced',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
        tags: ['Fat Burn', 'Tabata', 'Intense'],
        exercises: [
            { name: '20s Burpees/10s Rest x8', youtube: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
            { name: 'Jump Squats x8', youtube: 'https://www.youtube.com/watch?v=A-cFYWvaHr0' },
            { name: 'Push-ups x8', youtube: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
            { name: 'High Knees x8', youtube: 'https://www.youtube.com/watch?v=oDdkytliOqE' }
        ],
        diet: {
            pre: 'Energy bar 30min before',
            post: 'Protein + Electrolytes ASAP',
            tip: 'HIIT boosts metabolism for 24-48 hours'
        }
    },
    {
        id: 8,
        title: 'Mobility & Stretch',
        type: 'flexibility',
        duration: 30,
        calories: 120,
        level: 'beginner',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
        tags: ['Recovery', 'Flexibility', 'Joint Health'],
        exercises: [
            { name: 'Foam Rolling', youtube: 'https://www.youtube.com/watch?v=SxQwXHR4YXU' },
            { name: 'Hip Openers', youtube: 'https://www.youtube.com/watch?v=JBHzXF-mVjY' },
            { name: 'Spine Twists', youtube: 'https://www.youtube.com/watch?v=fy4QBpaMvQU' },
            { name: 'Shoulder Stretches', youtube: 'https://www.youtube.com/watch?v=SHm3sQ_76jQ' },
            { name: 'Hamstring Stretches', youtube: 'https://www.youtube.com/watch?v=FDwpEdxZ4H4' }
        ],
        diet: {
            pre: 'Optional - light snack',
            post: 'Anti-inflammatory foods',
            tip: 'Add omega-3s for joint health'
        }
    }
]

// Equipment Data
export const equipment = [
    {
        id: 1,
        name: 'Adjustable Dumbbells',
        category: 'weights',
        description: 'Space-saving adjustable weights from 5-52.5 lbs. Perfect for home workouts.',
        price: '$299',
        icon: 'Dumbbell',
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Resistance Bands Set',
        category: 'accessories',
        description: 'Complete set with 5 resistance levels for full-body training.',
        price: '$29',
        icon: 'Circle',
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Yoga Mat Premium',
        category: 'accessories',
        description: 'Extra thick, non-slip mat for yoga, stretching, and floor exercises.',
        price: '$45',
        icon: 'Layers',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Foam Roller',
        category: 'recovery',
        description: 'High-density foam roller for muscle recovery and myofascial release.',
        price: '$35',
        icon: 'Cylinder',
        image: 'https://images.unsplash.com/photo-1647014774031-53e2c43f6dd2?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Pull-up Bar',
        category: 'weights',
        description: 'Doorway pull-up bar with multiple grip positions. No screws needed.',
        price: '$39',
        icon: 'Minus',
        image: 'https://images.unsplash.com/photo-1598971639058-a4e6e4f15c4a?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Kettlebell Set',
        category: 'weights',
        description: 'Cast iron kettlebells (15, 25, 35 lbs) for dynamic strength training.',
        price: '$149',
        icon: 'CircleDot',
        image: 'https://images.unsplash.com/photo-1517343985841-f8b2d66e010b?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Smart Jump Rope',
        category: 'accessories',
        description: 'Digital jump rope that tracks jumps, calories, and workout time.',
        price: '$25',
        icon: 'Activity',
        image: 'https://images.unsplash.com/photo-1515775054133-0a68214921d4?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Massage Gun Pro',
        category: 'recovery',
        description: 'Percussion therapy device for deep muscle recovery.',
        price: '$199',
        icon: 'Zap',
        image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop'
    }
]

// Diet Plans for Different Goals
export const dietPlans = {
    'weight-loss': {
        name: 'Fat Loss Plan',
        emoji: '🔥',
        calories: '1500-1800/day',
        macros: '40% Protein, 30% Carbs, 30% Fat',
        meals: [
            { time: 'Breakfast', food: 'Egg whites + Spinach + Whole grain toast' },
            { time: 'Snack', food: 'Greek yogurt + Berries' },
            { time: 'Lunch', food: 'Grilled chicken salad + Olive oil dressing' },
            { time: 'Snack', food: 'Apple + Almonds' },
            { time: 'Dinner', food: 'Salmon + Steamed vegetables + Quinoa' }
        ],
        tips: ['Drink 3L water daily', 'Avoid processed foods', 'No eating after 8 PM']
    },
    'muscle-gain': {
        name: 'Muscle Building Plan',
        emoji: '💪',
        calories: '2500-3000/day',
        macros: '35% Protein, 45% Carbs, 20% Fat',
        meals: [
            { time: 'Breakfast', food: 'Oatmeal + Eggs + Banana + Peanut butter' },
            { time: 'Snack', food: 'Protein shake + Rice cakes' },
            { time: 'Lunch', food: 'Chicken breast + Brown rice + Broccoli' },
            { time: 'Pre-workout', food: 'Banana + Protein bar' },
            { time: 'Post-workout', food: 'Whey protein + Fast carbs' },
            { time: 'Dinner', food: 'Steak + Sweet potato + Mixed greens' }
        ],
        tips: ['Eat protein every 3 hours', 'Never skip post-workout meal', 'Get 8hrs sleep']
    },
    'toning': {
        name: 'Lean & Toned Plan',
        emoji: '✨',
        calories: '1800-2200/day',
        macros: '35% Protein, 40% Carbs, 25% Fat',
        meals: [
            { time: 'Breakfast', food: 'Smoothie bowl + Granola + Fruits' },
            { time: 'Snack', food: 'Cottage cheese + Cucumber' },
            { time: 'Lunch', food: 'Turkey wrap + Side salad' },
            { time: 'Snack', food: 'Protein yogurt + Nuts' },
            { time: 'Dinner', food: 'White fish + Quinoa + Roasted veggies' }
        ],
        tips: ['Balance cardio and strength', 'Eat clean, minimize sugar', 'Stay consistent']
    }
}

// 5 Variations for each goal, linked to specific workouts
export const transformationVariations = {
    'weight-loss': [
        {
            id: 'wl-1',
            label: 'Lean & Athletic',
            description: 'Balanced fat loss with preserved muscle mass',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop',
            workoutId: 1, // Full Body HIIT
            effects: {
                filter: 'contrast(1.1) brightness(1.05)',
                transform: 'scaleX(0.95)',
                removeBackground: true
            }
        },
        {
            id: 'wl-2',
            label: 'Slim Runner',
            description: 'Significant weight loss with a slender physique',
            image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop',
            workoutId: 4, // Cardio Endurance
            effects: {
                filter: 'contrast(1.05) brightness(1.08)',
                transform: 'scaleX(0.90)',
                removeBackground: true
            }
        },
        {
            id: 'wl-3',
            label: 'Toned Core',
            description: 'Focus on belly fat reduction and waist definition',
            image: 'https://images.unsplash.com/photo-1609632801459-b14801b7a2bb?w=400&h=500&fit=crop',
            workoutId: 3, // Core Crusher
            effects: {
                filter: 'contrast(1.15) saturate(1.1)',
                transform: 'scaleX(0.94)',
                removeBackground: true
            }
        },
        {
            id: 'wl-4',
            label: 'Beach Ready',
            description: 'All-over toning for a summer-ready look',
            image: 'https://images.unsplash.com/photo-1545934507-688921b79f22?w=400&h=500&fit=crop',
            workoutId: 7, // Tabata
            effects: {
                filter: 'saturate(1.2) brightness(1.05)',
                transform: 'scaleX(0.93)',
                removeBackground: true
            }
        },
        {
            id: 'wl-5',
            label: 'Agile & Fit',
            description: 'Functional fitness look with great mobility',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
            workoutId: 8, // Mobility
            effects: {
                filter: 'contrast(1.1)',
                transform: 'scaleX(0.96)',
                removeBackground: true
            }
        }
    ],
    'muscle-gain': [
        {
            id: 'mg-1',
            label: 'Bodybuilder',
            description: 'Maximum hypertrophy and muscle size',
            image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop',
            workoutId: 2, // Upper Body Strength
            effects: {
                filter: 'contrast(1.15) saturate(1.1)',
                transform: 'scaleX(1.15) scaleY(1.02)',
                removeBackground: true
            }
        },
        {
            id: 'mg-2',
            label: 'Powerlifter',
            description: 'Thick, dense muscle with a focus on legs/back',
            image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=500&fit=crop',
            workoutId: 5, // Leg Day
            effects: {
                filter: 'contrast(1.1)',
                transform: 'scaleX(1.12)',
                removeBackground: true
            }
        },
        {
            id: 'mg-3',
            label: 'CrossFit Athlete',
            description: 'Functional muscle, balanced upper and lower body',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=500&fit=crop',
            workoutId: 1, // HIIT
            effects: {
                filter: 'contrast(1.2) saturate(0.9)',
                transform: 'scaleX(1.08)',
                removeBackground: true
            }
        },
        {
            id: 'mg-4',
            label: 'Fitness Model',
            description: 'Aesthetic physique with wide shoulders, small waist',
            image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=400&h=500&fit=crop',
            workoutId: 2, // Upper Body
            effects: {
                filter: 'contrast(1.1) brightness(1.05)',
                transform: 'scaleX(1.1) scaleY(1.05)',
                removeBackground: true
            }
        },
        {
            id: 'mg-5',
            label: 'Strongman',
            description: 'Massive overall size and power',
            image: 'https://images.unsplash.com/photo-1533681904393-9ab6eea9e72e?w=400&h=500&fit=crop',
            workoutId: 5, // Leg Day
            effects: {
                filter: 'sepia(0.2) contrast(1.15)',
                transform: 'scaleX(1.2)',
                removeBackground: true
            }
        }
    ],
    'toning': [
        {
            id: 'tn-1',
            label: 'Yoga Sculpt',
            description: 'Long, lean muscles with great posture',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=500&fit=crop',
            workoutId: 6, // Yoga
            effects: {
                filter: 'brightness(1.05) contrast(1.05)',
                transform: 'scaleX(0.97)',
                removeBackground: true
            }
        },
        {
            id: 'tn-2',
            label: 'Pilates Body',
            description: 'Extremely defined core and lean limbs',
            image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=500&fit=crop',
            workoutId: 3, // Core
            effects: {
                filter: 'contrast(1.1)',
                transform: 'scaleX(0.96)',
                removeBackground: true
            }
        },
        {
            id: 'tn-3',
            label: 'Dancer Physique',
            description: 'Elegant, strong, and flexible look',
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=500&fit=crop',
            workoutId: 8, // Stretch
            effects: {
                filter: 'saturate(1.1) brightness(1.05)',
                transform: 'scaleX(0.95)',
                removeBackground: true
            }
        },
        {
            id: 'tn-4',
            label: 'Athletic Tone',
            description: 'Visible muscle separation with low body fat',
            image: 'https://images.unsplash.com/photo-1534438324357-12299f804b7b?w=400&h=500&fit=crop',
            workoutId: 1, // HIIT
            effects: {
                filter: 'contrast(1.15)',
                transform: 'scaleX(0.98)',
                removeBackground: true
            }
        },
        {
            id: 'tn-5',
            label: 'Beach Body',
            description: 'Balanced, healthy, and vibrant look',
            image: 'https://images.unsplash.com/photo-1545934507-688921b79f22?w=400&h=500&fit=crop',
            workoutId: 4, // Cardio
            effects: {
                filter: 'saturate(1.2)',
                transform: 'scaleX(0.97)',
                removeBackground: true
            }
        }
    ]
}

export const transformationEffects = {
    'weight-loss': {
        beforeFilter: 'none',
        afterFilter: 'contrast(1.15) brightness(1.05)',
        afterTransform: 'scaleX(0.92)',
        description: 'Slimmer waist, more defined features',
        feedback: [
            'Noticeable reduction in overall body fat percentage, particularly around the midsection.',
            'Improved jawline definition and reduced facial puffiness.',
            'Visible collarbones indicating lower body fat levels.',
            'Your posture will naturally improve as core strength increases.'
        ],
        stats: {
            bodyFat: '-5% to -8%',
            energyLevels: '+40%',
            metabolicRate: '+15%'
        }
    },
    'muscle-gain': {
        beforeFilter: 'none',
        afterFilter: 'contrast(1.1) saturate(1.15) brightness(1.02)',
        afterTransform: 'scaleX(1.08) scaleY(1.02)',
        description: 'Bigger muscles, broader shoulders',
        feedback: [
            'Significant increase in upper body muscle mass, especially shoulders and chest.',
            'Arms look fuller and more defined with visible vascularity.',
            'Broader back creating a more athletic V-taper physique.',
            'Legs showing separation and increased size in quads and calves.'
        ],
        stats: {
            muscleMass: '+8 to +12 lbs',
            strength: '+30%',
            testosterone: '+25%'
        }
    },
    'toning': {
        beforeFilter: 'none',
        afterFilter: 'contrast(1.12) saturate(1.1) brightness(1.03)',
        afterTransform: 'scaleX(0.98)',
        description: 'Leaner physique, more definition',
        feedback: [
            'Enhanced muscle definition without excessive bulk.',
            'Tighter skin and more visible muscle separation (abs line).',
            'Overall "tighter" look with reduced water retention.',
            'Athletic and functional physique capable of endurance.'
        ],
        stats: {
            bodyFat: '-3% to -5%',
            muscleDefinition: 'High',
            endurance: '+50%'
        }
    }
}
