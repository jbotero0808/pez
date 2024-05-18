import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
    idUser: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>({
    idUser: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model<IPost>("Post", postSchema);
module.exports = Post;
