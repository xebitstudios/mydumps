import { ClickerPage } from './app.po';

describe('clicker App', () => {
  let page: ClickerPage;

  beforeEach(() => {
    page = new ClickerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
