import { Color } from 'three';

export interface MusicLayer {
  name: string;
  fileName: string;
  defaultVolume: number;
}

export interface Music {
  name: string;
  layers: MusicLayer[];
}

export const SCENE_BACKGROUND_COLOR = new Color(0x000000);

export const USELESS = null;

export const MUSIC: Music[] = [
  {
    name: 'A Tale of Interiors',
    layers: [
      {
        defaultVolume: 0.3,
        fileName: 'a-tale-of-interiors__melody.mp3',
        name: 'melody',
      },
      {
        defaultVolume: 0.6,
        fileName: 'a-tale-of-interiors__instruments.mp3',
        name: 'instruments',
      },
    ],
  },
  {
    name: 'The Fortunate',
    layers: [
      {
        defaultVolume: 0.3,
        fileName: 'the-fortunate__melody.mp3',
        name: 'melody',
      },
      {
        defaultVolume: 0.6,
        fileName: 'the-fortunate__instruments.mp3',
        name: 'instruments',
      },
      {
        defaultVolume: 0.6,
        fileName: 'the-fortunate__bass.mp3',
        name: 'bass',
      },
    ],
  },
  {
    name: 'Vila',
    layers: [
      {
        defaultVolume: 0.3,
        fileName: 'vila__melody.mp3',
        name: 'melody',
      },
      {
        defaultVolume: 0.6,
        fileName: 'vila__instruments.mp3',
        name: 'instruments',
      },
      {
        defaultVolume: 0.6,
        fileName: 'vila__bass.mp3',
        name: 'bass',
      },
    ],
  },
  {
    name: 'Vindstilla',
    layers: [
      {
        defaultVolume: 0.3,
        fileName: 'vindstilla__melody.mp3',
        name: 'melody',
      },
      {
        defaultVolume: 0.6,
        fileName: 'vindstilla__instruments.mp3',
        name: 'instruments',
      },
      {
        defaultVolume: 0.6,
        fileName: 'vindstilla__bass.mp3',
        name: 'bass',
      },
    ],
  },
];
