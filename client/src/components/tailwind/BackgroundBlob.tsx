interface BackgroundBlobProps {
  topOffset: number;
  leftOffset: number;
  size: number;
  bgColorHex: string;
}

// This component is used to render blured blobs in the backround
// Use rem to specify size and offstes
export const BackgroundBlob = ({
  topOffset,
  leftOffset,
  size,
  bgColorHex }: BackgroundBlobProps): JSX.Element => {
  return (
    <div>
      <div
        className={`absolute rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob`}
        style={{
          backgroundColor: bgColorHex,
          top: `${topOffset}rem`,
          left: `${leftOffset}rem`,
          width: `${size}rem`,
          height: `${size}rem`
        }}
      />
    </div>
  );
};