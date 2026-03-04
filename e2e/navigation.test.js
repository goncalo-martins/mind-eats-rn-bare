describe('Navigation Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should switch between favourites and home', async () => {
    // Navigate to Favourites
    await element(by.text('Favourites')).tap();
    await expect(element(by.text('My Favourites'))).toBeVisible();
    
    // Navigate back to Home
    await element(by.text('Home')).tap();
    await expect(element(by.text('Popular'))).toBeVisible();
  });

  it('should navigate to recipe details on list selection', async () => {
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
  });
});
