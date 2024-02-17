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
      viewBox="0 0 256 256"
      fill="none"
    >
      <path
        fill="url(#a)"
        d="M78.45 132.87c-3.91 3.9-3.95 10.33.55 13.54a59.83 59.83 0 0 0 4.67 3.02c2.9 1.69 4.53 5.06 3.66 8.3a5 5 0 0 0 3.54 6.14l9.67 2.59a5 5 0 0 0 6.13-3.54l.05-.17c.84-3.16 3.85-5.21 7.12-5.21s6.28 2.05 7.13 5.2l.05.18a5 5 0 0 0 6.13 3.54l9.66-2.6a5 5 0 0 0 3.54-6.12l-.04-.16a7.23 7.23 0 0 1 3.54-8.06c2.84-1.63 6.5-1.39 8.81.93l.12.12a5 5 0 0 0 7.08 0l7.07-7.08a5 5 0 0 0 0-7.08l-.11-.12c-2.32-2.31-2.56-5.97-.93-8.8a7.23 7.23 0 0 1 8.06-3.55l.16.05a5 5 0 0 0 6.13-3.54l2.59-9.67a5 5 0 0 0-3.54-6.14l-.17-.04c-3.16-.85-5.21-3.85-5.21-7.13 0-3.27 2.05-6.28 5.2-7.12l.18-.05a5 5 0 0 0 3.54-6.13l-2.6-9.67a5 5 0 0 0-6.12-3.54c-3.25.87-6.62-.76-8.31-3.66a60.15 60.15 0 0 0-9.48-12.3l-77.87 77.87Z"
      />
      <path
        fill="url(#b)"
        d="M78.45 132.87c-3.91 3.9-3.95 10.33.55 13.54a59.83 59.83 0 0 0 4.67 3.02c2.9 1.69 4.53 5.06 3.66 8.3a5 5 0 0 0 3.54 6.14l9.67 2.59a5 5 0 0 0 6.13-3.54l.05-.17c.84-3.16 3.85-5.21 7.12-5.21s6.28 2.05 7.13 5.2l.05.18a5 5 0 0 0 6.13 3.54l9.66-2.6a5 5 0 0 0 3.54-6.12l-.04-.16a7.23 7.23 0 0 1 3.54-8.06c2.84-1.63 6.5-1.39 8.81.93l.12.12a5 5 0 0 0 7.08 0l7.07-7.08a5 5 0 0 0 0-7.08l-.11-.12c-2.32-2.31-2.56-5.97-.93-8.8a7.23 7.23 0 0 1 8.06-3.55l.16.05a5 5 0 0 0 6.13-3.54l2.59-9.67a5 5 0 0 0-3.54-6.14l-.17-.04c-3.16-.85-5.21-3.85-5.21-7.13 0-3.27 2.05-6.28 5.2-7.12l.18-.05a5 5 0 0 0 3.54-6.13l-2.6-9.67a5 5 0 0 0-6.12-3.54c-3.25.87-6.62-.76-8.31-3.66a60.15 60.15 0 0 0-9.48-12.3l-77.87 77.87Z"
      />
      <path
        fill="url(#c)"
        d="M89.07 30.22a5 5 0 0 1 0-7.08l7.07-7.07a5 5 0 0 1 7.08 0l.12.11c2.31 2.32 5.97 2.56 8.81.93a7.23 7.23 0 0 0 3.54-8.06l-.04-.16a5 5 0 0 1 3.53-6.13l9.67-2.59A5 5 0 0 1 135 3.71l.04.17c.85 3.16 3.85 5.21 7.13 5.21 3.27 0 6.28-2.05 7.13-5.2l.04-.18a5 5 0 0 1 6.13-3.54l9.67 2.6a5 5 0 0 1 3.54 6.12c-.87 3.25.76 6.62 3.67 8.31 1.59.93 3.14 1.93 4.66 3.02 4.5 3.21 4.46 9.63.55 13.54l-77.87 77.87a60.16 60.16 0 0 1-9.48-12.3c-1.69-2.9-5.06-4.53-8.3-3.66a5 5 0 0 1-6.14-3.54l-2.59-9.67a5 5 0 0 1 3.54-6.13l.17-.05c3.16-.84 5.21-3.85 5.21-7.12s-2.05-6.28-5.2-7.13l-.2-.03a5 5 0 0 1-3.54-6.13l2.6-9.67a5 5 0 0 1 6.12-3.54l.16.04c3.16.84 6.42-.7 8.06-3.54 1.63-2.84 1.39-6.5-.93-8.81l-.11-.12Z"
      />
      <path
        fill="url(#d)"
        fillRule="evenodd"
        d="m91.12 21.1-2.05 2.04a5 5 0 0 0 0 7.08l.11.12c2.32 2.31 2.56 5.97.93 8.81l-.28.44a7.7 7.7 0 0 0 2.4-2.56c1.63-2.83 1.38-6.5-.93-8.8l-.12-.12a5 5 0 0 1-.06-7.01ZM78.28 43.05a5 5 0 0 0-2.52 3.14l-2.59 9.67a5 5 0 0 0 3.54 6.13l.17.04c3.16.85 5.21 3.86 5.21 7.13 0 1.51-.44 2.97-1.22 4.18a7.47 7.47 0 0 0 3.34-6.3c0-3.27-2.05-6.28-5.21-7.12l-.17-.05a5 5 0 0 1-3.54-6.13l2.59-9.67c.1-.36.23-.7.4-1.02Zm-2.6 33.68a5 5 0 0 0-2.5 5.73l2.58 9.67a5 5 0 0 0 6.13 3.54c3.25-.87 6.62.76 8.31 3.67a60.17 60.17 0 0 0 9.48 12.3l2.12-2.13a60.11 60.11 0 0 1-9.48-12.3c-1.7-2.9-5.06-4.53-8.31-3.66a5 5 0 0 1-6.13-3.54l-2.6-9.67a4.99 4.99 0 0 1 .4-3.61Zm4.8 54.1-2.03 2.04c-3.91 3.9-3.95 10.33.55 13.54a59.53 59.53 0 0 0 4.67 3.02c2.9 1.69 4.53 5.06 3.66 8.3a5 5 0 0 0 3.54 6.14l9.67 2.59a5 5 0 0 0 5.73-2.52 4.99 4.99 0 0 1-3.61.4l-9.67-2.59a5 5 0 0 1-3.54-6.13c.87-3.25-.76-6.62-3.67-8.3a59.85 59.85 0 0 1-4.67-3.02c-4.46-3.2-4.46-9.55-.63-13.46Zm29.17 27.94a7.72 7.72 0 0 1 4.2-1.23c3.27 0 6.27 2.05 7.12 5.21l.04.17a5 5 0 0 0 6.13 3.54l9.67-2.6a4.99 4.99 0 0 0 3.15-2.5 5 5 0 0 1-1.03.4l-9.67 2.58a5 5 0 0 1-6.13-3.54l-.05-.17c-.84-3.16-3.85-5.2-7.12-5.2a7.47 7.47 0 0 0-6.3 3.34Zm33.75-8.97.45-.28c2.84-1.63 6.5-1.38 8.81.93l.12.12a5 5 0 0 0 7.08 0l7.07-7.08.06-.06-5.02 5.02a5 5 0 0 1-7.08 0l-.11-.11c-2.32-2.32-5.98-2.57-8.81-.93a7.7 7.7 0 0 0-2.56 2.4Zm24.88-24.88a6.93 6.93 0 0 1 5.67-.98l.16.05a5 5 0 0 0 5.73-2.52 4.99 4.99 0 0 1-3.62.4l-.15-.04c-3-.8-6.08.54-7.78 3.1Zm8.97-33.75c.56-.36 1.2-.64 1.87-.82l.17-.05a5 5 0 0 0 3.14-2.51c-.32.16-.66.3-1.03.4l-.17.04a6.86 6.86 0 0 0-3.98 2.94Zm-18.82-38.29 19.12-19.12.1-.1-19.22 19.22ZM151.84.58a5 5 0 0 0-2.51 3.13l-.05.17c-.18.68-.46 1.3-.82 1.87a6.85 6.85 0 0 0 2.94-3.98l.05-.17c.1-.37.23-.7.4-1.03Zm-33.68 2.58a4.98 4.98 0 0 0-.4 3.62l.04.15c.8 3-.54 6.07-3.09 7.78a6.94 6.94 0 0 0 .98-5.66l-.04-.16a5 5 0 0 1 2.51-5.73Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#e)"
        fillRule="evenodd"
        d="m89.02 23.19.05-.05 7.07-7.07a5 5 0 0 1 7.08 0l.12.11c2.31 2.32 5.97 2.56 8.81.93l.45-.28a7.71 7.71 0 0 1-2.56 2.4c-2.84 1.63-6.5 1.38-8.82-.94l-.11-.11a5 5 0 0 0-7.08 0l-5 5Zm-1.3 18.52a6.93 6.93 0 0 1-5.67.98l-.16-.04a5 5 0 0 0-5.73 2.51 4.99 4.99 0 0 1 3.62-.4l.15.04c3 .8 6.08-.54 7.79-3.1Zm-8.97 33.75c-.56.36-1.2.64-1.87.82l-.17.05a5 5 0 0 0-3.14 2.51c.32-.16.66-.3 1.03-.4l.17-.04a6.86 6.86 0 0 0 3.98-2.94Zm18.82 38.29-19.12 19.12-.06.06 19.18-19.18Zm6.59 52.3a5 5 0 0 0 2.51-3.13l.05-.17c.18-.68.46-1.3.82-1.87a6.86 6.86 0 0 0-2.94 3.98l-.04.17c-.1.37-.23.7-.4 1.03Zm33.68-2.58a5 5 0 0 0 2.51-5.73l-.04-.16c-.53-2-.11-4.02.98-5.66a7.18 7.18 0 0 0-3.1 7.78l.05.15a4.98 4.98 0 0 1-.4 3.62Zm27.02-17.91 2.07-2.07a5 5 0 0 0 0-7.08l-.11-.12c-2.32-2.31-2.56-5.97-.93-8.8l.28-.45a7.69 7.69 0 0 0-2.39 2.56c-1.64 2.83-1.39 6.5.93 8.8l.11.12a5 5 0 0 1 .04 7.04Zm12.86-21.98a5 5 0 0 0 2.52-3.13l2.59-9.67a5 5 0 0 0-3.54-6.14l-.17-.04c-3.16-.85-5.21-3.85-5.21-7.13 0-1.51.44-2.97 1.22-4.19a7.47 7.47 0 0 0-3.34 6.3c0 3.28 2.05 6.29 5.21 7.13l.18.05a5 5 0 0 1 3.53 6.13l-2.59 9.67c-.1.36-.23.7-.4 1.02Zm2.6-33.68a5 5 0 0 0 2.5-5.73l-2.58-9.67a5 5 0 0 0-6.13-3.54c-3.25.87-6.62-.75-8.31-3.66a60.18 60.18 0 0 0-9.48-12.3l-2.12 2.11a60.15 60.15 0 0 1 9.48 12.3c1.7 2.91 5.06 4.54 8.31 3.67a5 5 0 0 1 6.13 3.54l2.6 9.67a4.99 4.99 0 0 1-.4 3.61Zm-4.82-54.08 2.05-2.06c3.91-3.9 3.95-10.33-.55-13.54a59.61 59.61 0 0 0-4.66-3.02c-2.91-1.69-4.54-5.06-3.67-8.3a5 5 0 0 0-3.54-6.14L155.46.17a5 5 0 0 0-5.73 2.52 4.99 4.99 0 0 1 3.62-.4l9.67 2.59a5 5 0 0 1 3.54 6.13c-.88 3.25.75 6.62 3.66 8.3 1.6.93 3.15 1.94 4.67 3.02 4.48 3.2 4.46 9.57.6 13.49ZM146.35 7.86a7.72 7.72 0 0 1-4.2 1.23c-3.27 0-6.27-2.05-7.12-5.2L135 3.7a5 5 0 0 0-6.14-3.54l-9.66 2.6a5 5 0 0 0-3.14 2.5c.32-.16.66-.3 1.02-.4l9.67-2.58a5 5 0 0 1 6.13 3.54l.05.17c.84 3.16 3.85 5.2 7.12 5.2a7.47 7.47 0 0 0 6.3-3.34Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M14.17 244.03c-2.75 0-5.38-.48-7.91-1.45a16.74 16.74 0 0 1-6.26-4l5.99-6.1a10.54 10.54 0 0 0 3.63 2.88c1.54.75 3.05 1.13 4.55 1.13 1.53 0 2.78-.32 3.74-.97 1-.67 1.5-1.73 1.5-3.15 0-.93-.3-1.68-.91-2.25a6.36 6.36 0 0 0-2.35-1.5c-1-.42-2.53-.98-4.6-1.65a24.27 24.27 0 0 1-4.92-2.14 9.98 9.98 0 0 1-3.42-3.37 9.92 9.92 0 0 1-1.34-5.35c0-2.64.7-4.85 2.09-6.63a12.73 12.73 0 0 1 5.45-3.96 19.8 19.8 0 0 1 7.11-1.28c2.21 0 4.42.4 6.63 1.23 2.25.78 4.17 1.92 5.78 3.42l-5.83 6.15a8.21 8.21 0 0 0-3.05-2.35 8.4 8.4 0 0 0-3.69-.91c-1.42 0-2.67.3-3.74.9-1.04.58-1.55 1.54-1.55 2.9 0 .78.21 1.44.64 1.97.46.54 1.09.98 1.87 1.34.82.32 1.93.7 3.32 1.12 2.28.68 4.22 1.43 5.82 2.25 1.64.78 3.03 1.93 4.17 3.42a8.99 8.99 0 0 1 1.77 5.73c0 2.78-.68 5.11-2.03 7a11.94 11.94 0 0 1-5.3 4.23 18.08 18.08 0 0 1-7.16 1.39Zm30.15-.33c-3.38 0-5.8-.81-7.27-2.45-1.46-1.64-2.2-3.98-2.2-7v-11.4h-4.27v-6.58h4.23v-6.95h8.6v6.95h6.26v6.58H43.4v10.32c0 1.29.25 2.23.75 2.84.5.6 1.36.9 2.57.9.43 0 .87-.03 1.34-.1.5-.07.9-.18 1.23-.32l.1 6.41c-.6.22-1.39.4-2.35.54-.93.18-1.84.27-2.73.27Zm17.49 0c-1.57 0-3.08-.26-4.54-.8a8.7 8.7 0 0 1-3.7-2.72 7.66 7.66 0 0 1-1.44-4.82c0-5.99 5.65-8.98 16.95-8.98h.16v-.43c0-1.25-.44-2.2-1.33-2.83a5.6 5.6 0 0 0-3.48-1.02c-1.21 0-2.4.27-3.58.8a10.8 10.8 0 0 0-3 1.93l-4.43-4.76a15.24 15.24 0 0 1 5.4-3.32c2.1-.78 4.26-1.18 6.47-1.18 2.95 0 5.32.5 7.1 1.5a8.47 8.47 0 0 1 3.91 4.6c.82 2.04 1.23 4.7 1.23 7.97v13.43h-8.02v-2.84h-.16a6.67 6.67 0 0 1-3.05 2.57c-1.39.6-2.89.9-4.49.9Zm2.2-5.88c1.74 0 3.1-.48 4.06-1.44.96-1 1.44-2.34 1.44-4.01v-.91h-1.12c-2.4 0-4.35.25-5.88.75-1.54.5-2.3 1.46-2.3 2.89 0 .92.37 1.62 1.12 2.08a5.3 5.3 0 0 0 2.67.64Zm37.07 5.99c-1.78 0-3.48-.37-5.08-1.12a8.64 8.64 0 0 1-3.64-3.1h-.1v3.48h-8.08v-40.44h8.77v16.63h.1c.86-1 1.99-1.83 3.38-2.5a10.27 10.27 0 0 1 4.75-1.08c2.5 0 4.7.64 6.58 1.93a12.3 12.3 0 0 1 4.44 5.08 15.78 15.78 0 0 1 1.55 6.95c0 2.53-.52 4.89-1.55 7.06-1 2.14-2.46 3.87-4.39 5.19a11.85 11.85 0 0 1-6.73 1.92Zm-2.09-7.27a5.85 5.85 0 0 0 5.56-3.48 8 8 0 0 0 0-6.74 5.85 5.85 0 0 0-5.56-3.47c-1.25 0-2.37.34-3.37 1.02a6.54 6.54 0 0 0-2.24 2.56 7.01 7.01 0 0 0-.8 3.26c0 1.18.26 2.3.8 3.37a6.64 6.64 0 0 0 2.24 2.52c.97.64 2.09.96 3.37.96Zm29.31 6.53h-8.87v-40.44h8.87v40.44Zm20.26.85c-2.71 0-5.19-.55-7.43-1.66a12.88 12.88 0 0 1-5.3-4.86 14.38 14.38 0 0 1-1.92-7.55c0-2.85.62-5.34 1.87-7.48a13.26 13.26 0 0 1 5.19-5.03 15.13 15.13 0 0 1 7.32-1.77c2.64 0 4.96.6 6.95 1.77a11.49 11.49 0 0 1 4.7 5.03 16.36 16.36 0 0 1 1.72 7.7c0 .96-.02 1.66-.06 2.09h-19.3c.07.96.41 1.83 1.02 2.62a6.82 6.82 0 0 0 2.35 1.76 7.3 7.3 0 0 0 3 .64c1.31 0 2.46-.25 3.42-.75 1-.5 1.81-1.17 2.46-2.03l6.1 3.85a12.9 12.9 0 0 1-5.03 4.23 16.3 16.3 0 0 1-7.06 1.44Zm5.02-17.22c0-.96-.2-1.82-.58-2.57-.4-.78-1-1.39-1.82-1.82a5.47 5.47 0 0 0-2.84-.7c-1.1 0-2.1.24-2.99.7-.9.47-1.6 1.1-2.14 1.88a4.89 4.89 0 0 0-.9 2.51h11.27Zm27.1 17.22c-2.82 0-5.37-.57-7.65-1.71a13.17 13.17 0 0 1-5.35-4.92 14.38 14.38 0 0 1-1.92-7.54c0-2.82.66-5.3 1.98-7.44a13.06 13.06 0 0 1 5.34-4.97 16 16 0 0 1 7.54-1.77c1.9 0 3.75.34 5.56 1.02 1.86.64 3.3 1.5 4.33 2.57l-5.07 5.88a4.82 4.82 0 0 0-2.04-1.55 6.21 6.21 0 0 0-2.62-.59 5.5 5.5 0 0 0-3.2.97 6.38 6.38 0 0 0-2.2 2.45 7.77 7.77 0 0 0-.75 3.43c0 1.25.25 2.39.75 3.42a6.38 6.38 0 0 0 2.2 2.46c.96.6 2.06.91 3.31.91a6.9 6.9 0 0 0 2.67-.53 5.6 5.6 0 0 0 2.09-1.45l4.86 5.94a11.43 11.43 0 0 1-4.27 2.51c-1.75.6-3.6.91-5.56.91Zm26.72 0c-2.67 0-5.14-.59-7.43-1.76a13.43 13.43 0 0 1-5.34-5.03 14.15 14.15 0 0 1-1.98-7.49c0-2.82.66-5.3 1.98-7.43a13.18 13.18 0 0 1 5.34-4.92 16.17 16.17 0 0 1 7.44-1.72c2.7 0 5.18.58 7.43 1.72a13.1 13.1 0 0 1 5.4 4.92 13.87 13.87 0 0 1 1.98 7.43 13.86 13.86 0 0 1-7.38 12.52 15.76 15.76 0 0 1-7.43 1.76Zm.06-7.38c1.32 0 2.44-.32 3.37-.96a6.62 6.62 0 0 0 2.2-2.57 7.88 7.88 0 0 0 0-6.69 6.03 6.03 0 0 0-5.61-3.48c-1.33 0-2.47.33-3.44.97a6.37 6.37 0 0 0-2.13 2.51 8.02 8.02 0 0 0 .05 6.7 6.79 6.79 0 0 0 2.14 2.56c.96.64 2.1.96 3.42.96Zm32.87 19.36c-2.38 0-4.83-.37-7.32-1.12a19.2 19.2 0 0 1-6.36-3.05l4.38-6.26a13.53 13.53 0 0 0 8.82 3.37c2.5 0 4.37-.68 5.62-2.03 1.28-1.32 1.92-3.12 1.92-5.4v-1.6h-.16a8.86 8.86 0 0 1-3.37 2.61c-1.39.61-2.96.91-4.7.91-2.6 0-4.87-.62-6.8-1.87a12.38 12.38 0 0 1-4.43-5.03c-1-2.1-1.5-4.4-1.5-6.9 0-2.53.5-4.84 1.5-6.95a12.68 12.68 0 0 1 4.44-5.13 11.86 11.86 0 0 1 6.73-1.93c1.75 0 3.37.36 4.87 1.07a8.59 8.59 0 0 1 3.64 3.1h.1v-3.42H256v24.28c0 3.39-.64 6.22-1.93 8.5a11.87 11.87 0 0 1-5.45 5.14 18.58 18.58 0 0 1-8.29 1.71Zm.86-19.52a6.19 6.19 0 0 0 5.67-3.42c.53-1.07.8-2.23.8-3.48s-.27-2.39-.8-3.42a6.18 6.18 0 0 0-5.67-3.37c-1.28 0-2.4.3-3.37.9a5.98 5.98 0 0 0-2.14 2.47 7.77 7.77 0 0 0-.75 3.42 8 8 0 0 0 .75 3.42 6.36 6.36 0 0 0 2.14 2.52c.96.64 2.09.96 3.37.96Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={156.74}
          x2={71.64}
          y1={55.78}
          y2={138.38}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9866FF" />
          <stop offset={1} stopColor="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={125.89}
          x2={138.58}
          y1={74.04}
          y2={90.96}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F0F12" stopOpacity={0.1} />
          <stop offset={1} stopColor="#0F0F12" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={100.18}
          x2={183.81}
          y1={111.14}
          y2={27.51}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9866FF" />
          <stop offset={1} stopColor="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={79.35}
          x2={134.35}
          y1={146.81}
          y2={87.58}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9C6CFF" />
          <stop offset={1} stopColor="#925CFF" />
        </linearGradient>
        <linearGradient
          id="e"
          x1={129.98}
          x2={185.11}
          y1={76.87}
          y2={40.21}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AD85FF" />
          <stop offset={1} stopColor="#CEB7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
