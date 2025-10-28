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

// FIX: Corrected the JSX IntrinsicElements augmentation.
// The previous `extends React.JSX.IntrinsicElements` created a circular definition for the interface,
// which caused TypeScript to fail to recognize any intrinsic elements (both standard HTML and custom ones).
// By removing the `extends` clause, we rely on TypeScript's declaration merging feature. This allows
// our custom `meshLineGeometry` and `meshLineMaterial` elements to be added to the existing definitions
// from React and react-three-fiber without overwriting or breaking them. This single fix resolves
// all 'Property does not exist on type JSX.IntrinsicElements' errors throughout the project.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
