import os
import time
import pyautogui


print(pyautogui.position())

btn_pos = (527, 55)
lt = (349, 93)
rb = (1462, 993)
region = (lt[0], lt[1], rb[0] - lt[0], rb[1] - lt[1])

x0, y0 = 166, 195
lens = (73, 34, 66, 40, 63)
titles = ("body", "lung1", "lung2", "coronal", "saggital")
print({k: v for k, v in zip(titles, lens)})
exit(0)


def find_and_click(img: str):
    box = pyautogui.locateOnScreen(img)
    if box:
        pyautogui.click(box.left, box.top)


pyautogui.hotkey("alt", "tab")
for title_len, title in zip(lens, titles):
    if title not in os.listdir():
        os.mkdir(title)
    else:
        for f in os.listdir(title):
            os.remove(f"{title}/{f}")

    for i in range(title_len):
        pyautogui.press("down")
        pyautogui.screenshot(f"{title}/img{i+1}.jpg", region)

    pyautogui.press("down")
