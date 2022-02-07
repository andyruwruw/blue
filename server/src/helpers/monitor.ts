// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

/**
 * Resets formatting.
 */
const RESET = '\x1b[0m';

/**
 * Format for different monitor layers.
 */
 export const MonitorLayerNameFormat: Record<string, string> = {
  '0': '\x1b[37m\x1b[2m', // DEBUG
  '1': '\x1b[1m\x1b[4m\x1b[31m', // WARNING
  '2': '\x1b[33m', // NOTIFICATION
  '3': '\x1b[1m\x1b[32m', // UPDATE
};

/**
 * Format for different monitor layers.
 */
export const MonitorLayerMessageFormat: Record<string, string> = {
  '0': '\x1b[37m\x1b[2m', // DEBUG
  '1': '\x1b[1m\x1b[4m\x1b[31m', // WARNING
  '2': '\x1b[37m', // NOTIFICATION
  '3': '\x1b[1m\x1b[32m', // UPDATE
};

/**
 * Format for different monitor layers.
 */
 export const MonitorLayerEnabled: Record<string, boolean> = {
  '0': true,
  '1': true,
  '2': true,
  '3': true,
};

/**
 * Layers of monitor output.
 */
export const MonitorLayer: Record<string, number> = {
  DEBUG: 0,
  WARNING: 1,
  NOTIFICATION: 2,
  UPDATE: 3,
}

/**
 * Proxy to console.
 */
export class Monitor {
  /**
   * Print a statement to the console.
   *
   * @param {string} text Text to be printed.
   * @param {number} layer Layer to print text to.
   */
  static log(
    source: any,
    text: string,
    layer: number = 0,
  ) {
    if (MonitorLayerEnabled[`${layer}`]) {
      console.log(
        `${MonitorLayerNameFormat[`${layer}`]}[${source.name}]:${RESET}`,
        `${MonitorLayerMessageFormat[`${layer}`]}${text}${RESET}`,
      );
    }
  }
}
