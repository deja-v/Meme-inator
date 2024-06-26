import {useState,useEffect} from 'react'
import memesData from "./memesData.jsx"
import Loading from './Loading.jsx'
var i=0
export default function Meme(){

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://spaces-cdn.clipsafari.com/fonc3iaqjfz274m12cl81e9ottfv" 
    })

    const [allMemeImages, setAllMemeImages] = useState(memesData)

    useEffect(()=>{
        const asyncFn = async () => { 
                const res = await fetch("https://meme-api.com/gimme/1000")
                const data = await res.json()
                setAllMemeImages(data.memes)
         }
         
        asyncFn();

    },[])

    
    function getMemeImage() {
        const memesArray = allMemeImages
        // const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[i++].url
        if(i===memesArray.length){
            i=0
        }
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
        
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate an API call
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
  
    if (isLoading) {
      return <Loading />;
    }
  

    return (
        <main>
            <form className="form" action="">
                <div className="button-container">
                <button type="button" onClick={getMemeImage} className="form--button" >
                    <span className="front">
                    Get a new meme
                    </span>
                </button>
                </div>
                
            </form>
            
            {/* <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
            <div className="meme">
                <img className='meme--image' src={meme.randomImage} alt="" />
            </div>
            <footer>
                <p>&#169; Devang Jain</p>
            </footer>
            
        </main>
    )
}