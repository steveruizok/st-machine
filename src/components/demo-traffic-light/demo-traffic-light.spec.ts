import { TestWindow } from '@stencil/core/testing';
import { DemoTrafficLight } from './demo-traffic-light';

describe('demo-traffic-light', () => {
  it('should build', () => {
    expect(new DemoTrafficLight()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLDemoTrafficLightElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DemoTrafficLight],
        html: '<demo-traffic-light></demo-traffic-light>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
