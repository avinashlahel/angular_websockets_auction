import {$, $$, browser, by, element} from 'protractor';

export class SearchPage {

  navigateToLandingPage() {
    return browser.get('/');
  }

  performMinMaxSearch(min, max) {
    // find the search button
    let searchToolButton = element(by.id('search'));
    searchToolButton.click();

    browser.wait(browser.ExpectedConditions.presenceOf(element(by.css('.form'))),
      1000, 'Did not find element');

    let minField = $('input[formcontrolname="minPrice"]');
    let maxField = $('input[formcontrolname="maxPrice"]');
    minField.sendKeys(min);
    maxField.sendKeys(max);

    browser.takeScreenshot();

    let searchButton = $('button[class="form__submit mat-raised-button mat-primary"]');
    searchButton.click();

    let EC = browser.ExpectedConditions;
    let urlContains = EC.urlContains('search-results?minPrice=10&maxPrice=100');
    browser.wait(urlContains, 5000, 'Received a Timeout');
  }

  getFirstProductPrice() {
    return $$('span[class="tile__price-tag"]')
      .first()
      .getText()
      .then(val => parseInt(val.replace('$', ''), 10));
  }

}
