import { useParams, useNavigate } from "react-router-dom"
import ScreenPanel from "./ScreenPanel"
import Axios from "axios"
import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material";

export default function SlideContent() {
    const { contentId } = useParams();
    console.log(contentId);
    const [content, setContent] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:3000/content/more/${contentId}`)
            .then((res) => {
                console.log("RES.......", res)
                const obj = res.data;
                setContent([obj]);
            })
            .catch(error => {
                console.error("Error fetching data:", error);

            });
    }, [contentId]);

    const handleDelete = () => {
        Axios.delete(`http://localhost:3000/content/${contentId}`);


    }

    console.log("this", content);


    return (
        <>
            <ScreenPanel />

            {content.map((c) => (
                <>
                    <h1>{c.slideTitle}</h1>
                    <h4>{c.post}</h4>
                    <h6>Created on:{c.createdAt}</h6>
                </>
            ))}

            <Button onClick={handleDelete}>Delete</Button>

        </>
    );


}