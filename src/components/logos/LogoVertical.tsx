export default function LogoVertical({ width = 256 }: { width?: number }) {
  const baseWidth = 256;
  const baseHeight = 256;
  const aspectRatio = baseWidth / baseHeight;

  const finalWidth = width;
  const finalHeight = finalWidth / aspectRatio;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={finalWidth}
      height={finalHeight}
      viewBox={`0 0 ${baseWidth} ${baseHeight}`}
      fill="none"
    >
      <path
        fill="url(#a)"
        d="M81.15 125.62c-3.7 3.7-3.73 9.77.52 12.8a56.41 56.41 0 0 0 4.41 2.86c2.75 1.6 4.3 4.78 3.47 7.85a4.73 4.73 0 0 0 3.35 5.8l9.14 2.45a4.73 4.73 0 0 0 5.8-3.35l.04-.16a6.87 6.87 0 0 1 6.73-4.92c3.1 0 5.94 1.93 6.74 4.92l.05.16a4.73 4.73 0 0 0 5.8 3.35l9.13-2.45a4.73 4.73 0 0 0 3.35-5.8l-.04-.14a6.83 6.83 0 0 1 3.35-7.62c2.68-1.55 6.14-1.31 8.33.87l.1.11a4.73 4.73 0 0 0 6.7 0l6.7-6.69a4.73 4.73 0 0 0 0-6.7l-.12-.1c-2.19-2.2-2.42-5.65-.87-8.33a6.83 6.83 0 0 1 7.61-3.35l.15.04a4.73 4.73 0 0 0 5.8-3.34l2.45-9.15a4.73 4.73 0 0 0-3.35-5.8l-.16-.04a6.87 6.87 0 0 1-4.93-6.73c0-3.1 1.94-5.94 4.93-6.74l.16-.04a4.73 4.73 0 0 0 3.35-5.8l-2.45-9.14a4.73 4.73 0 0 0-5.8-3.35c-3.07.82-6.26-.71-7.86-3.47A56.87 56.87 0 0 0 154.77 52l-73.62 73.62Z"
      />
      <path
        fill="url(#b)"
        d="M81.15 125.62c-3.7 3.7-3.73 9.77.52 12.8a56.41 56.41 0 0 0 4.41 2.86c2.75 1.6 4.3 4.78 3.47 7.85a4.73 4.73 0 0 0 3.35 5.8l9.14 2.45a4.73 4.73 0 0 0 5.8-3.35l.04-.16a6.87 6.87 0 0 1 6.73-4.92c3.1 0 5.94 1.93 6.74 4.92l.05.16a4.73 4.73 0 0 0 5.8 3.35l9.13-2.45a4.73 4.73 0 0 0 3.35-5.8l-.04-.14a6.83 6.83 0 0 1 3.35-7.62c2.68-1.55 6.14-1.31 8.33.87l.1.11a4.73 4.73 0 0 0 6.7 0l6.7-6.69a4.73 4.73 0 0 0 0-6.7l-.12-.1c-2.19-2.2-2.42-5.65-.87-8.33a6.83 6.83 0 0 1 7.61-3.35l.15.04a4.73 4.73 0 0 0 5.8-3.34l2.45-9.15a4.73 4.73 0 0 0-3.35-5.8l-.16-.04a6.87 6.87 0 0 1-4.93-6.73c0-3.1 1.94-5.94 4.93-6.74l.16-.04a4.73 4.73 0 0 0 3.35-5.8l-2.45-9.14a4.73 4.73 0 0 0-5.8-3.35c-3.07.82-6.26-.71-7.86-3.47A56.87 56.87 0 0 0 154.77 52l-73.62 73.62Z"
      />
      <path
        fill="url(#c)"
        d="M91.19 28.57a4.73 4.73 0 0 1 0-6.69l6.7-6.7a4.73 4.73 0 0 1 6.69 0l.1.12c2.2 2.19 5.65 2.42 8.33.87a6.83 6.83 0 0 0 3.35-7.61l-.04-.15a4.73 4.73 0 0 1 3.35-5.8L128.8.16a4.73 4.73 0 0 1 5.8 3.35l.04.16a6.87 6.87 0 0 0 6.74 4.92c3.09 0 5.93-1.93 6.73-4.92l.05-.16a4.73 4.73 0 0 1 5.8-3.35l9.13 2.45a4.73 4.73 0 0 1 3.35 5.8c-.82 3.07.72 6.26 3.47 7.86 1.5.87 2.97 1.82 4.41 2.85 4.25 3.03 4.22 9.1.52 12.8l-73.62 73.62a56.9 56.9 0 0 1-8.96-11.62c-1.6-2.75-4.79-4.3-7.86-3.47a4.73 4.73 0 0 1-5.8-3.34l-2.45-9.15a4.73 4.73 0 0 1 3.35-5.8l.16-.04a6.87 6.87 0 0 0 4.92-6.73c0-3.1-1.93-5.94-4.92-6.74l-.16-.05a4.73 4.73 0 0 1-3.35-5.8l2.45-9.13a4.73 4.73 0 0 1 5.8-3.35l.15.04c2.98.8 6.07-.67 7.61-3.35 1.55-2.68 1.32-6.14-.87-8.33l-.11-.1Z"
      />
      <path
        fill="url(#d)"
        fillRule="evenodd"
        d="m93.14 19.94-1.95 1.94a4.73 4.73 0 0 0 0 6.7l.1.1c2.2 2.2 2.43 5.65.88 8.34a7.4 7.4 0 0 1-.26.41c.91-.6 1.7-1.43 2.26-2.42 1.55-2.68 1.32-6.14-.87-8.33l-.11-.1a4.73 4.73 0 0 1-.05-6.64ZM80.99 40.7a4.72 4.72 0 0 0-2.38 2.97l-2.45 9.14a4.73 4.73 0 0 0 3.35 5.8l.16.04a6.87 6.87 0 0 1 4.92 6.74 7.3 7.3 0 0 1-1.15 3.95 7.06 7.06 0 0 0 3.16-5.95c0-3.1-1.94-5.94-4.93-6.74l-.16-.05a4.73 4.73 0 0 1-3.35-5.8l2.45-9.13c.1-.35.22-.67.38-.97Zm-2.45 31.84a4.73 4.73 0 0 0-2.38 5.42l2.45 9.15a4.73 4.73 0 0 0 5.8 3.34c3.07-.82 6.26.72 7.86 3.47a56.86 56.86 0 0 0 8.96 11.62l2-2a56.86 56.86 0 0 1-8.96-11.62c-1.6-2.75-4.79-4.3-7.86-3.47a4.73 4.73 0 0 1-5.8-3.35l-2.45-9.14c-.32-1.2-.15-2.4.38-3.42Zm4.53 51.16-1.92 1.92c-3.7 3.7-3.73 9.77.52 12.8a56.37 56.37 0 0 0 4.41 2.86c2.75 1.6 4.3 4.78 3.47 7.85a4.73 4.73 0 0 0 3.35 5.8l9.14 2.45a4.73 4.73 0 0 0 5.42-2.38c-1.02.53-2.23.7-3.42.38l-9.14-2.45a4.73 4.73 0 0 1-3.35-5.8c.82-3.07-.72-6.25-3.47-7.85a56.41 56.41 0 0 1-4.41-2.85c-4.23-3.02-4.22-9.03-.6-12.73Zm27.58 26.4a7.3 7.3 0 0 1 3.96-1.15c3.1 0 5.94 1.93 6.74 4.92l.05.16a4.73 4.73 0 0 0 5.8 3.35l9.13-2.45a4.72 4.72 0 0 0 2.97-2.38c-.3.16-.62.29-.97.38l-9.14 2.45a4.73 4.73 0 0 1-5.8-3.35l-.04-.16a6.87 6.87 0 0 0-6.73-4.92c-2.44 0-4.71 1.2-5.97 3.16Zm31.91-8.47.43-.26c2.68-1.55 6.14-1.31 8.33.88l.1.1a4.73 4.73 0 0 0 6.7 0l6.7-6.69c0-.02.03-.04.05-.05l-4.75 4.74a4.73 4.73 0 0 1-6.7 0l-.1-.1c-2.2-2.2-5.65-2.43-8.33-.88a7.27 7.27 0 0 0-2.43 2.26Zm23.53-23.52a6.55 6.55 0 0 1 5.35-.93l.15.04a4.73 4.73 0 0 0 5.42-2.38c-1.01.53-2.22.7-3.42.38l-.15-.04a6.8 6.8 0 0 0-7.35 2.93Zm8.47-31.91c.54-.34 1.13-.6 1.77-.78l.16-.04a4.72 4.72 0 0 0 2.97-2.38c-.3.16-.63.28-.97.38l-.16.04a6.48 6.48 0 0 0-3.77 2.78ZM156.77 50l18.08-18.08.08-.07L156.77 50ZM150.54.54a4.72 4.72 0 0 0-2.37 2.97l-.05.16a6.36 6.36 0 0 1-.77 1.77 6.48 6.48 0 0 0 2.77-3.77l.05-.16c.09-.34.22-.67.37-.97ZM118.7 3a4.71 4.71 0 0 0-.38 3.42l.04.15a6.8 6.8 0 0 1-2.92 7.35 6.56 6.56 0 0 0 .92-5.35l-.04-.15A4.73 4.73 0 0 1 118.7 3Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#e)"
        fillRule="evenodd"
        d="M95.88 17.19a4.73 4.73 0 0 1 6.7 0l.1.1c2.2 2.2 5.65 2.43 8.34.88a7.28 7.28 0 0 0 2.42-2.26c-.14.1-.28.18-.42.26-2.69 1.55-6.15 1.32-8.34-.87l-.1-.11a4.73 4.73 0 0 0-6.7 0l-2 2Zm20.82-12.2c.3-.16.63-.29.97-.38l9.14-2.45a4.73 4.73 0 0 1 5.8 3.35l.04.16a6.87 6.87 0 0 0 6.74 4.92c2.43 0 4.7-1.2 5.96-3.15a7.3 7.3 0 0 1-3.96 1.15 6.87 6.87 0 0 1-6.74-4.92l-.05-.16a4.73 4.73 0 0 0-5.8-3.35l-9.13 2.45A4.72 4.72 0 0 0 116.7 5Zm31.84-2.45a4.72 4.72 0 0 1 3.42-.38l9.15 2.45a4.73 4.73 0 0 1 3.34 5.8c-.82 3.07.72 6.26 3.47 7.86 1.5.87 2.98 1.82 4.41 2.85 4.26 3.03 4.22 9.1.52 12.8l2-2c3.7-3.7 3.74-9.77-.52-12.8a56.37 56.37 0 0 0-4.41-2.85c-2.75-1.6-4.3-4.79-3.47-7.86a4.73 4.73 0 0 0-3.34-5.8L153.96.16a4.73 4.73 0 0 0-5.42 2.38ZM154.77 52l-2 2a56.87 56.87 0 0 1 8.97 11.62c1.6 2.75 4.78 4.3 7.85 3.47a4.73 4.73 0 0 1 5.8 3.35l2.45 9.14c.32 1.2.15 2.4-.38 3.42a4.73 4.73 0 0 0 2.38-5.42l-2.45-9.14a4.73 4.73 0 0 0-5.8-3.35c-3.07.82-6.25-.71-7.85-3.46A56.87 56.87 0 0 0 154.77 52Zm17.8 36.2a7.06 7.06 0 0 0-3.16 5.96c0 3.09 1.93 5.93 4.92 6.73l.16.05a4.73 4.73 0 0 1 3.35 5.8l-2.45 9.14c-.1.34-.22.66-.38.96a4.72 4.72 0 0 0 2.38-2.96l2.45-9.15a4.73 4.73 0 0 0-3.35-5.8l-.16-.04a6.87 6.87 0 0 1-4.92-6.73 7.3 7.3 0 0 1 1.15-3.96Zm-8.48 31.9a7.3 7.3 0 0 0-2.26 2.43c-1.55 2.68-1.32 6.14.87 8.33l.11.1a4.73 4.73 0 0 1 0 6.7l2-2a4.73 4.73 0 0 0 0-6.7l-.1-.1c-2.2-2.2-2.43-5.65-.88-8.33.08-.15.17-.29.26-.42Zm-23.52 23.53a6.8 6.8 0 0 0-2.93 7.36l.04.14c.32 1.2.16 2.4-.38 3.42a4.73 4.73 0 0 0 2.38-5.42l-.04-.14c-.5-1.89-.1-3.8.93-5.36Zm-31.91 8.47a6.48 6.48 0 0 0-2.78 3.77l-.05.16c-.09.34-.21.67-.37.97a4.71 4.71 0 0 0 2.37-2.97l.05-.16c.17-.64.43-1.23.78-1.77ZM76.53 74.54c.3-.16.63-.28.97-.37l.16-.05a6.48 6.48 0 0 0 3.77-2.77c-.54.34-1.13.6-1.77.77l-.16.05a4.72 4.72 0 0 0-2.97 2.37ZM79 42.7a4.72 4.72 0 0 1 3.42-.38l.15.04a6.8 6.8 0 0 0 7.35-2.93 6.56 6.56 0 0 1-5.35.93l-.15-.04A4.73 4.73 0 0 0 79 42.7Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M14.17 243.94c-2.75 0-5.38-.48-7.91-1.44A16.74 16.74 0 0 1 0 238.47l5.99-6.1a10.54 10.54 0 0 0 3.63 2.9c1.54.74 3.05 1.12 4.55 1.12 1.53 0 2.78-.32 3.74-.96 1-.68 1.5-1.73 1.5-3.16 0-.93-.3-1.68-.91-2.25a6.37 6.37 0 0 0-2.35-1.5c-1-.42-2.53-.97-4.6-1.65a24.27 24.27 0 0 1-4.92-2.14 9.97 9.97 0 0 1-3.42-3.37 9.92 9.92 0 0 1-1.34-5.35c0-2.64.7-4.85 2.09-6.63a12.73 12.73 0 0 1 5.45-3.96 19.8 19.8 0 0 1 7.11-1.28c2.21 0 4.42.4 6.63 1.23 2.25.78 4.17 1.92 5.78 3.42l-5.83 6.15a8.22 8.22 0 0 0-3.05-2.35 8.4 8.4 0 0 0-3.69-.91c-1.42 0-2.67.3-3.74.9-1.04.58-1.55 1.54-1.55 2.9 0 .78.21 1.44.64 1.97.46.54 1.09.99 1.87 1.34.82.32 1.93.7 3.32 1.13a34.4 34.4 0 0 1 5.82 2.24c1.64.79 3.03 1.93 4.17 3.43a8.98 8.98 0 0 1 1.77 5.72c0 2.78-.68 5.11-2.03 7a11.94 11.94 0 0 1-5.3 4.23c-2.17.93-4.56 1.39-7.16 1.39Zm30.15-.32c-3.38 0-5.8-.82-7.27-2.46-1.46-1.64-2.2-3.98-2.2-7v-11.4h-4.27v-6.58h4.23v-6.95h8.6v6.95h6.26v6.58H43.4v10.32c0 1.29.25 2.23.75 2.84.5.6 1.36.9 2.57.9.43 0 .87-.03 1.34-.1.5-.07.9-.18 1.23-.32l.1 6.42c-.6.21-1.39.39-2.35.53-.93.18-1.84.27-2.73.27Zm17.49 0c-1.57 0-3.08-.27-4.54-.8a8.7 8.7 0 0 1-3.7-2.73 7.66 7.66 0 0 1-1.44-4.81c0-6 5.65-8.99 16.95-8.99h.16v-.43c0-1.25-.44-2.2-1.33-2.83a5.6 5.6 0 0 0-3.48-1.02c-1.21 0-2.4.27-3.58.8a10.8 10.8 0 0 0-3 1.93l-4.43-4.76a15.25 15.25 0 0 1 5.4-3.32c2.1-.78 4.26-1.17 6.47-1.17 2.95 0 5.32.5 7.1 1.5a8.47 8.47 0 0 1 3.91 4.6c.82 2.03 1.23 4.68 1.23 7.96v13.43h-8.02v-2.84h-.16a6.66 6.66 0 0 1-3.05 2.57c-1.39.6-2.89.9-4.49.9Zm2.2-5.88c1.74 0 3.1-.49 4.06-1.45.96-1 1.44-2.33 1.44-4.01v-.9h-1.12c-2.4 0-4.35.24-5.88.74-1.54.5-2.3 1.46-2.3 2.89 0 .93.37 1.62 1.12 2.08a5.3 5.3 0 0 0 2.67.65Zm37.07 5.99c-1.78 0-3.48-.38-5.08-1.13a8.64 8.64 0 0 1-3.64-3.1h-.1v3.48h-8.08v-40.44h8.77v16.64h.1c.86-1 1.99-1.84 3.38-2.52a10.28 10.28 0 0 1 4.75-1.07c2.5 0 4.7.65 6.58 1.93a12.3 12.3 0 0 1 4.44 5.08 15.78 15.78 0 0 1 1.55 6.95c0 2.53-.52 4.89-1.55 7.06-1 2.14-2.46 3.87-4.39 5.19a11.85 11.85 0 0 1-6.73 1.93Zm-2.09-7.28a5.85 5.85 0 0 0 5.56-3.48 8 8 0 0 0 0-6.73 5.84 5.84 0 0 0-5.56-3.48c-1.25 0-2.37.34-3.37 1.02a6.54 6.54 0 0 0-2.24 2.56 7.01 7.01 0 0 0-.8 3.27c0 1.17.26 2.3.8 3.36a6.64 6.64 0 0 0 2.24 2.52c.97.64 2.09.96 3.37.96Zm29.31 6.53h-8.87v-40.44h8.87v40.44Zm20.26.85c-2.71 0-5.19-.55-7.43-1.66a12.9 12.9 0 0 1-5.3-4.86 14.39 14.39 0 0 1-1.92-7.54c0-2.86.62-5.35 1.87-7.5a13.26 13.26 0 0 1 5.19-5.02 15.13 15.13 0 0 1 7.32-1.76c2.64 0 4.96.58 6.95 1.76a11.49 11.49 0 0 1 4.7 5.03 16.36 16.36 0 0 1 1.72 7.7c0 .96-.02 1.66-.06 2.09h-19.3c.07.96.41 1.83 1.02 2.62a6.8 6.8 0 0 0 2.35 1.76 7.3 7.3 0 0 0 3 .64c1.31 0 2.46-.25 3.42-.75 1-.5 1.81-1.17 2.46-2.03l6.1 3.85a12.9 12.9 0 0 1-5.03 4.23 16.32 16.32 0 0 1-7.06 1.44Zm5.02-17.22c0-.96-.2-1.82-.58-2.57-.4-.78-1-1.39-1.82-1.81a5.48 5.48 0 0 0-2.84-.7c-1.1 0-2.1.23-2.99.7-.9.46-1.6 1.08-2.14 1.87a4.89 4.89 0 0 0-.9 2.51h11.27Zm27.1 17.22c-2.82 0-5.37-.57-7.65-1.7a13.18 13.18 0 0 1-5.35-4.93 14.39 14.39 0 0 1-1.92-7.54c0-2.82.66-5.3 1.98-7.44a13.06 13.06 0 0 1 5.34-4.97 16 16 0 0 1 7.54-1.76c1.9 0 3.75.33 5.56 1.01 1.86.64 3.3 1.5 4.33 2.57l-5.07 5.88a4.82 4.82 0 0 0-2.04-1.55 6.21 6.21 0 0 0-2.62-.59 5.5 5.5 0 0 0-3.2.97 6.38 6.38 0 0 0-2.2 2.46 7.77 7.77 0 0 0-.75 3.42c0 1.25.25 2.39.75 3.42a6.4 6.4 0 0 0 2.2 2.46c.96.6 2.06.91 3.31.91.93 0 1.82-.18 2.67-.53a5.6 5.6 0 0 0 2.09-1.45l4.86 5.94a11.44 11.44 0 0 1-4.27 2.51c-1.75.6-3.6.91-5.56.91Zm26.72 0c-2.67 0-5.14-.59-7.43-1.76a13.44 13.44 0 0 1-5.34-5.03 14.15 14.15 0 0 1-1.98-7.49c0-2.81.66-5.3 1.98-7.43a13.18 13.18 0 0 1 5.34-4.92 16.17 16.17 0 0 1 7.44-1.71c2.7 0 5.18.57 7.43 1.7a13.1 13.1 0 0 1 5.4 4.93 13.88 13.88 0 0 1 1.98 7.43 13.86 13.86 0 0 1-7.38 12.52 15.78 15.78 0 0 1-7.43 1.76Zm.06-7.38c1.32 0 2.44-.32 3.37-.96a6.61 6.61 0 0 0 2.2-2.57 7.88 7.88 0 0 0 0-6.68 6.02 6.02 0 0 0-5.61-3.48c-1.33 0-2.47.32-3.44.96a6.36 6.36 0 0 0-2.13 2.52 8.02 8.02 0 0 0 .05 6.68 6.78 6.78 0 0 0 2.14 2.57c.96.64 2.1.96 3.42.96Zm32.87 19.36a25.4 25.4 0 0 1-7.32-1.12 19.19 19.19 0 0 1-6.36-3.05l4.38-6.26a13.53 13.53 0 0 0 8.82 3.37c2.5 0 4.37-.67 5.62-2.03 1.28-1.32 1.92-3.12 1.92-5.4v-1.6h-.16a8.86 8.86 0 0 1-3.37 2.62c-1.39.6-2.96.9-4.7.9-2.6 0-4.87-.62-6.8-1.87a12.37 12.37 0 0 1-4.43-5.03c-1-2.1-1.5-4.4-1.5-6.9 0-2.53.5-4.84 1.5-6.95a12.68 12.68 0 0 1 4.44-5.13 11.86 11.86 0 0 1 6.73-1.93c1.75 0 3.37.36 4.87 1.07a8.59 8.59 0 0 1 3.64 3.1h.1v-3.42H256v24.28c0 3.39-.64 6.22-1.93 8.5a11.87 11.87 0 0 1-5.45 5.14 18.58 18.58 0 0 1-8.29 1.71Zm.86-19.52a6.19 6.19 0 0 0 5.67-3.42c.53-1.07.8-2.23.8-3.48s-.27-2.39-.8-3.42a6.19 6.19 0 0 0-5.67-3.37c-1.28 0-2.4.3-3.37.9a5.98 5.98 0 0 0-2.14 2.47 7.77 7.77 0 0 0-.75 3.42 8 8 0 0 0 .75 3.43 6.37 6.37 0 0 0 2.14 2.5c.96.65 2.09.97 3.37.97Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={155.17}
          x2={74.72}
          y1={52.74}
          y2={130.83}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9866FF" />
          <stop offset={1} stopColor="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={126}
          x2={138}
          y1={70}
          y2={86}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F0F12" stopOpacity={0.1} />
          <stop offset={1} stopColor="#0F0F12" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={101.7}
          x2={180.76}
          y1={105.08}
          y2={26.01}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9866FF" />
          <stop offset={1} stopColor="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={82}
          x2={134}
          y1={138.8}
          y2={82.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9C6CFF" />
          <stop offset={1} stopColor="#925CFF" />
        </linearGradient>
        <linearGradient
          id="e"
          x1={129.87}
          x2={181.99}
          y1={72.68}
          y2={38.02}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AD85FF" />
          <stop offset={1} stopColor="#CEB7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
