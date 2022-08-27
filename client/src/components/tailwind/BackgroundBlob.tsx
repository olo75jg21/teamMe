interface BackgroundBlobProps {
  topOffset: number;
  leftOffset: number;
  width: number;
  height: number;
  bgColorHex: string;
}

// This component is used to render blured blobs in the backround, we can't specify dynamic 
// backround color in tailwind, so I used default style property.
// Use rem to specify size and offstes
export const BackgroundBlob = ({
  topOffset,
  leftOffset,
  width,
  height,
  bgColorHex }: BackgroundBlobProps): JSX.Element => {
  return (
    <div>
      <div
        className={`absolute rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob`}
        style={{
          backgroundColor: bgColorHex,
          top: `${topOffset}rem`,
          left: `${leftOffset}rem`,
          width: `${width}rem`,
          height: `${height}rem`
        }}
      />
    </div>
  );
};