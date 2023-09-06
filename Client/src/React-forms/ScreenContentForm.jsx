
import {useState} from 'react';
import Button from '../Button';
import "./ScreenContentForm.css"
export default function ScreenContentForm(id){
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const [imgUrl,setImgUrl]=useState("");
    const [Slides,setSlide]=useState("");

    const createSlide = (e) => {
        e.preventDefault();
    
        Axios.post(`http://localhost:3000/screens/${id}`, {
          title,
          text,
          imgUrl,
        }).then((response) => {
          setSlides([...Slides, { title, text,imgUrl }]);
        });
    
        setTitle("");
        setText("");
        setImgUrl("")
        // onToggleForm();
      };
    


    

   
    
    
    
    
    return(
        <div className='Form'>
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
        <Button>add</Button>
        </div>
    );



}