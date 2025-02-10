import platform
import signal

import keyboard
from gpiozero import Button

button_pin_1 = 4
button_pin_2 = 23
button_pin_3 = 26
button_pin_4 = 16


def press(key):
    keys = {
        "a": 0,
        "b": 11,
        "c": 8,
        "d": 2,
        "r": 15,
    }

    print(f"Pressing {key}")
    if platform.system() == "Darwin":
        keyboard.press_and_release(keys[key])
    else:
        keyboard.press_and_release(key)


def main():
    print("Raspberry PI Button Input Magic.")
    print("On GPIO Button press, use pyautogui to press a key on the keyboard.")

    button_1 = Button(button_pin_1, bounce_time=0.05)
    button_2 = Button(button_pin_2, bounce_time=0.05)
    button_3 = Button(button_pin_3, bounce_time=0.05)
    button_4 = Button(button_pin_4, bounce_time=0.05)

    button_1.when_activated = lambda: press("a")
    button_2.when_activated = lambda: press("b")
    button_3.when_activated = lambda: press("c")
    button_4.when_activated = lambda: press("d")

    print("To exit press Ctrl+C")
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    signal.pause()


if __name__ == "__main__":
    press("r")
    main()
