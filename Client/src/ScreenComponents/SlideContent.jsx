import { useParams } from "react-router-dom";
import ScreenPanel from "./ScreenPanel";
import Axios from "axios";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

export default function SlideContent() {
  const { contentId } = useParams();
  const [content, setContent] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:3000/content/more/${contentId}`)
      .then((res) => {
        console.log("RES.......", res);
        const obj = res.data;
        setContent([obj]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [contentId]);

  const handleDelete = () => {
    Axios.delete(`http://localhost:3000/content/${contentId}`).then(() => {
      setContent([]); // Delete successful, clear content data
    });
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedContent(content[0]);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent({});
    Axios.get(`http://localhost:3000/content/more/${contentId}`)
      .then((res) => {
        console.log("RES.......", res);
        const obj = res.data;
        setContent([obj]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSaveEdit = () => {
    Axios.put(`http://localhost:3000/content/edit/${contentId}`, editedContent)
      .then((res) => {
        setContent([res.data]);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating content:", error);
      });
  };

  console.log("this", content);

  return (
    <>
      <ScreenPanel />

      {editMode ? (
        <div>
          <TextField
            label="Slide Title"
            value={editedContent.slideTitle}
            onChange={(e) =>
              setEditedContent({ ...editedContent, slideTitle: e.target.value })
            }
          />
          <TextField
            label="Post"
            value={editedContent.post}
            onChange={(e) =>
              setEditedContent({ ...editedContent, post: e.target.value })
            }
          />

          <Button onClick={handleSaveEdit}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        content.map((c) => (
          <div key={c._id}>
            <h1>{c.slideTitle}</h1>
            <h4>{c.post}</h4>
            <h6>Created on: {c.createdAt}</h6>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        ))
      )}
    </>
  );
}
