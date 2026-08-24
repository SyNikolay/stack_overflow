const RADIUS_PX = 10;
const ROOT_FONT_SIZE_PX = 16;

export const cssTokens = {
  "--radius": `${RADIUS_PX / ROOT_FONT_SIZE_PX}rem`,

  "--background": "rgba(244, 246, 248, 1)",
  "--foreground": "rgba(35, 38, 41, 1)",

  "--card": "rgba(255, 255, 255, 1)",
  "--card-foreground": "rgba(35, 38, 41, 1)",

  "--primary": "rgba(10, 149, 255, 1)",
  "--primary-hover": "rgba(0, 116, 204, 1)",
  "--primary-foreground": "rgba(255, 255, 255, 1)",

  "--muted": "rgba(236, 239, 241, 1)",
  "--muted-foreground": "rgba(106, 115, 124, 1)",

  "--border": "rgba(223, 227, 230, 1)",
  "--ring": "rgba(10, 149, 255, 0.45)",

  "--destructive": "rgba(211, 47, 47, 1)",
  "--destructive-surface": "rgba(253, 236, 234, 1)",

  "--answered": "rgba(67, 160, 71, 1)",
  "--answered-surface": "rgba(230, 246, 234, 1)",
  "--answered-foreground": "rgba(46, 125, 50, 1)",

  "--selected": "rgba(139, 92, 246, 1)",
  "--selected-surface": "rgba(243, 232, 255, 1)",

  "--shadow-card":
    "0 1px 2px rgba(35, 38, 41, 0.06), 0 1px 8px rgba(35, 38, 41, 0.04)",
  "--shadow-dragging": "0 8px 24px rgba(35, 38, 41, 0.18)",
} as const;

export type CssTokenName = keyof typeof cssTokens;

export const token = (name: CssTokenName): string => `var(${name})`;

export const radiusTokens = {
  base: RADIUS_PX,
  sm: RADIUS_PX - 4,
} as const;

export const spacingTokens = {
  base: 8,
} as const;

export const typographyTokens = {
  fontFamily: [
    "Inter",
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
