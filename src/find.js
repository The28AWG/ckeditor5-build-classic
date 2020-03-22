
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './magnify.svg';

export default class Find extends Plugin {
	static get pluginName() {
		return 'Find';
	}

	init() {
		this._config = this.editor.config.get( 'find' ) || {};
		this.editor.ui.componentFactory.add( 'find', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Поиск',
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
