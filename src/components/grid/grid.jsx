import { useState } from "react";
import Card from "../card/card";
import './grid.css'
import isWinner from "../../helpers/checkWinner";


function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn , setTurn] = useState(true);
    const [winner , setWinner] = useState(null);

    function play(index){
        if(turn == true) {
            board[index] = "O";
        }else{
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" :  "X");
        if(win ){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function restart(){
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""))
    }

    return (
        <div>
            {
                winner && (
                    <>
                        <h1 className="turn">Winner is : {winner}</h1>
                        <button className="restart" onClick={restart}>Reset</button>    
                    </>
                    
                )
            }
            
            {
                !winner && (
                    <>
                        <h1 className='turn'>Current Turn : {(turn) ? 'O' : 'X'}</h1>
            <div className="grid">
            {board.map((el, idx) => <Card key={idx} gameEnd={winner ? true : false} onPlay={play} player={el} index={idx}/>)}
            </div>
                    </>
                )
            }
        </div>
       
    )
}

export default Grid;