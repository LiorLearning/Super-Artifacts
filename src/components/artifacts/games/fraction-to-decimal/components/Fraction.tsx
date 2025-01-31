

function Fraction({ numerator, denominator, className, fontcolor='gray-800' }: { numerator: any, denominator: any, className?: string, fontcolor?: string }) {
    return (
        <div className={`gap-2 flex items-center ${className}`}>
            <div className="flex flex-col justify-center items-center">
                <div className={`text-${fontcolor}`}>{numerator}</div>
                <div className={`border-t-2 border-${fontcolor} w-full mb-1`}></div>
                <div className={`text-${fontcolor}`}>{denominator}</div>
            </div>
        </div>
    );
}

Fraction.defaultProps = {
    numerator: 0,
    denominator: 1,
    className: 'text-4xl'
};

export default Fraction;