import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONNECTION);

export async function getTodos() {
    const db = conexao.db("Imersao-backend");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criar_post(novoPost) {
    const db = conexao.db("Imersao-backend");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function updatePost(id, new_post) {
    const db = conexao.db("Imersao-backend");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:new_post});
}
