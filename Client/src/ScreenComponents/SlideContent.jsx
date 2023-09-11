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
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetailedData = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(
        `http://localhost:3000/content/more/${contentId}`
      );

      const obj = res.data;
      setContent([obj]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDetailedData();
  }, [contentId]);

  const handleDelete = () => {
    setIsLoading(true);
    Axios.delete(`http://localhost:3000/content/${contentId}`).then(() => {
      setContent([]); // Delete successful, clear content data
      setIsLoading(false);
    });
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedContent(content[0]);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent({});
    fetchDetailedData();
  };

  const handleSaveEdit = () => {
    setIsLoading(true);
    Axios.put(`http://localhost:3000/content/edit/${contentId}`, editedContent)
      .then((res) => {
        setContent([res.data]);
        setIsLoading(false);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating content:", error);
      });
  };

  // console.log("this", content);

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

          <Button onClick={handleSaveEdit}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        content.map((c) => (
          <div key={c._id}>
            <h1>{c.slideTitle}</h1>
            <h4>{c.post}</h4>
            <h6>Created on: {c.createdAt}</h6>
            <Button onClick={handleDelete}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        ))
      )}
    </>
  );
}
