import { LZ2Page } from './app.po';

describe('lz2 App', () => {
  let page: LZ2Page;

  beforeEach(() => {
    page = new LZ2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
