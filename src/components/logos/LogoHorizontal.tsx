export default function LogoHorizontal({ width = 271 }: { width?: number }) {
  const baseWidth = 271;
  const baseHeight = 54;
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
        d="M1.6 41.47c-1.15 1.15-1.16 3.05.17 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77c.8.2 1.6-.26 1.81-1.05l.02-.05a2.14 2.14 0 0 1 2.1-1.53c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77a1.48 1.48 0 0 0 1.05-1.8l-.01-.05c-.25-.93.2-1.9 1.04-2.38a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l2.09-2.09a1.5 1.5 0 0 0 0-2.09l-.04-.03a2.16 2.16 0 0 1-.27-2.6 2.13 2.13 0 0 1 2.38-1.04h.04c.8.22 1.6-.25 1.81-1.04l.77-2.85c.2-.79-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.54-2.1c0-.97.6-1.85 1.54-2.1l.05-.02a1.48 1.48 0 0 0 1.05-1.8l-.77-2.86a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.74 17.74 0 0 0-2.8-3.63L1.62 41.47Z"
      />
      <path
        fill="url(#b)"
        d="M1.6 41.47c-1.15 1.15-1.16 3.05.17 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77c.8.2 1.6-.26 1.81-1.05l.02-.05a2.14 2.14 0 0 1 2.1-1.53c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77a1.48 1.48 0 0 0 1.05-1.8l-.01-.05c-.25-.93.2-1.9 1.04-2.38a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l2.09-2.09a1.5 1.5 0 0 0 0-2.09l-.04-.03a2.16 2.16 0 0 1-.27-2.6 2.13 2.13 0 0 1 2.38-1.04h.04c.8.22 1.6-.25 1.81-1.04l.77-2.85c.2-.79-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.54-2.1c0-.97.6-1.85 1.54-2.1l.05-.02a1.48 1.48 0 0 0 1.05-1.8l-.77-2.86a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.74 17.74 0 0 0-2.8-3.63L1.62 41.47Z"
      />
      <path
        fill="url(#c)"
        d="M4.74 11.2a1.48 1.48 0 0 1 0-2.1l2.09-2.08a1.48 1.48 0 0 1 2.08 0l.04.03c.68.68 1.76.76 2.6.27a2.13 2.13 0 0 0 1.04-2.37l-.01-.05c-.21-.79.26-1.6 1.04-1.8l2.85-.77c.8-.21 1.6.26 1.81 1.04l.02.05a2.14 2.14 0 0 0 2.1 1.54c.96 0 1.85-.6 2.1-1.54l.01-.05a1.48 1.48 0 0 1 1.81-1.04l2.85.76a1.48 1.48 0 0 1 1.05 1.81 2.2 2.2 0 0 0 1.08 2.45c.47.28.93.57 1.38.9 1.32.94 1.31 2.83.16 3.99L7.87 35.2a17.75 17.75 0 0 1-2.8-3.62 2.21 2.21 0 0 0-2.45-1.08c-.78.2-1.6-.26-1.8-1.05L.04 26.6c-.21-.79.26-1.6 1.04-1.8l.05-.02a2.14 2.14 0 0 0 1.54-2.1c0-.97-.6-1.86-1.54-2.1l-.05-.02a1.48 1.48 0 0 1-1.04-1.8L.8 15.9a1.48 1.48 0 0 1 1.81-1.04h.05c.93.26 1.9-.2 2.38-1.03.48-.84.4-1.92-.28-2.6l-.03-.04Z"
      />
      <path
        fill="url(#d)"
        fill-rule="evenodd"
        d="M5.36 10.57a1.48 1.48 0 0 1 0-2.09l1.5-1.5a1.5 1.5 0 0 0-.03.04L4.73 9.1a1.48 1.48 0 0 0 0 2.1l.04.03a2.16 2.16 0 0 1 .2 2.73c.28-.2.52-.45.7-.76.48-.83.41-1.91-.27-2.6l-.04-.03Zm-3.8 4.4c-.36.19-.63.52-.75.93l-.76 2.85c-.21.8.26 1.6 1.04 1.81l.05.01a2.14 2.14 0 0 1 1.54 2.1c0 .45-.13.89-.36 1.24.61-.39.99-1.1.99-1.86 0-.96-.6-1.85-1.54-2.1l-.05-.01a1.48 1.48 0 0 1-1.04-1.81l.76-2.85c.03-.11.07-.21.12-.3Zm-.77 9.94c-.6.31-.92 1-.74 1.69l.76 2.85a1.48 1.48 0 0 0 1.81 1.05 2.2 2.2 0 0 1 2.45 1.08c.76 1.3 1.69 2.51 2.8 3.62l-6.26 6.27c-1.16 1.15-1.17 3.05.16 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77a1.5 1.5 0 0 0 1.7-.74c-.32.16-.7.21-1.07.11L5.9 50a1.48 1.48 0 0 1-1.05-1.8 2.21 2.21 0 0 0-1.08-2.46 17.6 17.6 0 0 1-1.38-.89c-1.32-.95-1.31-2.84-.16-4l6.27-6.26a17.74 17.74 0 0 1-2.8-3.63 2.21 2.21 0 0 0-2.45-1.08c-.79.21-1.6-.25-1.81-1.04l-.76-2.85a1.5 1.5 0 0 1 .11-1.07Zm10.02 24.2a2.3 2.3 0 0 1 1.24-.36c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77c.42-.1.74-.39.93-.74-.1.05-.2.1-.3.12l-2.86.76c-.78.21-1.6-.25-1.8-1.04l-.02-.05a2.14 2.14 0 0 0-2.1-1.54 2.2 2.2 0 0 0-1.86.99Zm9.96-2.65.13-.08a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l.59-.59c-.58.54-1.49.53-2.05-.03l-.04-.04a2.16 2.16 0 0 0-2.6-.27c-.3.18-.56.42-.75.7Zm7.34-7.34a2.05 2.05 0 0 1 1.67-.28h.04c.68.2 1.38-.13 1.7-.73-.32.16-.7.22-1.07.12l-.05-.02a2.12 2.12 0 0 0-2.3.91Zm2.64-9.95c.17-.1.35-.19.55-.24l.05-.02c.41-.1.74-.38.93-.74-.1.05-.2.1-.3.12l-.06.01c-.5.14-.9.45-1.17.87Zm-7.5-26.72c-.35.18-.62.5-.74.92v.05c-.06.2-.15.39-.25.56.41-.27.73-.68.87-1.18v-.05l.13-.3Zm-9.93.76c-.6.31-.92 1.01-.74 1.7l.01.04c.16.59.03 1.19-.29 1.67.75-.5 1.15-1.41.92-2.3l-.02-.04a1.5 1.5 0 0 1 .12-1.07Z"
        clip-rule="evenodd"
      />
      <path
        fill="url(#e)"
        fill-rule="evenodd"
        d="M4.34 14.58c-.48.32-1.08.45-1.67.29l-.04-.01a1.48 1.48 0 0 0-1.7.74c.32-.17.7-.22 1.07-.12l.05.01c.88.24 1.79-.16 2.29-.9ZM1.7 24.54c-.17.1-.35.19-.55.24l-.05.01c-.42.11-.74.39-.93.74.1-.05.2-.09.3-.11l.05-.02c.5-.13.9-.45 1.18-.86Zm7.5 26.72c.34-.19.62-.51.73-.93l.02-.05c.05-.2.13-.38.24-.55-.42.27-.73.67-.87 1.18l-.01.05-.12.3Zm9.93-.76c.6-.32.92-1.01.74-1.7l-.01-.04a2.05 2.05 0 0 1 .29-1.67 2.12 2.12 0 0 0-.92 2.3l.01.04c.1.37.05.75-.11 1.07Zm6.45-3.78c.02 0 .03-.02.04-.03l2.09-2.09c.58-.58.58-1.51 0-2.09l-.04-.03a2.16 2.16 0 0 1-.19-2.73 2.3 2.3 0 0 0-.7.75c-.49.84-.41 1.92.27 2.6l.03.04c.58.57.58 1.5 0 2.08l-1.5 1.5Zm5.31-7.99c.35-.18.63-.5.74-.93l.77-2.85c.2-.78-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.53-2.1c0-.45.13-.88.36-1.24a2.2 2.2 0 0 0-.99 1.86c0 .97.6 1.85 1.54 2.1l.05.02a1.48 1.48 0 0 1 1.04 1.8l-.76 2.86-.12.3Zm.76-9.93c.6-.32.93-1.01.75-1.7l-.77-2.85a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.75 17.75 0 0 0-2.8-3.63l6.27-6.26c1.15-1.16 1.17-3.05-.16-4-.45-.32-.9-.61-1.38-.89a2.21 2.21 0 0 1-1.08-2.45c.21-.79-.26-1.6-1.04-1.8l-2.86-.77a1.48 1.48 0 0 0-1.69.74c.32-.17.7-.22 1.07-.12l2.85.77a1.48 1.48 0 0 1 1.05 1.8c-.26.96.22 1.96 1.08 2.46.47.27.93.57 1.37.89 1.33.94 1.32 2.84.17 3.99l-6.27 6.26a17.74 17.74 0 0 1 2.8 3.63 2.2 2.2 0 0 0 2.45 1.08c.79-.2 1.6.26 1.8 1.05l.77 2.85c.1.37.05.75-.12 1.07ZM21.63 4.6c-.35.23-.78.36-1.23.36-.96 0-1.85-.6-2.1-1.54l-.01-.05a1.48 1.48 0 0 0-1.81-1.04l-2.86.76c-.4.11-.74.4-.92.74.1-.05.2-.08.3-.11l2.85-.77c.79-.2 1.6.26 1.81 1.05l.01.05a2.14 2.14 0 0 0 2.1 1.53 2.2 2.2 0 0 0 1.86-.98Zm-9.95 2.64-.13.08c-.84.49-1.92.41-2.6-.27l-.03-.03a1.48 1.48 0 0 0-2.1 0l-.58.58a1.48 1.48 0 0 1 2.05.04l.04.03c.68.69 1.76.76 2.6.28.3-.18.56-.42.75-.7Z"
        clip-rule="evenodd"
      />
      <path
        fill="#DCDCEA"
        d="M62.88 43.52a18.9 18.9 0 0 1-6.79-1.24 14.37 14.37 0 0 1-5.36-3.44l5.13-5.23a9.04 9.04 0 0 0 3.12 2.47c1.32.65 2.62.97 3.9.97 1.32 0 2.39-.28 3.22-.83.85-.58 1.28-1.48 1.28-2.7 0-.8-.26-1.44-.78-1.93a5.47 5.47 0 0 0-2.02-1.29 49.7 49.7 0 0 0-3.94-1.42 20.84 20.84 0 0 1-4.22-1.84 8.56 8.56 0 0 1-2.94-2.89 8.51 8.51 0 0 1-1.15-4.59c0-2.26.6-4.16 1.8-5.69a10.92 10.92 0 0 1 4.67-3.4c1.93-.73 3.96-1.1 6.1-1.1 1.9 0 3.8.36 5.7 1.06a13.8 13.8 0 0 1 4.95 2.94l-5 5.28a7.05 7.05 0 0 0-2.62-2.02 7.2 7.2 0 0 0-3.17-.78 6.4 6.4 0 0 0-3.2.78c-.9.49-1.34 1.31-1.34 2.47 0 .68.19 1.24.55 1.7.4.46.94.84 1.6 1.15.71.28 1.66.6 2.85.96 1.96.58 3.63 1.23 5 1.93a9.65 9.65 0 0 1 3.58 2.94 7.7 7.7 0 0 1 1.52 4.9 10 10 0 0 1-1.75 6.02 10.24 10.24 0 0 1-4.54 3.63 15.4 15.4 0 0 1-6.15 1.19Zm25.88-.28c-2.9 0-4.99-.7-6.24-2.1-1.26-1.42-1.88-3.42-1.88-6.02v-9.77h-3.67V19.7h3.62v-5.96h7.39v5.96h5.36v5.65h-5.36v8.85c0 1.1.21 1.91.64 2.43.43.52 1.16.78 2.2.78.37 0 .75-.03 1.15-.09.43-.06.78-.15 1.05-.27l.1 5.5c-.53.19-1.2.34-2.02.46-.8.16-1.58.23-2.34.23Zm15 0c-1.34 0-2.64-.23-3.9-.69a7.47 7.47 0 0 1-3.16-2.34 6.57 6.57 0 0 1-1.24-4.13c0-5.14 4.85-7.7 14.54-7.7h.14V28a2.8 2.8 0 0 0-1.15-2.43 4.8 4.8 0 0 0-2.98-.88c-1.04 0-2.07.23-3.07.7-.98.42-1.84.97-2.57 1.64l-3.81-4.08a13.09 13.09 0 0 1 4.63-2.85c1.8-.67 3.66-1 5.55-1 2.54 0 4.58.42 6.1 1.28a7.27 7.27 0 0 1 3.35 3.95c.7 1.74 1.06 4.02 1.06 6.83V42.7h-6.88v-2.43h-.14a5.72 5.72 0 0 1-2.62 2.2 9.5 9.5 0 0 1-3.85.78Zm1.88-5.04c1.5 0 2.66-.42 3.49-1.24.83-.86 1.24-2 1.24-3.45v-.78h-.97c-2.05 0-3.73.22-5.04.65-1.32.42-1.97 1.25-1.97 2.47 0 .8.32 1.4.96 1.8.64.36 1.4.55 2.3.55Zm31.81 5.13c-1.52 0-2.98-.32-4.35-.96a7.43 7.43 0 0 1-3.12-2.66h-.1v2.98h-6.92V8h7.52v14.28h.1a8.84 8.84 0 0 1 2.88-2.16 8.82 8.82 0 0 1 4.09-.91 9.8 9.8 0 0 1 5.64 1.65 10.55 10.55 0 0 1 3.8 4.36 13.53 13.53 0 0 1 1.34 5.96 14 14 0 0 1-1.33 6.06 10.86 10.86 0 0 1-3.77 4.45 10.17 10.17 0 0 1-5.78 1.65Zm-1.78-6.24a5.02 5.02 0 0 0 4.77-2.98 6.86 6.86 0 0 0 0-5.78 5.02 5.02 0 0 0-4.78-2.98c-1.07 0-2.03.29-2.89.87a5.62 5.62 0 0 0-1.92 2.2 6.02 6.02 0 0 0-.7 2.8c0 1 .24 1.97.7 2.9a5.7 5.7 0 0 0 1.92 2.15c.83.55 1.8.82 2.9.82Zm25.14 5.61h-7.61V8h7.61v34.7Zm17.39.73a14.2 14.2 0 0 1-6.38-1.43 11.06 11.06 0 0 1-4.54-4.17c-1.1-1.84-1.66-4-1.66-6.47 0-2.45.54-4.6 1.6-6.43 1.11-1.86 2.6-3.3 4.46-4.31a13 13 0 0 1 6.28-1.52c2.27 0 4.26.5 5.97 1.52a9.86 9.86 0 0 1 4.04 4.31 14.05 14.05 0 0 1 1.46 6.61c0 .83-.01 1.42-.04 1.8h-16.56c.06.82.35 1.57.87 2.24a5.85 5.85 0 0 0 2.02 1.51c.82.37 1.68.55 2.57.55a6.3 6.3 0 0 0 2.93-.64 5.89 5.89 0 0 0 2.11-1.74l5.23 3.3a11.08 11.08 0 0 1-4.31 3.63 14 14 0 0 1-6.06 1.24Zm4.3-14.78a4.6 4.6 0 0 0-.5-2.2 3.5 3.5 0 0 0-1.56-1.56 4.7 4.7 0 0 0-2.43-.6c-.95 0-1.8.2-2.57.6-.76.4-1.38.93-1.83 1.6a4.2 4.2 0 0 0-.78 2.16h9.68Zm23.25 14.78c-2.41 0-4.6-.5-6.56-1.47a11.3 11.3 0 0 1-4.59-4.22c-1.1-1.84-1.65-4-1.65-6.47 0-2.42.57-4.55 1.7-6.38a11.21 11.21 0 0 1 4.59-4.27 13.72 13.72 0 0 1 6.47-1.52c1.62 0 3.2.3 4.77.88a9.3 9.3 0 0 1 3.71 2.2l-4.35 5.05c-.4-.55-.98-1-1.75-1.33a5.35 5.35 0 0 0-2.25-.5c-1.04 0-1.95.27-2.75.82a5.47 5.47 0 0 0-1.88 2.1 6.67 6.67 0 0 0-.64 2.95c0 1.07.21 2.05.64 2.93.46.89 1.09 1.6 1.88 2.11a5.78 5.78 0 0 0 5.14.32 4.8 4.8 0 0 0 1.79-1.23l4.17 5.09a9.8 9.8 0 0 1-3.67 2.16c-1.5.52-3.09.78-4.77.78Zm22.94 0c-2.3 0-4.42-.5-6.38-1.52a11.53 11.53 0 0 1-4.59-4.31c-1.13-1.87-1.7-4-1.7-6.43 0-2.41.57-4.54 1.7-6.38a11.3 11.3 0 0 1 4.59-4.22 13.87 13.87 0 0 1 6.38-1.47c2.32 0 4.45.5 6.37 1.47 1.96.98 3.5 2.39 4.64 4.23a11.91 11.91 0 0 1 1.7 6.37 11.9 11.9 0 0 1-6.34 10.74 13.53 13.53 0 0 1-6.37 1.52Zm.04-6.34c1.14 0 2.1-.27 2.9-.82a5.67 5.67 0 0 0 1.87-2.2 6.75 6.75 0 0 0 0-5.74 5.17 5.17 0 0 0-4.82-2.98c-1.12 0-2.1.27-2.93.82-.8.55-1.4 1.27-1.83 2.16a6.87 6.87 0 0 0 .04 5.73 5.82 5.82 0 0 0 1.84 2.2c.82.56 1.8.83 2.93.83Zm28.21 16.61a21.8 21.8 0 0 1-6.28-.96 16.48 16.48 0 0 1-5.47-2.61l3.77-5.37a11.31 11.31 0 0 0 7.57 2.89c2.14 0 3.74-.58 4.81-1.75 1.1-1.13 1.66-2.67 1.66-4.63v-1.38h-.14c-.74.95-1.7 1.7-2.9 2.25a10 10 0 0 1-4.03.78c-2.23 0-4.17-.53-5.83-1.6a10.62 10.62 0 0 1-3.8-4.32 13.64 13.64 0 0 1-1.29-5.92c0-2.17.43-4.16 1.29-5.96.88-1.84 2.15-3.3 3.8-4.4a10.18 10.18 0 0 1 5.78-1.66c1.5 0 2.9.3 4.18.92a7.36 7.36 0 0 1 3.12 2.66h.1V19.7h7.1v20.84c0 2.9-.55 5.33-1.65 7.3a10.2 10.2 0 0 1-4.68 4.4 15.95 15.95 0 0 1-7.11 1.47Zm.73-16.74a5.3 5.3 0 0 0 4.87-2.94c.46-.92.69-1.91.69-2.98a6.3 6.3 0 0 0-.7-2.94 5.3 5.3 0 0 0-4.86-2.9 5.3 5.3 0 0 0-2.89.79c-.8.52-1.4 1.22-1.83 2.1a6.66 6.66 0 0 0-.64 2.95c0 1.04.21 2.02.64 2.93.43.89 1.04 1.6 1.83 2.16.83.55 1.8.83 2.9.83Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="24.7"
          x2="-.4"
          y1="18.73"
          y2="43.09"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9866FF" />
          <stop offset="1" stop-color="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="15.6"
          x2="19.34"
          y1="24.12"
          y2="29.11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0F0F12" stop-opacity=".1" />
          <stop offset="1" stop-color="#0F0F12" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="8.02"
          x2="32.68"
          y1="35.06"
          y2="10.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9866FF" />
          <stop offset="1" stop-color="#C3A6FF" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="1.87"
          x2="18.09"
          y1="45.58"
          y2="28.11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9C6CFF" />
          <stop offset="1" stop-color="#925CFF" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="16.81"
          x2="33.07"
          y1="24.95"
          y2="14.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AD85FF" />
          <stop offset="1" stop-color="#CEB7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
