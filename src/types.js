// Global Components
import * as React from 'react';

export type $Component<P> = React.ReactElement<
React.PropsWithChildren<P>
>;
export type $Children = React.ReactNode;
