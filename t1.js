function generatePlan() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const goal = document.getElementById("goal").value;
  const result = document.getElementById("result");

  if (!weight || !height) {
    result.innerHTML = "❌ Please enter weight and height.";
    return;
  }

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  let plan = `<h3>Your Results</h3>`;
  plan += `<p><strong>BMI:</strong> ${bmi}</p>`;

  if (goal === "lose") {
    plan += `
      <h4>🎯 Goal: Lose Weight</h4>
      <ul>
        <li>Gym: Cardio + full body workouts</li>
        <li>Food: Balanced meals, more vegetables</li>
        <li>Supplements: Optional (protein, vitamins)</li>
      </ul>
    `;
  } 
  else if (goal === "gain") {
    plan += `
      <h4>🎯 Goal: Gain Muscle</h4>
      <ul>
        <li>Gym: Strength training 3–5 days/week</li>
        <li>Food: Protein-rich meals</li>
        <li>Supplements: Protein, creatine (educational)</li>
      </ul>
    `;
  } 
  else {
    plan += `
      <h4>🎯 Goal: Stay Fit</h4>
      <ul>
        <li>Gym: Mixed cardio & strength</li>
        <li>Food: Healthy balanced diet</li>
        <li>Supplements: Not necessary</li>
      </ul>
    `;
  }

  result.innerHTML = plan;
}
