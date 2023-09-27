// Функция для загрузки списка пользователей из файла
//в случае ошибки ,например, если файл не найден, в консоль выводится сообщение и возвращается пустой массив, страница будет загружена, но без списка
async function loadUsers() {
    try {
        const response = await fetch('users.json');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        return [];
    }
}

// Функция для отображения списка пользователей внутри элемента с id userList
function displayUsers(userArray) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Очищаем список перед добавлением пользователей

    userArray.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} ${user.surname} (${user.age} лет)`;
        userList.appendChild(listItem);
    });
}
//Функция фильтрации по возврасту. Добавлены проверки на ввод отрицательных чисел и что минимальный возраст не больше максимального
function filterUsers() {
    const minAgeInput = document.getElementById('minAge');
    const maxAgeInput = document.getElementById('maxAge');

    // Преобразуем введенные значения в числа
    const minAge = parseInt(minAgeInput.value) || 0;
    const maxAge = parseInt(maxAgeInput.value) || Infinity;

    // Проверяем, что значения не отрицательные
    if (minAge < 0 || maxAge < 0) {
        alert('Возраст не может быть отрицательным числом.');
        minAgeInput.value = ''; // Очищаем поле ввода минимального возраста
        maxAgeInput.value = ''; // Очищаем поле ввода максимального возраста
        return;
    }

    // Проверяем, что минимальный возраст не больше максимального
    if (minAge > maxAge) {
        alert('Минимальный возраст не может быть больше максимального.');
        minAgeInput.value = ''; // Очищаем поле ввода минимального возраста
        maxAgeInput.value = ''; // Очищаем поле ввода максимального возраста
        return;
    }

    // Загружаем список пользователей и фильтруем по возрасту и повторно отлавливаем ошибки,если имеются
    loadUsers()
        .then((users) => {
            const filteredUsers = users.filter((user) => user.age >= minAge && user.age <= maxAge);
            displayUsers(filteredUsers);
        })
        .catch((error) => {
            console.error('Ошибка при загрузке пользователей:', error);
        });
}
// Функция для очистки фильтров
function clearFilters() {
    const minAgeInput = document.getElementById('minAge');
    const maxAgeInput = document.getElementById('maxAge');

    // Очищаем поля ввода минимального и максимального возраста
    minAgeInput.value = '';
    maxAgeInput.value = '';

    // Вызываем функцию фильтрации для отображения всех пользователей
    filterUsers();
}

// Инициализация - отобразить всех пользователей при загрузке страницы
filterUsers();