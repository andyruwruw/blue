import {
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';

import {
  CameraDefaultSettings,
  sceneInitializer,
  SceneState,
} from './index';

/**
 * State for Globe three.js scene.
 */
export type GlobeState = SceneState;

/**
 * Default state for Globe three.js scene.
 */
export const defaultState: GlobeState = {
  /**
   * Reference to canvas HTMLElement.
   */
  container: null,

  /**
    * Three.js camera object.
    */
  camera: null,

  /**
    * Three.js scene object.
    */
  scene: null,

  /**
    * Three.js renderer object.
    */
  renderer: null,

  /**
    * Mouse position.
    */
  mouse: new Vector2(),

  /**
    * Raycaster object for mouse interactions.
    */
  raycaster: null,
} as GlobeState;

/**
 * Default camera settings.
 */
const CAMERA_DEFAULT_SETTINGS: CameraDefaultSettings = {
  fov: 75,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 0,
  z: 0,
};

/**
 * Animates the Three.js scene.
 *
 * @param {SceneState} state State for Three.js scene.
 */
export const animate = (state: GlobeState): void => {
  requestAnimationFrame(() => { animate(state); });

  const scene = (state.scene as Scene);
  const camera = (state.camera as PerspectiveCamera);

  (state.renderer as WebGLRenderer).render(scene, camera);
};

/**
 * Sets up Globe Three.js scene.
 *
 * @param {string} canvasId CSS Id of the canvas element.
 * @param {SceneState} state State for Three.js scene.
 */
export const initialize = (
  canvasId: string,
  state: GlobeState,
): void => {
  sceneInitializer(canvasId, state, CAMERA_DEFAULT_SETTINGS);

  animate(state);
};
