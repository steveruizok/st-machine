import { TestWindow } from '@stencil/core/testing';
import { DemoButton } from './demo-button';

describe('demo-button', () => {
  it('should build', () => {
    expect(new DemoButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLDemoButtonElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DemoButton],
        html: '<demo-button></demo-button>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
