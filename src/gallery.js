import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './image-album.svg';

export default class GalleryImage extends Plugin {
	init() {
		const editor = this.editor;
		this._config = editor.config.get( 'gallery' ) || {};
		editor.ui.componentFactory.add( 'galleryImage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Изображение из галереи',
				icon: imageIcon,
				tooltip: true
			} );
			view.set( 'isVisible', this._config.show );
			view.on( 'execute', () => {
				this._openCallbacks.map( cb => cb( imageUrl => {
					editor.model.change( writer => {
						const selection = writer.createSelection( editor.model.document.selection );
						const imageElement = writer.createElement( 'image', {
							src: imageUrl
						} );
						editor.model.insertContent( imageElement, selection );
					} );
				} ) );
			} );

			return view;
		} );
	}

	static get pluginName() {
		return 'GalleryImage';
	}

	get _openCallbacks() {
		const openCallbacks = [];

		if ( this._config.open ) {
			openCallbacks.push( this._config.open );
		}

		return openCallbacks;
	}
}
