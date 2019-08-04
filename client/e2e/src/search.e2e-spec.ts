import {SearchPage} from './search.po';
import {browser} from 'protractor';


describe('Search Component',()=> {

  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('should be able to search products between $10 to $100', function () {

    page.navigateToLandingPage();
    let currentUrl = browser.getCurrentUrl();
    expect(currentUrl).toContain('categories/all');
    //perform search
    page.performMinMaxSearch(10,100);

    let firstProductPrice = page.getFirstProductPrice();
    expect(firstProductPrice).toBeGreaterThanOrEqual(10);
    expect(firstProductPrice).toBeLessThanOrEqual(100);

  });

});
