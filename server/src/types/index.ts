export interface GSHHG {
  id: number;
  n: number;
  flag: number;
  west: number;
  east: number;
  south: number;
  north: number;
  area: number;
  areaFull: number;
  container: number;
  ancestor: number;
}

export interface GSHHGPoint {
  x: number;
  y: number;
}
