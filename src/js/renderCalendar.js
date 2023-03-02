import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import calendarApiService from "./calendarApiService";

export default function createCalendar() { 
    const input = document.querySelector("#datetime-picker");

    const options = {
    enableTime: false,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];

            calendarApiService(selectedDate)
                .then(articles => {
                    // 1. Тут має викликатися функція рендеру картки з циклом
                    // 2. Якщо у функції немає циклу, то він тут
                    articles.map(article => { 
                    // Виклик функції для рендеру
                        console.log(article)
                    })

                })
                .catch(error => { 
                    console.log(error)
                    // Додати показ заглушки (We haven’t found news from this category), коли нічого не знайдено
                })
        },
    };

    return flatpickr(input, options);
}
