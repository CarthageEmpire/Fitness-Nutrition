const app = {
    // STATE: Holds the current user data
    state: {
        weight: 0,
        height: 0,
        goal: 'health'
    },

    // DATA: Content Library (Easily editable)
    data: {
        nutrition: {
            lose: {
                macros: "Protein Focused: 40% Protein / 30% Veg / 30% Fat",
                meals: [
                    "Morning: Bsissa (water base) or 2 Boiled Eggs",
                    "Lunch: Grilled Daurade + Salade Méchouia (light oil)",
                    "Dinner: Vegetable Ojja (skip the bread)",
                    "Snack: Low-fat Yogurt or Almonds"
                ]
            },
            gain: {
                macros: "Calorie Surplus: 50% Carbs / 30% Protein / 20% Fat",
                meals: [
                    "Morning: Oats with dates, nuts, and milk",
                    "Lunch: Couscous with chicken (double chickpeas)",
                    "Dinner: Lablabi (with egg and tuna)",
                    "Snack: Banana + Peanut Butter Shake"
                ]
            },
            health: {
                macros: "Balanced: 40% Carbs / 30% Protein / 30% Fat",
                meals: [
                    "Morning: Whole wheat bread + Olive Oil + Egg",
                    "Lunch: Kamounia (lean meat) + Salad",
                    "Dinner: Grilled Turkey Escalope + Rice",
                    "Snack: Seasonal Fruit (Orange/Pomegranate)"
                ]
            }
        },
        workouts: {
            general: [
                { name: "Bodyweight Squats", sets: 3, note: "Keep back straight" },
                { name: "Push-ups (Knees if needed)", sets: 3, note: "Chest to floor" },
                { name: "Lunges", sets: 3, note: "10 per leg" },
                { name: "Plank Hold", sets: 3, note: "Hold as long as possible" },
                { name: "Water Bottle Rows", sets: 3, note: "Squeeze back muscles" }
            ]
        }
    },

    // FUNCTION: Initialize Event Listeners
    init: () => {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    },

    // FUNCTION: Handle View Transitions
    transitionTo: (sectionId) => {
        document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // FUNCTION: Core Calculation Engine
    generatePlan: () => {
        // 1. Get Inputs
        const w = parseFloat(document.getElementById('weight').value);
        const h = parseFloat(document.getElementById('height').value);
        const g = document.getElementById('goal').value;

        // Validation
        if (!w || !h) { alert("Please enter valid numbers"); return; }

        // Update State
        app.state = { weight: w, height: h, goal: g };

        // 2. Calculate BMI
        const heightM = h / 100;
        const bmi = (w / (heightM * heightM)).toFixed(1);
        
        // 3. Render Dashboard Components
        app.renderBMI(bmi);
        app.renderNutrition(g);
        app.renderWorkout(g);

        // 4. Show Dashboard
        app.transitionTo('dashboard-section');
    },

    // RENDER: BMI Visuals
    renderBMI: (bmi) => {
        const bmiNum = document.getElementById('bmi-number');
        const bmiText = document.getElementById('bmi-text');
        const marker = document.getElementById('bmi-marker');
        const alertBox = document.getElementById('health-alert');

        bmiNum.innerText = bmi;
        
        let percentage = 0; // Position of the marker on the bar (0-100%)
        let category = "";

        if (bmi < 18.5) {
            percentage = 15; category = "Underweight";
            alertBox.innerHTML = "⚠️ <strong>Note:</strong> Your weight is low. Focus on calorie-dense foods.";
            alertBox.classList.remove('hidden');
        } else if (bmi < 24.9) {
            percentage = 50; category = "Healthy Weight";
            alertBox.classList.add('hidden');
        } else if (bmi < 29.9) {
            percentage = 75; category = "Overweight";
            alertBox.classList.add('hidden');
        } else {
            percentage = 95; category = "Obese";
            alertBox.innerHTML = "⚠️ <strong>Medical Note:</strong> Please consult a doctor before high-intensity training.";
            alertBox.classList.remove('hidden');
        }

        bmiText.innerText = category;
        marker.style.left = `${percentage}%`;
    },

    // RENDER: Nutrition
    renderNutrition: (goal) => {
        const data = app.data.nutrition[goal];
        document.getElementById('macro-text').innerText = data.macros;
        
        const list = document.getElementById('meal-list');
        list.innerHTML = ''; // Clear previous
        data.meals.forEach(meal => {
            let li = document.createElement('li');
            li.innerText = meal;
            list.appendChild(li);
        });
    },

    // RENDER: Workout
    renderWorkout: (goal) => {
        const tbody = document.getElementById('workout-rows');
        tbody.innerHTML = ''; // Clear previous

        // Logic: Adjust Reps based on Goal
        let reps = (goal === 'lose') ? "15-20" : (goal === 'gain' ? "8-12" : "12-15");
        let rest = (goal === 'lose') ? "30s" : "60s";

        app.data.workouts.general.forEach(ex => {
            let row = `<tr>
                <td><strong>${ex.name}</strong><br><small style="color:#666">${ex.note}</small></td>
                <td>${ex.sets}</td>
                <td>${reps}</td>
                <td>${rest}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        document.getElementById('workout-summary').innerText = `Goal: ${goal.toUpperCase()} • Frequency: 3 Days/Week`;
    }
};

// Start App
app.init();