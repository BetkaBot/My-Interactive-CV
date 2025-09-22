/* ------------------------------
   MODAL FUNCTIONALITY
------------------------------ */
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    if (modal) openModal(modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) closeModal(modal);
  });
});

function openModal(modal) {
  modal.classList.add('active');
}

function closeModal(modal) {
  modal.classList.remove('active');
}

/* ------------------------------
   DRAGGABLE MODALS
------------------------------ */
const draggableModals = document.querySelectorAll('.modal');

draggableModals.forEach(modal => {
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  modal.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    modal.style.cursor = 'move';
  });

  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    const style = window.getComputedStyle(modal);
    const left = parseInt(style.left) || 0;
    const top = parseInt(style.top) || 0;

    modal.style.left = `${left + deltaX}px`;
    modal.style.top = `${top + deltaY}px`;

    lastX = event.clientX;
    lastY = event.clientY;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    modal.style.cursor = 'grab';
  });
});

/* ------------------------------
   CMD WINDOW FUNCTIONALITY
------------------------------ */
const cmdTextLines = [
  "Name:            Alžběta Horová",
  "Date of Birth:   19.11.2001",
  "Place of Birth:  Litoměřice, Czech Republic",
  `Description:       Organized and motivated
                   Positive and friendly
                   Ambitious
                   Fast learner
                   Punctual and reliable`
];

let currentLine = 0;

document.addEventListener("keydown", (event) => {
  const cmdModal = document.getElementById("cmdModal");
  if (event.key === "Enter" && cmdModal?.classList.contains("active")) {
    const changingText = document.getElementById("changingtext");
    const container = document.getElementById("container");

    if (currentLine === 0) {
      changingText.textContent = "systeminfo/about _";
      changingText.classList.add("no-blink");
    } else if (currentLine <= cmdTextLines.length) {
      const line = document.createElement("pre");
      line.className = "CMDtext-line";
      line.textContent = cmdTextLines[currentLine - 1];
      container.appendChild(line);
    }

    currentLine++;
  }
});

/* ------------------------------
   TOGGLE WINDOW FUNCTIONALITY
------------------------------ */
const toggleButton = document.getElementById("tlacitko");
const toggleWindow = document.getElementById("toggle");

toggleButton?.addEventListener("click", () => {
  toggleWindow.style.display = toggleWindow.style.display === "block" ? "none" : "block";
});

/* ------------------------------
   START & TURN OFF FUNCTIONALITY
------------------------------ */
const startButton = document.getElementById("startButton");
const overlay = document.getElementById("overlay");
const mainContent = document.getElementById("mainContent");
const turnoffButton = document.getElementById("turnoffButton");
const loadingSound = document.getElementById("loadingSound");

startButton?.addEventListener("click", () => {
  startButton.style.display = "none";
  overlay.style.display = "flex";
  loadingSound?.play();

  setTimeout(() => {
    overlay.style.display = "none";
    mainContent.style.display = "block";
  }, 3000);

  document.body.style.backgroundImage = "url('background.jpg')";

  // Turn off
  turnoffButton?.addEventListener("click", () => {
    location.reload();
  });
});

/* ------------------------------
   CLOCK & DATE FUNCTIONALITY
------------------------------ */
function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = `${day}.${month}.${year}`;

  document.getElementById('clock').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);
