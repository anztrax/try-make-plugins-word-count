'use babel';

import TryMakePluginsWordCount from '../lib/try-make-plugins-word-count';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TryMakePluginsWordCount', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('try-make-plugins-word-count');
  });

  describe('when the try-make-plugins-word-count:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.try-make-plugins-word-count')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'try-make-plugins-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.try-make-plugins-word-count')).toExist();

        let tryMakePluginsWordCountElement = workspaceElement.querySelector('.try-make-plugins-word-count');
        expect(tryMakePluginsWordCountElement).toExist();

        let tryMakePluginsWordCountPanel = atom.workspace.panelForItem(tryMakePluginsWordCountElement);
        expect(tryMakePluginsWordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'try-make-plugins-word-count:toggle');
        expect(tryMakePluginsWordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.try-make-plugins-word-count')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'try-make-plugins-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let tryMakePluginsWordCountElement = workspaceElement.querySelector('.try-make-plugins-word-count');
        expect(tryMakePluginsWordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'try-make-plugins-word-count:toggle');
        expect(tryMakePluginsWordCountElement).not.toBeVisible();
      });
    });
  });
});
