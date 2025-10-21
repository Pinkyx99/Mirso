// Fix: Removed triple-slash directives (`/// <reference ... />`) that were causing build errors.
// The necessary types for React and react-three-fiber are loaded through the imports below,
// which is sufficient for the global JSX namespace augmentation to work correctly.

// The imports below ensure proper JSX namespace augmentation.
// The React import brings the 'React' namespace into scope, which is required for augmenting JSX.IntrinsicElements.
import * as React from 'react';
import { ThreeElements } from '@react-three/fiber';

export interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  width: number;
  height: number;
}

// Augment the global JSX namespace to include custom `meshline` elements for react-three-fiber
// and extend from React and R3F to fix widespread JSX intrinsic element errors.
declare global {
  namespace JSX {
    // By extending React.JSX.IntrinsicElements and ThreeElements, we ensure that
    // both standard HTML elements and react-three-fiber elements are available,
    // solving the widespread "Property does not exist on type 'JSX.IntrinsicElements'" errors.
    interface IntrinsicElements extends React.JSX.IntrinsicElements, ThreeElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
