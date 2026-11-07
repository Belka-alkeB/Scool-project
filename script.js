//добавление контента на сайт 
const database = {
    "8": {
        "physics": {
            author: "И.М. Перышкин, А.И. Иванов",
            paragraphs: [
                {
                    id: 1,
                    title: "§ 1. Основные положения молекулярно-кинетической теории (МКТ) строения вещества",
                    text: `Молекулярно-кинетическая теория (МКТ) - учение о строении вещества, которое объясняет физические явления и свойства тел на основе представлений о том, что все тела состоят из мельчайших частиц. 
<b>Три главных положения МКТ и их доказательства:</b>
1: Все вещества состоят из частиц (молекул, атомов), между которыми есть промежутки. 
Доказательства: Тепловое расширение тел (при нагревании промежутки между частицами увеличиваются). Диффузия (проникновение частиц одного вещества в промежутки между частицами другого). Современные микроскопы позволяют увидеть отдельные атомы. 
2: Все частицы вещества находятся в непрерывном хаотическом (беспорядочном) движении.
Доказательства: Диффузия (самопроизвольное перемешивание веществ). Броуновское движение - хаотичное движение мелких частиц в жидкости или газе, происходящее из-за ударов о них молекул. 
3: Частицы вещества взаимодействуют друг с другом силами притяжения и отталкивания.
Доказательства: Упругие свойства тел (восстановление формы и размера после деформации). При сжатии тел (сближении молекул) преобладают силы отталкивания, при растяжении (увеличении расстояния) - силы притяжения. 
Размеры и массы атомов и молекул: 
Размеры: Атомы очень малы, их диаметр порядка 10^-10 м. Простые молекулы имеют размеры, сравнимые с атомами, а сложные (например, ДНК) - значительно больше. 
Массы: В начале XX века французский физик Жан Перрен смог вычислить массу самого легкого атома (водорода) - она равна 1,6*(10^-27) кг. Это позволило вычислить массы других атомов и молекул. 
Из-за микроскопических масс даже маленькая пылинка состоит из огромного количества молекул.`,
                    video: "https://youtu.be/Hvp18WLNWR0?si=EiYCCEWxRcXfcw0x",
                    image: "https://fs.znanio.ru/d5af0e/df/53/610424c215a02b08029afe5afd530b9bf0.jpg"
                },
                {
                    id: 2,
                    title: "§2. ",
                    text: "",
                    video: "https://www.youtube.com/results?search_query=внутренняя+энергия+8+класс",
                    image: ""
                }
            ]
        },
        "algebra": {
            author: "А.Г. Мерзляк, В.Б. Полонский",
            paragraphs: [
                {
                    id: 1,
                    title: "§1. Рациональные дроби",
                    text: "Рациональная дробь — это дробь, в которой числитель и знаменатель являются многочленами.",
                    video: "https://www.youtube.com/results?search_query=рациональные+дроби+8+класс"
                }
            ]
        }
    }
};

//работа с меню
function toggleMenu() {
    document.getElementById("selectOptions").classList.toggle("show");
}

function chooseSubject(value, text) {
    document.getElementById("selectedSubject").innerText = text;
    document.getElementById("subjectSelect").value = value;
    document.getElementById("selectOptions").classList.remove("show");
    document.getElementById("result").innerHTML = "";
}

function toggleClassMenu() {
    document.getElementById("classOptions").classList.toggle("show");
}

function chooseClass(value, text) {
    document.getElementById("selectedClass").innerText = text;
    document.getElementById("classSelect").value = value;
    document.getElementById("classOptions").classList.remove("show");
    document.getElementById("result").innerHTML = "";
}

window.onclick = function(event) {
    if (!event.target.closest('.custom-select')) {
        document.getElementById("selectOptions").classList.remove("show");
        document.getElementById("classOptions").classList.remove("show");
    }
}

//Живой поиск 
function liveSearch() {
    const subject = document.getElementById("subjectSelect").value;
    const classValue = document.getElementById("classSelect").value;
    const query = document.getElementById("searchInput").value.toLowerCase(); 
    if (checkEasterEgg(query)) return;
    const resultBox = document.getElementById("result");

    if (query === "") {
        resultBox.innerHTML = "";
        return;
    }

    const paragraphs = database[classValue][subject].paragraphs;
    const matches = paragraphs.filter(p => p.title.toLowerCase().includes(query));

       if (matches.length === 0) {
        resultBox.innerHTML = "<p style='color: orange; text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;'>Ничего не найдено. Я работаю над этим, попробуйте другое слово.</p>";
        return;
    }

    // список совпадений в виде капсул
    let html = "<div style='display: flex; flex-direction: column; gap: 10px;'>";
    matches.forEach(p => {
        html += `
                <button class="search-item" onclick="showDetails('${subject}', ${p.id})" style="
                width: 100%; 
                text-align: left; 
                background-color: rgba(255, 255, 255, 0.9); 
                border: 2px solid #333333; 
                border-radius: 25px; 
                padding: 12px 20px; 
                font-size: 16px; 
                cursor: pointer; 
                transition: 0.3s;
                color: #333;
            " onmouseover="this.style.backgroundColor='#fff'" onmouseout="this.style.backgroundColor='rgba(255, 255, 255, 0.9)'">
                ${p.title}
            </button>
        `;
    });
    html += "</div>";
    resultBox.innerHTML = html;
}

// вывод дополнительной информации в конце параграфа 
function showDetails(subject, id) {
    const resultBox = document.getElementById("result");
    const classValue = document.getElementById("classSelect").value;
    const paragraph = database[classValue][subject].paragraphs.find(p => p.id === id);

    // --- НАЧАЛО АНИМАЦИИ ---
    // Удаляем старый класс, чтобы анимация сработала заново
    resultBox.classList.remove("animate-result"); 
    
    // Небольшая хитрость: заставляем браузер "перерисовать" элемент
    void resultBox.offsetWidth; 
    
    // Добавляем класс анимации
    resultBox.classList.add("animate-result"); 
    // --- КОНЕЦ АНИМАЦИИ ---

    resultBox.innerHTML = `
        <div style="border-left: 4px solid #007bff; padding-left: 15px; background: #fff; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #333;">${paragraph.title}</h3>
            
            <p style="color: #666; font-size: 14px; margin-top: -10px; margin-bottom: 15px;">
                Учебник: ${database[classValue][subject].author}
            </p>

            ${paragraph.image ? `<img src="${paragraph.image}" style="max-width: 100%; border-radius: 10px; margin-bottom: 15px;">` : ''}
            
            <p><b>Конспект:</b> ${paragraph.text}</p>
            <p><b>Дополнительные материалы:</b> <a href="${paragraph.video}" target="_blank" style="color: #e62117; font-weight: bold; text-decoration: none;">Смотреть видео по этой теме ➔</a></p>
            
            <button onclick="markAsDone('${subject}', ${paragraph.id})" style="margin-top: 15px; background-color: #28a745; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
                ✅ Я прошел этот параграф
            </button>
            <button onclick="liveSearch()" style="margin-top: 15px; margin-left: 10px; background-color: #6c757d; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
                Назад к поиску
            </button>
        </div>
    `;
}
//прогресс 
// Функция прогресса
function markAsDone(subject, id) {
    const classValue = document.getElementById("classSelect").value;
    let key = "done_" + classValue + "_" + subject + "_" + id;
    localStorage.setItem(key, "true");
    
    // Обновляем статистику (цифры анимируются)
    updateMiniStats();

    // Показываем красивое всплывающее окно
    showToast("Отличная работа! Прогресс сохранен. ✅");
}

// Функция для показа всплывающего окна
function showToast(message, color = "#28a745") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.backgroundColor = color; // Устанавливаем цвет
    toast.innerHTML = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => { toast.remove(); }, 300);
    }, 3000);
}
function showProgress() {
    const subject = document.getElementById("subjectSelect").value;
    const classValue = document.getElementById("classSelect").value;
    const resultBox = document.getElementById("result");

    const paragraphs = database[classValue][subject].paragraphs;
    const total = paragraphs.length;

    if (total === 0) {
        resultBox.innerHTML = "<p style='color:orange; text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;'>В этом учебнике пока нет параграфов.</p>";
        return;
    }

    let doneCount = 0;

    paragraphs.forEach(p => {
        let key = "done_" + classValue + "_" + subject + "_" + p.id;
        if (localStorage.getItem(key) === "true") {
            doneCount++;
        }
    });

    let percent = Math.round((doneCount / total) * 100);

    resultBox.innerHTML = `
        <div style="background: #fff; padding: 20px; border-radius: 10px; text-align: center; border-top: 5px solid #28a745;">
            <h3 style="color: #333; margin-top: 0;">Твой прогресс</h3>
            <p style="font-size: 18px;">Предмет: <b>${subject === 'physics' ? 'Физика ⚡' : 'Алгебра 📐'}</b> (${classValue} класс)</p>
            
            <div style="background: #e9ecef; border-radius: 10px; height: 20px; width: 100%; margin: 15px 0;">
                <div style="background: #28a745; height: 100%; width: ${percent}%; border-radius: 10px; transition: width 0.5s;"></div>
            </div>
            
            <p style="font-size: 20px; font-weight: bold; color: #28a745;">
                Пройдено: ${doneCount} из ${total} (${percent}%)
            </p>
            
            <button onclick="document.getElementById('result').innerHTML = ''" style="margin-top: 15px; background-color: #6c757d; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
                Закрыть
            </button>
        </div>
    `;
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    let btn = document.getElementById("themeBtn");
    
    if (document.body.classList.contains("dark-theme")) {
        btn.innerText = "☀️";
    } else {
        btn.innerText = "🌙";
    }
}
// Функция случайного параграфа
function randomParagraph() {
    const subject = document.getElementById("subjectSelect").value;
    const classValue = document.getElementById("classSelect").value;
    const paragraphs = database[classValue][subject].paragraphs;

    if (paragraphs.length === 0) {
        alert("В этом предмете пока нет параграфов!");
        return;
    }

    // Выбираем случайный индекс от 0 до длины массива - 1
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const randomP = paragraphs[randomIndex];

    // Открываем его
    showDetails(subject, randomP.id);
}

// Функция обновления мини-статистики слева
// Функция для обновления мини-статистики с эффектом счетчика
function updateMiniStats() {
    const subject = document.getElementById("subjectSelect").value;
    const classValue = document.getElementById("classSelect").value;
    const statsBox = document.getElementById("miniStats");
    
    if (!statsBox) return; 

    const paragraphs = database[classValue][subject].paragraphs;
    const total = paragraphs.length;
    
    let doneCount = 0;
    paragraphs.forEach(p => {
        let key = "done_" + classValue + "_" + subject + "_" + p.id;
        if (localStorage.getItem(key) === "true") {
            doneCount++;
        }
    });

    // Если параграфов 0, просто выводим текст без анимации
    if (total === 0) {
        statsBox.innerHTML = `<b>Твой прогресс:</b><br>Пройдено <b style="color: #28a745;">0</b> из <b>0</b> тем.`;
        return;
    }

    // Создаем базовую структуру, где цифры пока равны 0
    statsBox.innerHTML = `
        <b>Твой прогресс:</b><br>
        Пройдено <b style="color: #28a745;" id="animate-done">0</b> из <b id="animate-total">0</b> тем.
    `;

    const doneElement = document.getElementById("animate-done");
    const totalElement = document.getElementById("animate-total");

    let currentDone = 0;
    let currentTotal = 0;

    // Функция, которая будет прибавлять по единичке
    const animate = () => {
        let isFinished = true;

        if (currentDone < doneCount) {
            currentDone++;
            doneElement.innerText = currentDone;
            isFinished = false;
        }

        if (currentTotal < total) {
            currentTotal++;
            totalElement.innerText = currentTotal;
            isFinished = false;
        }

        if (!isFinished) {
            requestAnimationFrame(animate); 
        }
    };

    // Запускаем анимацию
    animate();
}
// Обновляем статистику при загрузке страницы и при смене предмета/класса
window.addEventListener('load', updateMiniStats);

// Чтобы статистика обновлялась при смене меню, добавим вызов в функции выбора
const originalChooseSubject = chooseSubject;
chooseSubject = function(value, text) {
    originalChooseSubject(value, text);
    updateMiniStats();
};

const originalChooseClass = chooseClass;
chooseClass = function(value, text) {
    originalChooseClass(value, text);
    updateMiniStats();
};
// Функция для создания искорок
function createParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;
    
    // Количество искорок на экране
    const particleCount = 20; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.innerText = "✨"; // Наша искорка

        // Задаем случайную позицию по горизонтали
        particle.style.left = Math.random() * 100 + "vw";
        
        // Задаем случайный размер (от 10 до 25 пикселей)
        particle.style.fontSize = (Math.random() * 15 + 10) + "px";
        
        // Задаем случайную скорость полета (от 10 до 25 секунд)
        particle.style.animationDuration = (Math.random() * 15 + 10) + "s";
        
        // Задержка старта, чтобы они не вылетали все разом
        particle.style.animationDelay = Math.random() * 5 + "s";

        container.appendChild(particle);
    }
}

// Запускаем создание искорок при загрузке сайта
window.addEventListener('load', createParticles);
// --- СЧЕТЧИК ДО ЛЕТА ---
function updateSummerCounter() {
    const daysElement = document.getElementById("daysToSummer");
    if (!daysElement) return;

    const today = new Date();
    let year = today.getFullYear();
    
    // Предположим, что лето начинается 1 июня
    let summerStart = new Date(year, 5, 1); // Месяцы в JS считаются с 0, поэтому 5 = июнь

    // Если лето уже прошло в этом году, считаем до следующего
    if (today > summerStart) {
        summerStart = new Date(year + 1, 5, 1);
    }

    // Разница в миллисекундах
    const diff = summerStart - today;
    
    // Переводим миллисекунды в дни
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    daysElement.innerText = days;
}

// --- ФАКТ ДНЯ ---
const facts = [
    "Молния нагревает воздух вокруг себя до 30 000 °C — это в 5 раз горячее поверхности Солнца.",
    "Вода может кипеть при комнатной температуре, если поместить её в вакуум.",
    "Если сложить лист бумаги пополам 42 раза, его толщина достигнет Луны.",
    "Стекло на самом деле является очень медленно текущей жидкостью.",
    "В одной капле воды содержится больше молекул, чем звезд в наблюдаемой Вселенной.",
    "Ученые доказали, что фоновая музыка (lo-fi) помогает лучше концентрироваться при учебе."
];

function showRandomFact() {
    const factElement = document.getElementById("factOfTheDay");
    if (!factElement) return;

    // Выбираем случайный факт
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.innerText = facts[randomIndex];
}

// Запускаем всё при загрузке сайта
window.addEventListener('load', () => {
    updateSummerCounter();
    showRandomFact();
});
// --- КНОПКА ПАНИКИ ---
function panicButton() {
    const advices = [
        "Срочно выпей чаю с печеньками. Мозгу нужна глюкоза!",
        "Попробуй попросить конспект у одноклассника. Вдруг повезет?",
        "Просто поверь в себя (и в шпаргалку в кармане).",
        "Ляг поспи. Утром всё решится само собой.",
        "Включи режим 'Супер-студент' и учи до утра. Главное — не уснуть на учебнике.",
        "Позвони Дмитрию. Он точно знает, что делать."
    ];
    
    // Выбираем случайный совет
    const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
    
    // Показываем всплывающее окно (оранжевое для паники)
    showToast(`⏳ Совет: ${randomAdvice}`, "#ff9800");
}

// --- ПАСХАЛКА (Дмитрий) ---
// Мы добавим проверку в функцию liveSearch, но чтобы не переписывать её всю, 
// просто вызовем функцию проверки в начале поиска.
function checkEasterEgg(query) {
    if (query === "дмитрий") {
        const resultBox = document.getElementById("result");
        resultBox.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <img src="https://avatars.mds.yandex.net/i?id=c23b9c13361695369f5473db5f4aadf7_l-4136742-images-thumbs&n=13" style="max-width: 300px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                <h2 style="color: #333; margin-top: 20px;">Дмитрий ровный!</h2>
                <p style="color: #666;">Это секретная пасхалка. Но не забывай учиться! 😉</p>
                <button onclick="document.getElementById('searchInput').value=''; document.getElementById('result').innerHTML='';" style="margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 25px; cursor: pointer;">Вернуться к учебе</button>
            </div>
        `;
        return true; // Говорим сайту: "Пасхалка сработала, дальше не ищи"
    }
    return false;
}