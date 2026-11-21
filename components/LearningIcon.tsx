import type { CSSProperties } from "react";
type IconName =
  | "home"
  | "star"
  | "sound"
  | "muted"
  | "back"
  | "arrow"
  | "user"
  | "check"
  | "play"
  | "close"
  | "leaf"
  | "book";
const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7v10H3Z" />
      <path d="M9 20v-7h6v7" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" />
  ),
  sound: (
    <>
      <path d="M11 4 6 8H3v8h3l5 4Z" />
      <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
    </>
  ),
  muted: (
    <>
      <path d="M11 4 6 8H3v8h3l5 4Z" />
      <path d="m16 9 6 6m0-6-6 6" />
    </>
  ),
  back: <path d="m9 5 7 7-7 7M16 12H3" />,
  arrow: <path d="m15 5-7 7 7 7M8 12h13" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m9 5 11 7-11 7Z" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  leaf: (
    <>
      <path d="M20 3C8 2 2 8 5 16c8 5 16-2 15-13Z" />
      <path d="M4 21 15 9" />
    </>
  ),
  book: (
    <>
      <path d="M12 6C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 2Z" />
      <path d="M12 6v15" />
    </>
  ),
};
export default function LearningIcon({
  name,
  size = 22,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
