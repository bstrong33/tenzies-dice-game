function Die(props) {

    const styles = {
        backgroundColor : props.rollable ? "white" : "#59E391"
    }

    return (
        <div 
            className="die-face" 
            onClick={() => props.toggleRollable(props.id)}
            style={styles}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die;