import { TestWindow } from '@stencil/core/testing';
import { AppMachineStatus } from './app-machine-status';

describe('app-machine-status', () => {
  it('should build', () => {
    expect(new AppMachineStatus()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppMachineStatusElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppMachineStatus],
        html: '<app-machine-status></app-machine-status>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
