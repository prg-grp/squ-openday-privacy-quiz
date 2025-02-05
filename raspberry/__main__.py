import platform
import signal

import keyboard
from gpiozero import Button

button_pin_1 = 7
button_pin_2 = 11
button_pin_3 = 13
button_pin_4 = 15


def press(key):
    keys = {
        "a": 0,
        "b": 11,
        "c": 8,
        "d": 2,
        "r": 15,
    }

    if platform.system() == "Darwin":
        keyboard.press_and_release(keys[key])
    else:
        keyboard.press_and_release(key)


def main():
    print("Raspberry PI Button Input Magic.")
    print("On GPIO Button press, use pyautogui to press a key on the keyboard.")

    button_1 = Button(button_pin_1)
    button_2 = Button(button_pin_2)
    button_3 = Button(button_pin_3)
    button_4 = Button(button_pin_4)

    button_1.when_activated = lambda: keyboard.press_and_release("a")
    button_2.when_activated = lambda: keyboard.press_and_release("b")
    button_3.when_activated = lambda: keyboard.press_and_release("c")
    button_4.when_activated = lambda: keyboard.press_and_release("d")

    print("To exit press Ctrl+C")
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    signal.pause()


if __name__ == "__main__":
    main()
    # import time

    # time.sleep(5)
    # print("Pressing a")
    # press("a")
    # time.sleep(5)
    # print("Pressing b")
    # press("b")
    # time.sleep(5)
    # print("Pressing c")
    # press("c")
    # time.sleep(5)
    # print("Pressing d")
    # press("d")
    # time.sleep(5)
    # print("Pressing r")
    # press("r")
