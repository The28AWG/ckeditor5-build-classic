/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Aligment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Font from '@ckeditor/ckeditor5-font/src/font';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from './image-album.svg';

class GalleryImage extends Plugin {
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

	get _openCallbacks() {
		const openCallbacks = [];

		if ( this._config.open ) {
			openCallbacks.push( this._config.open );
		}

		return openCallbacks;
	}
}

export default class ClassicEditor extends ClassicEditorBase {
}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	BlockQuote,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	Aligment,
	Autosave,
	RemoveFormat,
	Mention,
	Highlight,
	Font,
	BlockToolbar,
	ParagraphButtonUI,
	HeadingButtonsUI,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	GalleryImage
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'alignment',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'code',
			'subscript',
			'superscript',
			'|',
			'link',
			'highlight',
			'removeFormat',
			'|',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'galleryImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'|',
			'undo',
			'redo'
		]
	},
	blockToolbar: [
		'paragraph', 'heading1', 'heading2', 'heading3',
		'|',
		'bulletedList', 'numberedList',
		'|',
		'blockQuote', 'imageUpload'
	],
	image: {
		// You need to configure the image toolbar, too, so it uses the new style buttons.
		toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],

		styles: [
			'full',
			'side',
			'alignLeft',
			'alignCenter',
			'alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	language: 'ru'
};
