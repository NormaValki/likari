document.addEventListener("DOMContentLoaded", function () {
  // Обработчик для всех текстовых полей
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", function () {
      const data = {
        field: this.name || this.id, // Имя или ID поля
        value: this.value.trim(), // Удаляем лишние пробелы
      };

      fetch("save_data.php", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((data) => console.log("Saved:", data))
        .catch((error) => console.error("Error:", error));
    });
  });

  // Обработчик для радиокнопок
  const loggedGroups = {}; // Хранит последнее записанное значение для каждой группы радиокнопок

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const groupName = this.name || this.id; // Имя группы радиокнопок (например, "radio-981")
      const currentValue = this.value;

      // Логируем значение для каждой группы, только если оно изменилось
      if (
        !loggedGroups[groupName] ||
        loggedGroups[groupName] !== currentValue
      ) {
        loggedGroups[groupName] = currentValue; // Обновляем последнее значение для группы

        const data = {
          field: groupName, // Имя или ID радиокнопки
          value: currentValue, // Новое значение выбранной радиокнопки
        };

        // Сохраняем только новое значение, уникальное для группы
        fetch("save_data.php", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(data),
        })
          .then((response) => response.text())
          .then((data) => console.log("Saved radio button:", data))
          .catch((error) => console.error("Error saving radio button:", error));
      }
    });
  });
});
