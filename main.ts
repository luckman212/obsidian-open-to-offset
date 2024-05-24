// https://docs.obsidian.md/Reference/TypeScript+API/Editor/scrollIntoView
// https://forum.obsidian.md/t/command-line-interface-to-open-files-folders-in-obsidian-from-the-terminal/860/25

// usage: open 'obsidian://open-to-offset?file=foo.md&offset=1234'

import {
	App,
	Plugin,
	ObsidianProtocolData,
	MarkdownView,
	TFile
} from 'obsidian';

const actionName = 'open-to-offset';
const pluginName = 'open-to-offset';

export default class OpenToOffsetPlugin extends Plugin {
	async onload() {
		console.log(`Loading ${pluginName} plugin`);
		this.registerObsidianProtocolHandler(actionName, (params: ObsidianProtocolData) => {
			if (params.action == actionName) {
				if (params.file) {
					const file = this.app.vault.getAbstractFileByPath(params.file);
					if (!(file instanceof TFile)) {
						console.error(`'${params.file}' not found in vault`);
						return;
					}
					this.app.workspace.openLinkText('', params.file)
					.then(async () => {
						var cmEditor = this.getEditor();
						if (params.offset) {
							const wantPos = parseInt(params.offset);
							const maxPos = cmEditor.posToOffset({ch:0, line: cmEditor.lastLine()});
							await cmEditor.setCursor(0, (wantPos <= maxPos ? wantPos : maxPos));
							await cmEditor.scrollIntoView({
								from: cmEditor.getCursor('from'),
								to: cmEditor.getCursor('to')},
								true);
						}
						cmEditor.focus();
					});
				} else {
					console.log(`No path specified for ${actionName}`);
				}
			}
		})
	}

	onunload() {
		console.log(`Unloading ${pluginName} plugin`);
	}

	getEditor() {
		var view = this.app.workspace.activeLeaf.view;
		if (view.getViewType() == 'markdown') {
			var markdownView = view as MarkdownView;
			var cmEditor = markdownView.sourceMode.cmEditor;
			return cmEditor;
		}
		return null;
	}
}
