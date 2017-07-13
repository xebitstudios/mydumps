import { PortalUiPage } from './app.po';

describe('portal-ui App', () => {
  let page: PortalUiPage;

  beforeEach(() => {
    page = new PortalUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
