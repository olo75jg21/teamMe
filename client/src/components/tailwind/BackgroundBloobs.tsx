import { BackgroundBlob } from './BackgroundBlob';

export const BackgroundBlobs = (): JSX.Element => {
    return (
        <div>
            <BackgroundBlob topOffset={15} leftOffset={0} size={12} bgColorHex='#b2f7eb' />
            <BackgroundBlob topOffset={20} leftOffset={20} size={16} bgColorHex='#abcef7' />
            <BackgroundBlob topOffset={15} leftOffset={80} size={8} bgColorHex='#edc2ff' />
            <BackgroundBlob topOffset={40} leftOffset={85} size={14} bgColorHex='#eeffbf' />
            <BackgroundBlob topOffset={40} leftOffset={10} size={10} bgColorHex='#ebd9c0' />
        </div>
    )
};