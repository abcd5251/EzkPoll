const PageJoinPoll = () => {

    const handleJoinPoll = () => {
        //pass
    }
    return (
        <div>
            <h1>Welcome to EzkPoll</h1>
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, alias!</small>
            <h3>{"{Poll Subject}"}</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Impedit doloremque, dignissimos, a eligendi libero,
                saepe nam velit porro repudiandae sequi dolorum fuga mollitia sit
                rerum dolore iste voluptas? Ipsum, quasi.
            </p>
            <small>{"{estimate poll time}"}</small>
            <button
                onClick={handleJoinPoll}
            >
                Join Poll
            </button>
        </div>
    )
}

export default PageJoinPoll;