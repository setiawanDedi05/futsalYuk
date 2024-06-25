interface Props {
    width?: string;
    height?: string
}

export const Spacer = ({ width = "10px", height = '10px' }: Props) => {
    return (
        <div style={{ margin: `${height} ${width}` }}></div>
    );
}