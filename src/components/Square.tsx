import '../components/Square.css'

interface SquareProps {
    onClick: () => void,
    initialValue: string,
}
export default (props: SquareProps) => {
    return (
        <div className="square__block" onClick={props.onClick}>{props.initialValue}</div>
    );

}



