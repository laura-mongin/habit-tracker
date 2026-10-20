// Call the elements in HTML
const newHabitButton = document.querySelector("#add-habit");
const newHabitDiv = document.querySelector("#new-habit");
const newHabitTextInput = document.querySelector(".text-input");
const addHabitButton = document.querySelector("#add-habit-button");
const habitsContainer = document.querySelector("#habits-list");
const habitCheckbox = document.querySelector("input[type='checkbox']");
const habitBox = document.querySelector(".habit");
const progressBar = document.querySelector(".progress");
const progressText = document.querySelector("#completion p");
const minusIcon = document.querySelector("#minus-add-habit");
const plusIcon = document.querySelector("#plus-add-habit");
const modifyHabitNameBtn = document.querySelector("#modify-habit-name-btn");
const modifyModalInput = document.querySelector("#modify-modal input");
const wholeModal = document.querySelector("#modify-modal");
const closeModalBtn = document.querySelector("#modify-modal button[command='close']");
const deleteHabitBtn = document.querySelector("#delete-habit-btn");

// Functions
function updateProgressBar() {
    progressBar.max = habitsContainer.children.length;
    progressBar.value = document.querySelectorAll(".habit.is-done").length;
    progressText.textContent = `${Math.floor(progressBar.value / progressBar.max * 100)}% completed ★`;
}

function checkValidHabitName(habitName) {}

function checkHabitExists(habitName) {}

// New habit appears when clicking on the button
newHabitButton.addEventListener("click", () => {
    newHabitDiv.classList.toggle("is-active");
    
   if (newHabitDiv.classList.contains("is-active")) {
    minusIcon.classList.add("is-active");
    plusIcon.classList.remove("is-active");
    } else {
    minusIcon.classList.remove("is-active");
    plusIcon.classList.add("is-active");
    }
});


newHabitTextInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addHabitButton.click();
    }
});

addHabitButton.addEventListener("click", () => {
    // Check if the habit name already exists & if the habit name is valid
    const habitText = newHabitTextInput.value.trim();
    const newName = habitText.toLowerCase();

    if (habitText === "") {
        alert("The habit name is not valid. Please enter a habit name.");
        return;
    }

    const existingNames = document.querySelectorAll(".habit p");
    for (const name of existingNames) {
        if (name.textContent.trim().toLowerCase() === newName) {
            alert("The habit already exists. Please enter a new habit name.");
            return;
        }
    }

    // Add new habit to the list when clicking on the button
    const habit = document.createElement("div");
    habit.classList.add("habit");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const habitName = document.createElement("p");
    habitName.textContent = newHabitTextInput.value;

    const editLink = document.createElement("button");
    editLink.setAttribute("command", "show-modal")
    editLink.setAttribute("commandfor", "modify-modal")
    editLink.setAttribute("id", "edit-habit-name-btn");
    const icon = document.createElement("i");
    icon.classList.add("fi", "fi-rr-pencil");
    icon.setAttribute("id", "modify-icon");
    editLink.append(icon);

    habit.append(checkbox, habitName, editLink);
    habitsContainer.append(habit);
    
    // Check a habit state
    checkbox.addEventListener("change", () => {
    habit.classList.toggle("is-done");
    });

    // Clear search bar after adding a habit
    newHabitTextInput.value = "";

    // Progress bar update
    checkbox.addEventListener("change", () => {
    updateProgressBar();
    });


    updateProgressBar();

    editLink.addEventListener("click", () => {
        let modifyModal = habitName;
    });

    // Modify habit name when clicking on the button
    modifyHabitNameBtn.addEventListener("click", () => {
    // Check if the habit name already exists & if the habit name is valid
    const newHabitText = modifyModalInput.value.trim();
    const newName = newHabitText.toLowerCase();

    if (newHabitText === "") {
        alert("The habit name is not valid. Please enter a habit name.");
        return;
    }

    const existingNames = document.querySelectorAll(".habit p");
    for (const name of existingNames) {
        if (name.textContent.trim().toLowerCase() === newName) {
            alert("The habit already exists. Please enter a new habit name.");
            return;
        }
    }

    habitName.textContent = modifyModalInput.value;
    modifyModalInput.value = "";
    wholeModal.close();

    }); 
    
    // Close the modal when clicking on the close button
    closeModalBtn.addEventListener("click", () => {
        modifyModalInput.value = "";
    });

    // Delete a habit when clicking on the button
    deleteHabitBtn.addEventListener("click", () => {
        habit.remove();
        updateProgressBar();
        wholeModal.close();
    });
    
});

