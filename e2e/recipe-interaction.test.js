/* eslint-disable no-undef */
describe('Recipe Interaction Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  
  it('should add recipe to favourites', async () => {
    await element(by.text('Home')).tap();
    await expect(element(by.text('Popular'))).toBeVisible();

    await waitFor(element(by.id('recipe-card')).atIndex(0))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('recipe-card')).atIndex(0).tap();

    await waitFor(element(by.id('back-button')))
      .toBeVisible()
      .withTimeout(10000);
    await expect(element(by.text('Ingredients'))).toBeVisible();

    await element(by.id('favourite-button')).tap();

    await waitFor(element(by.id('back-button')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('back-button')).tap();
    await element(by.text('Home')).tap();

    await expect(element(by.text('Popular'))).toBeVisible();
    await waitFor(element(by.id('favorite-icon')).atIndex(0))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should remove recipe from favourites', async () => {
    await element(by.text('Home')).tap();
    await expect(element(by.text('Popular'))).toBeVisible();

    await waitFor(element(by.id('recipe-card')).atIndex(0))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('recipe-card')).atIndex(0).tap();

    await waitFor(element(by.id('back-button')))
      .toBeVisible()
      .withTimeout(10000);
    await expect(element(by.text('Ingredients'))).toBeVisible();

    await element(by.id('favourite-button')).tap();

    await waitFor(element(by.id('back-button')))
      .toBeVisible()
      .withTimeout(1000);

    await element(by.id('back-button')).tap();
    await element(by.text('Home')).tap();

    await expect(element(by.text('Popular'))).toBeVisible();
    await expect(element(by.id('favorite-icon')).atIndex(0)).not.toBeVisible();
  });
});
