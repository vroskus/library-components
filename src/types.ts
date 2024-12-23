// Global Components
import * as React from 'react';

export type $Children = React.ReactNode;
export type $Component<P> = React.ReactElement<
React.PropsWithChildren<P>
>;
