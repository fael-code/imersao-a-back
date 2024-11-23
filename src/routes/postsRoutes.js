import express from "express";
import multer from "multer";
import { list_posts, postarNewPost, uploadImagem, updateNewPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOp = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});

//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOp));
    
    app.get("/posts", list_posts);
    app.post("/posts", postarNewPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    
    app.put("/upload/:id", updateNewPost);
}

export default routes;
