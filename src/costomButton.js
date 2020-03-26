
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class CustomButton extends Plugin {
	static get pluginName() {
		return 'CustomButton';
	}

	init() {
		this._config = this.editor.config.get( 'customButton' ) || {};
		this.editor.ui.componentFactory.add( 'customButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: this._config.label,
				icon: this._config.icon,
				tooltip: this._config.tooltip
			} );
			view.set( 'isVisible', this._config.visible );
			view.on( 'execute', () => {
				if ( this._config.callback ) {
					this._config.callback( this.editor );
				}
			} );

			return view;
		} );
	}
}
