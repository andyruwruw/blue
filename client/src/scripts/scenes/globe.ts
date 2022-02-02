import {
  Clock,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
  CameraDefaultSettings,
  sceneInitializer,
  SceneState,
} from './index';
import {
  starLight,
  sunLight,
} from '../lighting/solar-system';
import { createBase } from '../meshes/globe';

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
  z: 30,
};

const clock = new Clock();
let delta = 0;

let controls: OrbitControls | null;

/**
 * Animates the Three.js scene.
 *
 * @param {SceneState} state State for Three.js scene.
 */
export const animate = (state: GlobeState): void => {
  requestAnimationFrame(() => { animate(state); });

  delta = clock.getDelta();

  const scene = (state.scene as Scene);
  const camera = (state.camera as PerspectiveCamera);

  (controls as OrbitControls).update();

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

  (state.scene as Scene).add(createBase());
  (state.scene as Scene).add(sunLight());
  (state.scene as Scene).add(starLight());

  controls = new OrbitControls(
    state.camera as PerspectiveCamera,
    (state.renderer as WebGLRenderer).domElement,
    // state.scene,
  );

  animate(state);
};
