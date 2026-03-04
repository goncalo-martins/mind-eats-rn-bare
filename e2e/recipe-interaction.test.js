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

    // Tap the "Add to Favourites" button

    // Verify that the recipe is added to favourites
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

    // Tap the "Remove from Favourites" button

    // Verify that the recipe is removed from favourites
  });
});
