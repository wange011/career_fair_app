from contextlib import closing
from selenium import webdriver # pip install selenium
from selenium.webdriver.support.ui import WebDriverWait
import json
import os

working_directory = os.getcwd()
chrome_path = working_directory + "\chromedriver.exe"

driver = webdriver.Chrome(chrome_path)

driver.get('https://gatech-csm.symplicity.com/events/8b6a405f39d3aa411bc652959a3c75c2/employers')

WebDriverWait(driver, timeout=10).until(
         lambda x: x.find_element_by_class_name('company'))

title = driver.find_element_by_class_name('ng-binding').text

bottom = driver.find_element_by_class_name('lst-paging')
page = bottom.find_element_by_class_name('ng-binding').get_attribute('textContent')

companies = driver.find_elements_by_class_name('company')

data = {}
data['title'] = title
data['companies'] = []

for company in companies:
    
    fields = company.find_elements_by_class_name('ng-binding')
    name = fields[0].text
    day = fields[2].text
    degree_levels = fields[12].text
    positions_offered = fields[14].text
    sponsorships = fields[20].text
    overview = fields[10].text
    image = company.find_element_by_tag_name('img').get_attribute("src")    
    
    data['companies'].append({
        'name': name,
        'day': day,
        'degree_levels': degree_levels,
        'positions_offered': positions_offered,
        'sponsorships': sponsorships,
        'overview': overview,
        'image': image    
    })


next_btn = bottom.find_elements_by_tag_name('button')[1]
driver.execute_script("arguments[0].click()", next_btn)    

while(True):
    try:
        WebDriverWait(driver.find_element_by_class_name('lst-paging'), timeout=10).until(
            lambda x: x.find_element_by_class_name('ng-binding').get_attribute('textContent') != page)
    except:
        driver.close()
        break

    bottom = driver.find_element_by_class_name('lst-paging')
    new_page = bottom.find_element_by_class_name('ng-binding').get_attribute('textContent')
    page = new_page
        
    companies = driver.find_elements_by_class_name('company')
    
    for company in companies:
    
        fields = company.find_elements_by_class_name('ng-binding')
        name = fields[0].text
        day = fields[2].text
        degree_levels = fields[12].text
        positions_offered = fields[14].text
        sponsorships = fields[20].text
        overview = fields[10].text
        image = company.find_element_by_tag_name('img').get_attribute("src")    
        
        data['companies'].append({
            'name': name,
            'day': day,
            'degree_levels': degree_levels,
            'positions_offered': positions_offered,
            'sponsorships': sponsorships,
            'overview': overview,
            'image': image    
        })
    
    next_btn = bottom.find_elements_by_tag_name('button')[1]
    driver.execute_script("arguments[0].click()", next_btn) 

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4) 
