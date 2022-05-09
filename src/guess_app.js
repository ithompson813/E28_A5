import {useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./guess_css.css";


function GuessForm()
{

    // Define variables used to track game
    const [currGuess, setCurrGuess] = useState("");
    const [maxNumber, setMaxNumber] = useState(50);
    const [currAnswer, setCurrAnswer] = useState(Math.floor(Math.random() * maxNumber));
    const [currNumOfGuesses, setCurrNumOfGuesses] = useState(0);
    const [currGuessesAllowed, setCurrGuessesAllowed] = useState(5);
    const [wins, setWins] = useState(0);
    const [currTotalGuesses, setCurrTotalGuesses] = useState(0);
    const [currFeedback, setFeedback] = useState("");
    const [currGameState, setGameState] = useState("play");
    const [games, setGames] = useState(0);


    // creates navigation bar
    function Nav()
    {
        return (

            <ul>
                <li><Link to="/">Play</Link></li>
                <li><Link to="/stats">Stats</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>

        )
    }

    // HTML elements to return for Stats page
    function Stats()
    {

        // calculate stats
        let winRatio;
        let avgGuesses;

        if (games > 0)
        {
            winRatio = (wins/games).toFixed(2)*100;
            avgGuesses = (currTotalGuesses/games).toFixed(2);
        } else {
            winRatio = 0;
            avgGuesses = 0;
        }

        return (
            <table>
                <tbody>
                <tr>
                    <td>Wins</td>
                    <td>Games</td>
                    <td>Win/Lose Ratio</td>
                    <td>Avg Guesses</td>
                </tr>
                <tr>
                    <td>{wins}</td>
                    <td>{games}</td>
                    <td>{winRatio}%</td>
                    <td>{avgGuesses}</td>
                </tr>
                </tbody>
            </table>
        );
    }

    //for Settings page
    function Settings()
    {
        return (

            // settings form allows game variables to be updated only to positive numbers
            <form>
                Max number of guesses: 
                <input type='number' name="newAllowedGuess" onChange={(e) => 
                    {if (e.target.value > 0){setCurrGuessesAllowed(e.target.value)}}} value={currGuessesAllowed}/><br/>
                Max random number:
                <input type='number' name="newMax" onChange={(e) => 
                    {if (e.target.value > 0){setMaxNumber(e.target.value)}}} value={maxNumber}/><br/>
            </form>
        );
    }

    //Default html for game/homepage
    function Play()
    {
        if (currGameState === 'play')
        {
            return (
            <>   
                <form>
                    Number:
                    <input type='number' name="newGuess" onChange={(e) => setCurrGuess(e.target.value)} value={currGuess}/>
                    <button onClick = {(e) => makeGuess(e)}> Guess </button>
                    <button onClick = {(e) => Reset(e)}> Reset </button>
                </form>
                <p>Guesses so far: {currNumOfGuesses} </p>
                <p>Remaining Guesses: {currGuessesAllowed - currNumOfGuesses}</p>
                <p>{currFeedback}</p>
            </> 
            );
        } else {
            return (
                <>
                    <form>
                        <p>{currFeedback}</p>
                        <button onClick = {(e) => Reset(e)}> Play Again </button>
                    </form>
                </>
            );
        }
    }

    //html for 404 page
    function FourOhFour()
    {
        return <p>404: This page does not exist!</p>
    } 

    // higher or lower guess logic
    function makeGuess(e)
    {
        // do not reload page
        e.preventDefault();

        // only allow positive numbers
        if (currGuess >= 0)
        {
            setCurrNumOfGuesses(currNumOfGuesses + 1);
            setCurrTotalGuesses(currTotalGuesses + 1);

            // check guess outcome
            if (currGuess > currAnswer)
            {
                setFeedback(`Your guess of ${currGuess} is Higher`)
                setGameState("play");
            } else if (currGuess < currAnswer) {
                setFeedback(`Your guess of ${currGuess} is Lower`)
                setGameState("play");
            } else {
                // victory logic
                setWins(wins + 1);
                setGames(games + 1);
                setFeedback(`You win! ${currGuess} is Correct! Number of guesses: ${currNumOfGuesses + 1}`)
                setCurrGuess('');
                setGameState("gameover");
                // if the correct answer has been found, immediately return to prevent a gameover screen on final guess
                return;
            }

            setCurrGuess('');

            // gameover logic
            if (currGuessesAllowed - currNumOfGuesses - 1 <= 0)
            {
                setGames(games + 1);
                setFeedback(`Gameover! The answer was ${currAnswer}!`)
                setGameState("gameover");
            }

        } else {
            setFeedback("Please input a positive number.");
        }
    }

    // used to reset the game
    function Reset(e)
    {
        e.preventDefault();
        setCurrAnswer(Math.floor(Math.random() * maxNumber));
        setCurrNumOfGuesses(0);
        setFeedback("");
        setGameState("play");

    }

    return (
    <>
        <Nav />
        <Routes>
            <Route path="/" element={Play()} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={Settings()} />
            <Route path="/*" element={<FourOhFour />} />
        </Routes>
    </>
    );
}


export function GuessApp()
{

    return (
        <GuessForm />
    );

}
