from selenium import webdriver
import time
from selenium.webdriver.common.by import By
print("Test alustab:")
driver=webdriver.Chrome()  
driver.maximize_window()

driver.get("http://localhost:3000")
time.sleep(2)

driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/input").send_keys('Melbourne')
time.sleep(2)
driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/button").click()
time.sleep(2)

driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div[5]").click()
print("Näitab Melbourne CP")
time.sleep(2)

driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/button").click()
time.sleep(2)
driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/div[4]").click()
print("Näitab Melbourne")
time.sleep(2)

time.sleep(5)
driver.close()

print("Test oli edukas!")