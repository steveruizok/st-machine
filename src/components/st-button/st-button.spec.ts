import { TestWindow } from '@stencil/core/testing';
import { StButton } from './st-button';

describe('st-button', () => {
  it('should build', () => {
    expect(new StButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLStButtonElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [StButton],
        html: '<st-button></st-button>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
