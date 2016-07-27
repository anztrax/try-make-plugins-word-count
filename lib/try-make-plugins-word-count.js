'use babel';

import TryMakePluginsWordCountView from './try-make-plugins-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  tryMakePluginsWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tryMakePluginsWordCountView = new TryMakePluginsWordCountView(state.tryMakePluginsWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tryMakePluginsWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'try-make-plugins-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tryMakePluginsWordCountView.destroy();
  },

  serialize() {
    return {
      tryMakePluginsWordCountViewState: this.tryMakePluginsWordCountView.serialize()
    };
  },

  toggle() {
    console.log('TryMakePluginsWordCount was toggled!');

    if(this.modalPanel.isVisible()){
      return this.modalPanel.hide()
    }else{
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.tryMakePluginsWordCountView.setCount(words);
      return this.modalPanel.show()
    }
  }

};
