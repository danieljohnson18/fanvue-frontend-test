import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Paper,
  Box,
  Typography,
  Link,
  Grid,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";

type CommentApiResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const Comments: NextPage = () => {
  const { query } = useRouter();
  const id = query.comments;
  const [comments, setComments] = useState<CommentApiResponse[]>([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      setComments(res.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div>
      <Head>
        <title>Comments Page</title>
      </Head>
      <Grid container spacing={1}>
        {comments.map((comment) => (
          <Grid item xs={6} md={6} key={comment.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {comment.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {comment.email}
                </Typography>

                <Typography variant="body2">{comment.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Comments;
