import fs from "fs"
import { getTodos, criar_post, updatePost } from "../models/postModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function list_posts(req,res){
    const posts = await getTodos();
    res.status(200).json(posts)
}

export async function postarNewPost(req, res) {
    const new_post = req.body;
    try {
        const postCriado = await criar_post(new_post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const new_post = req.body;
    try {
        const postCriado = await criar_post(new_post);
        const upadted_img = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, upadted_img);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const imagemUrl = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descrip = await gerarDescricaoComGemini(imgBuffer);
        
        const post = {
            imgUrl: imagemUrl,
            descricao: descrip,
            alt: req.body.alt
        }
        
        const postCriado = await updatePost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}