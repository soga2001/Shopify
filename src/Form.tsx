import React, {useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import {Responses} from './Responses';
import { Response } from './Interfaces';


export function Form() {

    const [data, setData] = useStateIfMounted<Response[]>([]);
    const dat: Response[] = [];
    const [order, setOrder] = useStateIfMounted<number>(1);
    const [posting, setPosting] = useStateIfMounted<boolean>(false);

    const submitForm = async (e: any) => {
        e.preventDefault();
        setPosting(true);
        const newData = {
            prompt: (document.getElementById("text") as HTMLInputElement).value,
            temperature: 0,
            max_tokens: 128
        };
        const fetchData = fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API}`,
            },
            body: JSON.stringify(newData),
        }).then((res) => res.json())
        .then(result => {
            result.prompt = newData.prompt;
            if(order === 1) {
                setData((prev) => [result, ...prev]);
            }
            else {
                setData((prev) => [...prev, result]);
            }
            (document.getElementById('text') as HTMLInputElement).value = '';
            setPosting(false);
        }).catch((err) => console.log(err));
    }

    // For sort option:
    const handleChange = (e: any) => {
        if(e.target.value !== order){
            setData(data.reverse())
        }
        if(order === 1) {
            setOrder(2)
        }
        else{
            setOrder(1)
        }
    }

    // When user leaves/reloads the page
    window.onbeforeunload = function() {
        // Create a local storage that contains all the data
        if(order === 1) {
            localStorage.setItem("data", JSON.stringify(data));
        }
        else{
            localStorage.setItem("data", JSON.stringify(data.reverse()))
        }
        
    }

    // When page is loaded
    window.onload = function() {
        const local = localStorage.getItem("data")
        if(local) {
            setData(JSON.parse(local))
        }
        localStorage.removeItem("data");
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <input id="text" placeholder="Type word(s) or pick a preset one" list='default' required/>
                <datalist id="default">
                    <option value={"Cat"}/>
                    <option value={"Dog"}/>
                    <option value={"Ocean"}/>
                    <option value={"Space"}/>
                    <option value={"Milky Way Galaxy"}/>
                </datalist>
                <div className='submit'> 
                    <span></span>
                    <button type="submit" className='submitButton' disabled={posting}>{posting ? "Posting..." : "Submit"}</button>
                </div>
            </form>
            <div>
                <h2>Responses</h2>
                <div id='options'>
                    <button onClick={() => setData([])} className={"remove" + (data.length === 0 ? "Disabled" : "Enabled")} disabled={data.length === 0}>Remove All Responses</button>
                    <select onChange={handleChange} defaultValue={1}>
                        <option value={1}>Newest to Oldest</option>
                        <option value={2}>Oldest to Newest</option>
                    </select>
                </div>
                {data && data.map(item => (
                    <Responses key={item.id}  item={item} />
                ))}
                <div>
                    <h5>There are no more responses.</h5>
                </div>
            </div>
        </div>
    )
}