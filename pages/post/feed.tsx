import { useState, useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import axios from "axios";
import Head from "next/head";

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

type FeedApiResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const Feed: NextPage = () => {
  const [feed, setFeed] = useState<FeedApiResponse[]>([]);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setFeed(res.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Head>
        <title>Feeds Page</title>
      </Head>
      <Grid container spacing={1}>
        {feed.map((post) => (
          <Grid item xs={6} md={4} key={post.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {post.title}
                </Typography>

                <Typography variant="body2">{post.body}</Typography>
              </CardContent>
              <NextLink href={`/post/${post.id}`} passHref>
                <CardActions>
                  <Button size="small">View Comments</Button>
                </CardActions>
              </NextLink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Feed;
