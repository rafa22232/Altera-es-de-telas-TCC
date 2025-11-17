(function () {
  const calendarBody = document.getElementById("calendar-body");
  const monthSelect = document.getElementById("month");
  const yearInput = document.getElementById("year");

  if (!calendarBody || !monthSelect || !yearInput) {
    console.warn("Agenda institucional não encontrada nesta página.");
    return;
  }

  function generateCalendar(year, month) {
    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > daysInMonth) {
          cell.textContent = "";
        } else {
          cell.textContent = date;

          const today = new Date();
          if (
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          ) {
            cell.classList.add("today");
          }

          cell.addEventListener("click", () => {
            document.querySelectorAll("td").forEach((td) =>
              td.classList.remove("today")
            );
            cell.classList.add("today");
          });

          date++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  const today = new Date();
  generateCalendar(today.getFullYear(), today.getMonth());

  monthSelect.addEventListener("change", () => {
    generateCalendar(parseInt(yearInput.value), parseInt(monthSelect.value));
  });

  yearInput.addEventListener("input", () => {
    generateCalendar(parseInt(yearInput.value), parseInt(monthSelect.value));
  });
})();