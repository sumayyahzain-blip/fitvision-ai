// ========================================
// FitVision AI - Main Application
// ========================================

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

// App State
const state = {
    currentSection: 'home',
    selectedGoal: 'weight-loss',
    selectedIntensity: 'moderate',
    timeline: 6,
    uploadedImage: null,
    currentMonth: new Date()
};

// Workout Data with Diet Plans
const workouts = [
    {
        id: 1,
        title: 'Full Body HIIT Blast',
        type: 'hiit',
        duration: 30,
        calories: 400,
        level: 'intermediate',
        image: 'hiit',
        tags: ['Fat Burn', 'No Equipment', 'High Intensity'],
        exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees', 'Plank Jacks'],
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
        image: 'strength',
        tags: ['Muscle Build', 'Dumbbells', 'Push/Pull'],
        exercises: ['Bench Press 4x12', 'Shoulder Press 3x10', 'Bent-over Row 4x10', 'Bicep Curls 3x12', 'Tricep Dips 3x15'],
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
        image: 'core',
        tags: ['Abs', 'Core Stability', 'No Equipment'],
        exercises: ['Plank 60s', 'Bicycle Crunches 3x20', 'Leg Raises 3x15', 'Russian Twists 3x20', 'Dead Bug 3x12'],
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
        image: 'cardio',
        tags: ['Heart Health', 'Endurance', 'Fat Burn'],
        exercises: ['Jogging 10min', 'Jumping Jacks 3x1min', 'Step-ups 3x2min', 'Skipping 3x1min', 'Cool Down Walk'],
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
        image: 'legs',
        tags: ['Muscle Build', 'Lower Body', 'Strength'],
        exercises: ['Squats 5x5', 'Romanian Deadlift 4x10', 'Leg Press 4x12', 'Walking Lunges 3x20', 'Calf Raises 4x15'],
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
        image: 'yoga',
        tags: ['Flexibility', 'Mind-Body', 'Recovery'],
        exercises: ['Sun Salutation', 'Warrior Poses', 'Downward Dog', 'Child Pose', 'Savasana'],
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
        image: 'tabata',
        tags: ['Fat Burn', 'Tabata', 'Intense'],
        exercises: ['20s Burpees/10s Rest x8', 'Jump Squats x8', 'Push-ups x8', 'High Knees x8'],
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
        image: 'stretch',
        tags: ['Recovery', 'Flexibility', 'Joint Health'],
        exercises: ['Foam Rolling', 'Hip Openers', 'Spine Twists', 'Shoulder Stretches', 'Hamstring Stretches'],
        diet: {
            pre: 'Optional - light snack',
            post: 'Anti-inflammatory foods',
            tip: 'Add omega-3s for joint health'
        }
    }
];

// Equipment Data
const equipment = [
    {
        id: 1,
        name: 'Adjustable Dumbbells',
        category: 'weights',
        description: 'Space-saving adjustable weights from 5-52.5 lbs. Perfect for home workouts.',
        price: '$299',
        icon: 'dumbbell'
    },
    {
        id: 2,
        name: 'Resistance Bands Set',
        category: 'accessories',
        description: 'Complete set with 5 resistance levels for full-body training.',
        price: '$29',
        icon: 'circle'
    },
    {
        id: 3,
        name: 'Yoga Mat Premium',
        category: 'accessories',
        description: 'Extra thick, non-slip mat for yoga, stretching, and floor exercises.',
        price: '$45',
        icon: 'layers'
    },
    {
        id: 4,
        name: 'Foam Roller',
        category: 'recovery',
        description: 'High-density foam roller for muscle recovery and myofascial release.',
        price: '$35',
        icon: 'cylinder'
    },
    {
        id: 5,
        name: 'Pull-up Bar',
        category: 'weights',
        description: 'Doorway pull-up bar with multiple grip positions. No screws needed.',
        price: '$39',
        icon: 'minus'
    },
    {
        id: 6,
        name: 'Kettlebell Set',
        category: 'weights',
        description: 'Cast iron kettlebells (15, 25, 35 lbs) for dynamic strength training.',
        price: '$149',
        icon: 'circle-dot'
    },
    {
        id: 7,
        name: 'Smart Jump Rope',
        category: 'accessories',
        description: 'Digital jump rope that tracks jumps, calories, and workout time.',
        price: '$25',
        icon: 'activity'
    },
    {
        id: 8,
        name: 'Massage Gun Pro',
        category: 'recovery',
        description: 'Percussion therapy device for deep muscle recovery.',
        price: '$199',
        icon: 'zap'
    }
];

// Diet Plans for Different Goals
const dietPlans = {
    'weight-loss': {
        name: 'Fat Loss Plan',
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
};

// Initialize Application
function initApp() {
    setupNavigation();
    setupHeroAnimations();
    setupSimulator();
    renderWorkouts();
    renderEquipment();
    setupCalendar();
    setupModal();
    animateStats();
    setupNutrition();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
            navLinksContainer.classList.remove('active');
        });
    });

    mobileMenuBtn?.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // CTA Buttons
    document.getElementById('trySimulatorBtn')?.addEventListener('click', () => {
        navigateToSection('simulator');
    });

    document.getElementById('exploreWorkoutsBtn')?.addEventListener('click', () => {
        navigateToSection('workouts');
    });

    document.getElementById('getStartedBtn')?.addEventListener('click', () => {
        navigateToSection('simulator');
    });
}

function navigateToSection(sectionId) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // Show section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Hero Animations
function setupHeroAnimations() {
    // Add hover effects to hero cards
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
}

// Animate Stats Counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Simulator
function setupSimulator() {
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoInput');
    const uploadedPreview = document.getElementById('uploadedPreview');
    const previewImage = document.getElementById('previewImage');
    const removePhotoBtn = document.getElementById('removePhoto');
    const generateBtn = document.getElementById('generateBtn');
    const timelineSlider = document.getElementById('timelineSlider');
    const timelineValue = document.getElementById('timelineValue');

    // Upload handlers
    uploadArea?.addEventListener('click', () => photoInput.click());

    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-purple)';
    });

    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
    });

    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    photoInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageUpload(file);
    });

    removePhotoBtn?.addEventListener('click', () => {
        state.uploadedImage = null;
        uploadedPreview.style.display = 'none';
        uploadArea.style.display = 'flex';
    });

    // Goal buttons
    document.querySelectorAll('.goal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedGoal = btn.dataset.goal;
        });
    });

    // Intensity buttons
    document.querySelectorAll('.intensity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.intensity-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedIntensity = btn.dataset.intensity;
        });
    });

    // Timeline slider
    timelineSlider?.addEventListener('input', (e) => {
        state.timeline = e.target.value;
        timelineValue.textContent = e.target.value;
    });

    // Generate button
    generateBtn?.addEventListener('click', generateTransformation);
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        state.uploadedImage = e.target.result;
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('uploadedPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function generateTransformation() {
    if (!state.uploadedImage) {
        showToast('Please upload a photo first', 'error');
        return;
    }

    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const loadingState = document.getElementById('loadingState');
    const resultContent = document.getElementById('resultContent');

    resultPlaceholder.style.display = 'none';
    loadingState.style.display = 'flex';

    // Simulate AI processing
    setTimeout(() => {
        loadingState.style.display = 'none';
        resultContent.style.display = 'block';

        // Show diet plan based on goal
        const dietPlan = dietPlans[state.selectedGoal];
        resultContent.innerHTML = `
            <div class="transformation-result">
                <div class="result-images">
                    <div class="result-before">
                        <img src="${state.uploadedImage}" alt="Before">
                        <span>Now</span>
                    </div>
                    <div class="result-arrow">→</div>
                    <div class="result-after">
                        <img src="${state.uploadedImage}" alt="After" style="filter: contrast(1.1) saturate(1.2);">
                        <span>${state.timeline} months</span>
                    </div>
                </div>
                
                <div class="diet-plan-preview">
                    <h4>🍽️ ${dietPlan.name}</h4>
                    <p><strong>Daily Calories:</strong> ${dietPlan.calories}</p>
                    <p><strong>Macros:</strong> ${dietPlan.macros}</p>
                    
                    <div class="meal-schedule">
                        ${dietPlan.meals.map(m => `
                            <div class="meal-item">
                                <strong>${m.time}:</strong> ${m.food}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="diet-tips">
                        <h5>💡 Pro Tips:</h5>
                        <ul>
                            ${dietPlan.tips.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Add result styles
        addResultStyles();
        showToast('Transformation generated! Check your diet plan below.', 'success');
    }, 2500);
}

function addResultStyles() {
    if (document.getElementById('resultStyles')) return;

    const styles = document.createElement('style');
    styles.id = 'resultStyles';
    styles.textContent = `
        .transformation-result { text-align: center; }
        .result-images { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem; }
        .result-before, .result-after { position: relative; }
        .result-before img, .result-after img { width: 150px; height: 150px; object-fit: cover; border-radius: var(--radius-md); }
        .result-before span, .result-after span { position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.85rem; color: var(--text-secondary); }
        .result-arrow { font-size: 2rem; color: var(--accent-purple); }
        .diet-plan-preview { text-align: left; padding: 1.5rem; background: var(--bg-tertiary); border-radius: var(--radius-md); }
        .diet-plan-preview h4 { margin-bottom: 1rem; font-size: 1.2rem; }
        .diet-plan-preview p { margin: 0.5rem 0; color: var(--text-secondary); }
        .meal-schedule { margin: 1rem 0; padding: 1rem; background: var(--glass-bg); border-radius: var(--radius-sm); }
        .meal-item { padding: 0.5rem 0; border-bottom: 1px solid var(--glass-border); font-size: 0.9rem; }
        .meal-item:last-child { border-bottom: none; }
        .diet-tips { margin-top: 1rem; }
        .diet-tips h5 { margin-bottom: 0.5rem; }
        .diet-tips ul { margin: 0; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; }
        .diet-tips li { margin: 0.25rem 0; }
    `;
    document.head.appendChild(styles);
}

// Render Workouts
function renderWorkouts(filter = 'all') {
    const grid = document.getElementById('workoutGrid');
    if (!grid) return;

    const filteredWorkouts = filter === 'all'
        ? workouts
        : workouts.filter(w => w.type === filter);

    grid.innerHTML = filteredWorkouts.map(workout => `
        <div class="workout-card" data-id="${workout.id}">
            <div class="workout-image">
                <i data-lucide="dumbbell"></i>
                <span class="workout-badge">${workout.level}</span>
            </div>
            <div class="workout-info">
                <h3 class="workout-title">${workout.title}</h3>
                <div class="workout-meta">
                    <span><i data-lucide="clock"></i>${workout.duration} min</span>
                    <span><i data-lucide="flame"></i>${workout.calories} cal</span>
                </div>
                <div class="workout-tags">
                    ${workout.tags.map(tag => `<span class="workout-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    // Add click handlers
    grid.querySelectorAll('.workout-card').forEach(card => {
        card.addEventListener('click', () => {
            const workout = workouts.find(w => w.id === parseInt(card.dataset.id));
            showWorkoutModal(workout);
        });
    });

    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWorkouts(btn.dataset.filter);
        });
    });
}

// Render Equipment
function renderEquipment(category = 'all') {
    const grid = document.getElementById('equipmentGrid');
    if (!grid) return;

    const filteredEquipment = category === 'all'
        ? equipment
        : equipment.filter(e => e.category === category);

    grid.innerHTML = filteredEquipment.map(item => `
        <div class="equipment-card">
            <div class="equipment-icon">
                <i data-lucide="${item.icon}"></i>
            </div>
            <h3 class="equipment-name">${item.name}</h3>
            <p class="equipment-desc">${item.description}</p>
            <span class="equipment-price">${item.price}</span>
        </div>
    `).join('');

    lucide.createIcons();

    // Setup category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEquipment(btn.dataset.category);
        });
    });
}

// Nutrition Section
function setupNutrition() {
    renderNutritionPlan('weight-loss');

    document.querySelectorAll('.nutrition-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nutrition-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderNutritionPlan(tab.dataset.plan);
        });
    });
}

function renderNutritionPlan(planKey) {
    const content = document.getElementById('nutritionContent');
    if (!content) return;

    const plan = dietPlans[planKey];

    content.innerHTML = `
        <div class="diet-plan-card">
            <div class="diet-overview">
                <h3>${plan.name}</h3>
                <div class="diet-stats">
                    <div class="diet-stat">
                        <label>Daily Calories</label>
                        <span>${plan.calories}</span>
                    </div>
                    <div class="diet-stat">
                        <label>Macros</label>
                        <span>${plan.macros}</span>
                    </div>
                </div>
                <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
                    <strong style="color: var(--accent-green);">Pro Tips:</strong>
                    <ul style="margin: 0.5rem 0 0; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem;">
                        ${plan.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="meal-timeline">
                <h4>📅 Daily Meal Plan</h4>
                <div class="meal-list">
                    ${plan.meals.map(meal => `
                        <div class="meal-item-card">
                            <span class="meal-time">${meal.time}</span>
                            <span class="meal-food">${meal.food}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Calendar
function setupCalendar() {
    renderCalendar();

    document.getElementById('prevMonth')?.addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonthEl = document.getElementById('currentMonth');
    const calendarDays = document.getElementById('calendarDays');

    if (!currentMonthEl || !calendarDays) return;

    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();

    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Workout schedule (sample)
    const workoutDays = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29];
    const restDays = [7, 14, 21, 28];

    let html = '';

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
        const hasWorkout = workoutDays.includes(day);
        const isRest = restDays.includes(day);

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasWorkout) classes += ' has-workout';
        if (isRest) classes += ' rest';

        html += `<div class="${classes}">${day}</div>`;
    }

    calendarDays.innerHTML = html;
}

// Modal
function setupModal() {
    const modal = document.getElementById('workoutModal');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal?.querySelector('.modal-overlay');

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function showWorkoutModal(workout) {
    const modal = document.getElementById('workoutModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h2 style="margin-bottom: 1rem;">${workout.title}</h2>
        <div class="workout-meta" style="margin-bottom: 1.5rem;">
            <span><i data-lucide="clock"></i> ${workout.duration} min</span>
            <span><i data-lucide="flame"></i> ${workout.calories} cal</span>
            <span><i data-lucide="signal"></i> ${workout.level}</span>
        </div>
        
        <h3 style="margin-bottom: 0.75rem;">Exercises</h3>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.25rem; color: var(--text-secondary);">
            ${workout.exercises.map(e => `<li style="margin: 0.5rem 0;">${e}</li>`).join('')}
        </ul>
        
        <div style="padding: 1.5rem; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2);">
            <h3 style="margin-bottom: 1rem; color: var(--accent-green);">🥗 Nutrition Guide</h3>
            <p style="margin: 0.5rem 0;"><strong>Pre-workout:</strong> ${workout.diet.pre}</p>
            <p style="margin: 0.5rem 0;"><strong>Post-workout:</strong> ${workout.diet.post}</p>
            <p style="margin: 0.75rem 0 0; font-style: italic; color: var(--text-secondary);">💡 ${workout.diet.tip}</p>
        </div>
        
        <button class="btn-primary btn-full" style="margin-top: 1.5rem;" onclick="closeModal(); showToast('Workout added to your schedule!', 'success');">
            <i data-lucide="plus"></i> Add to Schedule
        </button>
    `;

    lucide.createIcons();
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('workoutModal')?.classList.remove('active');
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Start Workout Button
document.getElementById('startWorkoutBtn')?.addEventListener('click', () => {
    showToast('Workout started! Let\'s crush it! 💪', 'success');
});
