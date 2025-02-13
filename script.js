document.addEventListener("DOMContentLoaded", function () {
    // ----- Set Calorie Goal Page -----
    const calorieForm = document.getElementById("calorieForm");
    if (calorieForm) {
      calorieForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const limit = document.getElementById("calorieLimit").value;
        localStorage.setItem("calorieLimit", limit);
        // Redirect to Food Items page after setting the goal
        window.location.href = "food_items.html";
      });
    }
  
    // ----- Food Items Page -----
    const foodForm = document.getElementById("foodForm");
    if (foodForm) {
      foodForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let selectedFoods = [];
        const checkboxes = document.querySelectorAll("input[name='food']:checked");
        checkboxes.forEach((cb) => {
          selectedFoods.push({
            name: cb.value,
            calories: parseInt(cb.getAttribute("data-cal"))
          });
        });
        localStorage.setItem("foodItems", JSON.stringify(selectedFoods));
        window.location.href = "food_items_analysis.html";
      });
    }
  
    // ----- Food Items Analysis Page -----
    const foodTable = document.getElementById("foodTable");
    if (foodTable) {
      const foodItems = JSON.parse(localStorage.getItem("foodItems") || "[]");
      let tbody = foodTable.querySelector("tbody");
      let totalFoodCalories = 0;
      foodItems.forEach((item) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.textContent = item.name;
        const tdCal = document.createElement("td");
        tdCal.textContent = item.calories;
        tr.appendChild(tdName);
        tr.appendChild(tdCal);
        tbody.appendChild(tr);
        totalFoodCalories += item.calories;
      });
      document.getElementById("totalFoodCalories").textContent = totalFoodCalories;
      localStorage.setItem("totalFoodCalories", totalFoodCalories);
    }
  
    // ----- Add Exercise Page -----
    const exerciseForm = document.getElementById("exerciseForm");
    if (exerciseForm) {
      // Enable/disable duration input based on checkbox selection
      const exerciseCheckboxes = exerciseForm.querySelectorAll("input[name='exercise']");
      exerciseCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const durationInput = this.parentElement.querySelector(".duration");
          durationInput.disabled = !this.checked;
          if (!this.checked) {
            durationInput.value = "";
          }
        });
      });
  
      exerciseForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let selectedExercises = [];
        const exerciseItems = exerciseForm.querySelectorAll("li");
        exerciseItems.forEach((li) => {
          const checkbox = li.querySelector("input[name='exercise']");
          const durationInput = li.querySelector(".duration");
          if (checkbox.checked && durationInput.value) {
            const duration = parseInt(durationInput.value);
            const rate = parseInt(checkbox.getAttribute("data-rate"));
            const caloriesBurned = duration * rate;
            selectedExercises.push({
              name: checkbox.value,
              duration: duration,
              calories: caloriesBurned
            });
          }
        });
        localStorage.setItem("exercises", JSON.stringify(selectedExercises));
        window.location.href = "exercise_analysis.html";
      });
    }
  
    // ----- Exercise Analysis Page -----
    const exerciseTable = document.getElementById("exerciseTable");
    if (exerciseTable) {
      const exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
      let tbody = exerciseTable.querySelector("tbody");
      let totalExerciseCalories = 0;
      exercises.forEach((ex) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.textContent = ex.name;
        const tdDuration = document.createElement("td");
        tdDuration.textContent = ex.duration;
        const tdCal = document.createElement("td");
        tdCal.textContent = ex.calories;
        tr.appendChild(tdName);
        tr.appendChild(tdDuration);
        tr.appendChild(tdCal);
        tbody.appendChild(tr);
        totalExerciseCalories += ex.calories;
      });
      document.getElementById("totalExerciseCalories").textContent = totalExerciseCalories;
      localStorage.setItem("totalExerciseCalories", totalExerciseCalories);
    }
  
    // ----- Final Report Page -----
    const reportCalorieLimit = document.getElementById("reportCalorieLimit");
    if (reportCalorieLimit) {
      const calorieLimit = parseInt(localStorage.getItem("calorieLimit") || "0");
      const totalFoodCalories = parseInt(localStorage.getItem("totalFoodCalories") || "0");
      const totalExerciseCalories = parseInt(localStorage.getItem("totalExerciseCalories") || "0");
      const netCalories = totalFoodCalories - totalExerciseCalories;
      const caloriesLeft = calorieLimit - netCalories;
      document.getElementById("reportCalorieLimit").textContent = calorieLimit;
      document.getElementById("reportFoodCalories").textContent = totalFoodCalories;
      document.getElementById("reportExerciseCalories").textContent = totalExerciseCalories;
      document.getElementById("netCalories").textContent = netCalories;
      document.getElementById("caloriesLeft").textContent = caloriesLeft;
    }
  });
  