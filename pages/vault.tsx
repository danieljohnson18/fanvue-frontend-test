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
  CardMedia,
  Modal,
} from "@mui/material";
import Image from "next/image";

type VaultApiResponse = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Vault: NextPage = () => {
  const [photos, setPhotos] = useState<VaultApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchPhotos = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=50`
      );
      setPhotos(res.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Head>
        <title>Vaults Page</title>
      </Head>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Grid container spacing={1}>
          {photos.map((photos) => (
            <Grid item xs={6} md={4} key={photos.id}>
              <Card sx={{ maxWidth: 345 }}>
                <Button onClick={handleOpen}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={photos.thumbnailUrl}
                    alt={photos.title}
                  />
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <CardMedia
                      component="img"
                      height="500"
                      image={photos.url}
                      alt={photos.title}
                    />
                  </Box>
                </Modal>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {photos.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Vault;
