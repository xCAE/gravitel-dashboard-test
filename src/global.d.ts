declare module '*.graphql' {
	import { DocumentNode } from 'graphql';

	const value: DocumentNode;
	export = value;
}

declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
