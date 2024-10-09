class Timer {
    // const
    SECOND = 1000
    MESSAGE = "Allahu Akbar!"
    MESSAGE_IF_OUTPUT_EMPTY = "Set time!"

    // для рассчетов внутри скрипта
    time = null
    countingEverySecondInterval = null
    isPaused = false

    // для кастомизации
    minutes = null
    seconds = null

    constructor() {
        // input
        this.minutesInputElement = document.querySelector('.timer__minutes') // ввод минут
        this.secondsInputElement = document.querySelector('.timer__seconds') // ввод секунд
        this.startButtonElement = document.querySelector('.timer__button--start') // кнопка запуска таймера
        this.stopButtonElement = document.querySelector('.timer__button--stop') // кнопка остановки таймера
        this.pauseButtonElement = document.querySelector('.timer__button--pause') // кнопка паузы таймера

        // обработчик событий на кнопку
        this.startButtonElement.addEventListener('click', () => {
            this.run()
        })

        this.stopButtonElement.addEventListener('click', () => {
            this.stopTimer()
        })

        this.pauseButtonElement.addEventListener('click', () => {
            this.pauseTimer()
        })

        // output
        this.outputTimeElement = document.querySelector('.timer__output--time') // элемент заголовка, который нужен для вывода времени
        this.outputMessageElement = document.querySelector('.timer__output--message') // элемент параграфа, который нужен для вывода сообщения после окончания
    }

    // функция, которая забирает минуты и секунды из инпутов
    getMinutesAndSeconds() {
        if (!this.isPaused) {
            const inputMinutes = parseInt(this.minutesInputElement.value) || 0
            const inputSeconds = parseInt(this.secondsInputElement.value) || 0

            if (inputMinutes === 0 && inputSeconds === 0) {
                this.showMessageIfOutputEmpty()
                return false // Не запускать таймер, если время не установлено
            }

            this.minutes = inputMinutes
            this.seconds = inputSeconds
        }

        return true // Продолжаем работу с таймером
    }

    // функция, которая устанавливает те же минуты и секунды в заголовок для пользователя
    showMinutesAndSeconds() {
        let customeMinutes = this.minutes
        let customeSeconds = this.seconds

        if (customeMinutes < 10) customeMinutes = `0${customeMinutes}`
        if (customeSeconds < 10) customeSeconds = `0${customeSeconds}`

        this.outputTimeElement.textContent = `${customeMinutes}:${customeSeconds}`
    }

    // функция, которая конвертирует минуты и секунды в миллисекунды для работы setTimeout
    convertTimeToMS() {
        this.time = this.minutes * (60 * this.SECOND) + this.seconds * this.SECOND
    }

    startTimer() {
        // Убедитесь, что только один таймер работает
        if (this.countingEverySecondInterval) clearInterval(this.countingEverySecondInterval)

        this.countingEverySecondInterval = setInterval(() => {
            if (this.seconds === 0 && this.minutes > 0) {
                this.seconds = 59
                --this.minutes
            } else if (this.seconds > 0) {
                --this.seconds
            }

            if (this.minutes === 0 && this.seconds === 0) {
                clearInterval(this.countingEverySecondInterval)
                this.showMinutesAndSeconds()
                this.showMessage()
                return;
            }

            this.showMinutesAndSeconds()
        }, this.SECOND);
    }

    pauseTimer() {
        if (this.isPaused) {
            // Возобновляем таймер
            this.startTimer()
        } else {
            // Ставим на паузу
            clearInterval(this.countingEverySecondInterval)
        }

        this.isPaused = !this.isPaused
    }

    stopTimer() {
        clearInterval(this.countingEverySecondInterval)
        this.minutes = 0
        this.seconds = 0
        this.showMinutesAndSeconds()
        this.isPaused = false
    }

    isEmpty() {
        return this.minutes === 0 && this.seconds === 0
    }

    showMessage() {
        this.outputMessageElement.textContent = this.MESSAGE_IF_OUTPUT_EMPTY
        this.outputMessageElement.style.visibility = "visible"
    }

    showMessageIfOutputEmpty() {
        this.minutes = 0
        this.seconds = 0
        this.showMinutesAndSeconds()
        this.outputMessageElement.textContent = this.MESSAGE_IF_OUTPUT_EMPTY
        this.outputMessageElement.style.visibility = "visible"
    }

    hideMessage() {
        this.outputMessageElement.style.visibility = "hidden"
    }

    run() {
        this.isPaused = false
        clearInterval(this.countingEverySecondInterval) // Очищаем предыдущий таймер

        this.hideMessage()

        // Если таймер не на паузе, считываем новые значения из инпутов
        if (!this.isPaused && !this.getMinutesAndSeconds()) {
            return
        }

        this.showMinutesAndSeconds()
        this.convertTimeToMS()

        // Запускаем таймер
        this.startTimer()
    }
}

export default Timer