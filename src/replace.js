
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './find-replace.svg';

export default class Replace extends Plugin {
	static get pluginName() {
		return 'Replace';
	}

	init() {
		this._config = this.editor.config.get( 'replace' ) || {};
		this.editor.ui.componentFactory.add( 'replace', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Замена',
				icon: imageIcon,
				tooltip: true
			} );
			view.set( 'isVisible', this._config.show );
			view.on( 'execute', () => {
				if ( this._config.open ) {
					this._config.open( this.editor );
				}
			} );

			return view;
		} );
	}
}
