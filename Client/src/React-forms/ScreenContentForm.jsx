
import {useState} from 'react';
export default function ScreenContentForm(){
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const [imgUrl,setImgUrl]=useState("");

   
    return(
        <div>
        <input 
        type="text" 
        placeholder="Slide title" 
        value={title} onChange={(e)=>setTitle(e.target.value)}
       
        />
         <input 
        type="text" 
        placeholder="Enter Text" 
        value={text} onChange={(e)=>setText(e.target.value)}
       
        />
         <input 
        type="text" 
        placeholder="ImageUrl" 
        value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)}
       
        />
        
        </div>
    );



}