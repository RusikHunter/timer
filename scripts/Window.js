import Timer from './Timer.js'
import Stopwatch from './Stopwatch.js'

class Window {
    isFirstWindow = true

    constructor(timer, stopwatch) {
        this.timer = timer
        this.stopwatch = stopwatch

        this.timerElement = document.querySelector('.timer')
        this.stopwatchElement = document.querySelector('.stopwatch')

        this.toggleButtonElement = document.querySelector('.window__toggle-button')

        this.toggleButtonElement.addEventListener('click', () => {
            this.timerElement.classList.toggle('unvisible')
            this.stopwatchElement.classList.toggle('unvisible')

            if (this.isFirstWindow) {
                this.timer.stopTimer()
            } else {
                this.stopwatch.stopStopwatch()
            }

            this.isFirstWindow = !this.isFirstWindow
        })
    }
}

const timer = new Timer()
const stopwatch = new Stopwatch()

const window = new Window(timer, stopwatch)
