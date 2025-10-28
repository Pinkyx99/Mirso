// Fix: Removed triple-slash directives (`/// <reference ... />`) that were causing build errors.
// The necessary types for React and react-three-fiber are loaded through the imports below,
// which is sufficient for the global JSX namespace augmentation to work correctly.

// The imports below ensure proper JSX namespace augmentation.
// The React import brings the 'React' namespace into scope, which is required for augmenting JSX.IntrinsicElements.
import * as React from 'react';
// FIX: Removed unused import. ThreeElements is a type alias and cannot be used in an `extends` clause for an interface.
// import { ThreeElements } from '@react-three/fiber';

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
// and extend from React to fix widespread JSX intrinsic element errors.
// The previous attempt to extend `ThreeElements` was incorrect because it is a type alias, not an interface,
// which caused the entire JSX augmentation to fail. By removing it, we allow React's intrinsic elements
// to be correctly recognized. @react-three/fiber should provide its own global JSX augmentations,
// which will now be processed correctly.
declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
