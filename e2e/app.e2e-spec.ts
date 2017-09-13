import { Cc2017TutorialPage } from './app.po';

describe('cc2017-tutorial App', () => {
  let page: Cc2017TutorialPage;

  beforeEach(() => {
    page = new Cc2017TutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
