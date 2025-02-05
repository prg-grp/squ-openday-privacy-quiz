import signal

import pyautogui
from gpiozero import Button

button_pin_1 = 7
button_pin_2 = 11
button_pin_3 = 13
button_pin_4 = 15


def main():
    print("Raspberry PI Button Input Magic.")
    print("On GPIO Button press, use pyautogui to press a key on the keyboard.")

    button_1 = Button(button_pin_1)
    button_2 = Button(button_pin_2)
    button_3 = Button(button_pin_3)
    button_4 = Button(button_pin_4)

    button_1.when_activated = lambda: pyautogui.press("1")
    button_2.when_activated = lambda: pyautogui.press("2")
    button_3.when_activated = lambda: pyautogui.press("3")
    button_4.when_activated = lambda: pyautogui.press("4")

    print("To exit press Ctrl+C")
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    signal.pause()


if __name__ == "__main__":
    main()
