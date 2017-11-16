import { TourOfHerosPage } from './app.po';

describe('tour-of-heros App', () => {
  let page: TourOfHerosPage;

  beforeEach(() => {
    page = new TourOfHerosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
