import {
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  sRGBEncoding,
  Vector2,
  WebGLRenderer,
} from 'three';

import { SCENE_BACKGROUND_COLOR } from '../../config';

/**
 * Abstract state for any three.js scene.
 */
export interface SceneState {
  /**
   * Reference to canvas HTMLElement.
   */
  container: HTMLElement | null;

  /**
   * Three.js camera object.
   */
  camera: PerspectiveCamera | null;

  /**
   * Three.js scene object.
   */
  scene: Scene | null;

  /**
   * Three.js renderer object.
   */
  renderer: WebGLRenderer | null;

  /**
   * Mouse position.
   */
  mouse: Vector2;

  /**
   * Raycaster object for mouse interactions.
   */
  raycaster: Raycaster | null;

  /**
   * Meshes to be rendered.
   */
  meshes: Record<string, Mesh>;
}

/**
 * Default camera settings.
 */
export interface CameraDefaultSettings {
  /**
   * Camera mm.
   */
  fov: number;

  /**
   * Distance to objects considered close.
   */
  near: number;

  /**
   * Distance to objects considered far.
   */
  far: number;

  /**
   * Camera position x.
   */
  x: number;

  /**
   * Camera position y.
   */
  y: number;

  /**
   * Camera position z.
   */
  z: number;
}

/**
 * Retrieves canvas as HTMLElement.
 *
 * @param {string} canvasId CSS Id of the canvas element.
 */
const getContainer = (canvasId: string): HTMLElement => (
  document.getElementById(canvasId) as HTMLElement
);

/**
 * Creates a new Three.js PerspectiveCamera.
 *
 * @param {HTMLElement} container Canvase HTMLElement.
 * @returns {PerspectiveCamera} New PerspectiveCamera object.
 */
const createPerspectiveCamera = (
  container: HTMLElement,
  cameraDefaultSettings: CameraDefaultSettings,
): PerspectiveCamera => {
  const camera = new PerspectiveCamera(
    cameraDefaultSettings.fov,
    container.clientWidth / container.clientHeight,
    cameraDefaultSettings.near,
    cameraDefaultSettings.far,
  );
  camera.position.x = cameraDefaultSettings.x;
  camera.position.y = cameraDefaultSettings.y;
  camera.position.z = cameraDefaultSettings.z;

  return camera;
};

/**
 * Creates a new Three.js PerspectiveCamera.
 *
 * @param {HTMLElement} container Canvase HTMLElement.
 * @returns {PerspectiveCamera} New PerspectiveCamera object.
 */
const recreatePerspectiveCamera = (
  state: SceneState,
  camera: PerspectiveCamera,
): PerspectiveCamera => {
  const newCamera = new PerspectiveCamera(
    camera.fov,
    (state.container as HTMLElement).clientWidth / (state.container as HTMLElement).clientHeight,
    camera.near,
    camera.far,
  );
  newCamera.position.x = camera.position.x;
  newCamera.position.y = camera.position.y;
  newCamera.position.z = camera.position.z;

  return newCamera;
};

/**
 * Creates a new Three.js Scene.
 *
 * @returns {Scene} New Scene object.
 */
const createScene = (): Scene => {
  const scene = new Scene();
  scene.background = SCENE_BACKGROUND_COLOR;

  return scene;
};

/**
 * Creates a new Three.js Raycaster.
 *
 * @returns {Raycaster} New Raycaster object.
 */
const createRaycaster = (): Raycaster => new Raycaster();

/**
 * Creates a new Three.js WebGLRenderer.
 *
 * @returns {WebGLRenderer} New WebGLRenderer object.
 */
const createRenderer = (container: HTMLElement): WebGLRenderer => {
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputEncoding = sRGBEncoding;

  container.appendChild(renderer.domElement);

  return renderer;
};

/**
 * Sets up a Three.js scene.
 *
 * @param {string} canvasId CSS Id of the canvas element.
 * @param {SceneState} state State for Three.js scene.
 * @param {CameraDefaultSettings} cameraDefaultSettings Default camera settings.
 */
export const sceneInitializer = (
  canvasId: string,
  state: SceneState,
  cameraDefaultSettings: CameraDefaultSettings,
): void => {
  state.container = getContainer(canvasId);

  state.camera = createPerspectiveCamera(state.container, cameraDefaultSettings);
  state.scene = createScene();
  state.raycaster = createRaycaster();

  state.renderer = createRenderer(state.container);
};

/**
 * Resizes the Three.js scene.
 *
 * @param {SceneState} state State for Three.js scene.
 */
export const resize = (state: SceneState): void => {
  const {
    clientWidth,
    clientHeight,
  } = (state.container as HTMLElement);

  (state.renderer as WebGLRenderer).setSize(clientWidth, clientHeight);
  state.camera = recreatePerspectiveCamera(state, state.camera as PerspectiveCamera);
};
