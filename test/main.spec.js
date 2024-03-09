const expect = require('chai').expect;
const { Builder, By, Key, until, ThenableWebDriver, WebElement, Browser, close } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

const BASE_URL = "https://niisku.lab.fi/~kardev/projects/color-picker";
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

describe("UI Tests", () => {

    /** @type {import (selenium-webdriver).ThenableWebDriver};*/

    let driver=undefined;

    before(async function() {
        this.timeout(10000); // or higher if needed
        try {
            const options = new firefox.Options();
            options.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
            driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();
            await driver.get(BASE_URL);
            // Replace sleep with an explicit wait condition
        } catch (error) {
            console.error("Error during test setup:", error);
            throw error; // Rethrow to ensure Mocha catches it
        }
    });
    

    it("Can find all rgb sliders", async () => {
        const slider_r = await driver.findElement(By.id("slider-r"));
        const slider_g = await driver.findElement(By.id("slider-g"));
        const slider_b = await driver.findElement(By.id("slider-b"));

    });

    it("Can find all rgb inputs", async () => {
        const value_r = await driver.findElement(By.id("value-r"));
        const value_g = await driver.findElement(By.id("value-g"));
        const value_b = await driver.findElement(By.id("value-b"));

    });

    it("Can get hex value from 'value-hex' input field", async () => {
        const hex = await driver.findElement(By.id("value-hex")).getAttribute("value");
        expect(hex).to.equal("#00ff00");
    });

    it("Can get and set 'value-rgb' input field", async () => {
        const box_rgb = await driver.findElement(By.id('value-rgb'));
        let rgb_value = await box_rgb.getAttribute('value');
        expect(rgb_value).to.equal("rgb(0, 255, 0)");
    
        // modify the value-rgb
        const keystroke_sequence = [];
        for (let i = 0; i < rgb_value.length; i++) {
            keystroke_sequence.push(Key.BACK_SPACE);
        }
        
        keystroke_sequence.push("rgb(255, 255, 0)");
        keystroke_sequence.push(Key.ENTER); // User presses enter after input
    
        await box_rgb.sendKeys(...keystroke_sequence);
        rgb_value = await box_rgb.getAttribute('value');
        expect(rgb_value).to.equal("rgb(255, 255, 0)");
    
        await sleep(5);
    });
    
    it("Can move slider", async () => {
        const slider_r = await driver.findElement(By.id("slider-r"));
        const slider_g = await driver.findElement(By.id("slider-g"));
        const slider_b = await driver.findElement(By.id("slider-b"));
        await slider_r.sendKeys(Key.LEFT.repeat(300));
        await slider_g.sendKeys(Key.LEFT.repeat(300));
        await slider_b.sendKeys(Key.LEFT.repeat(300));
        await sleep(5);
    });
    after(async () => {
        await driver.close();
        
    } );
    // Other tests would go here

});
