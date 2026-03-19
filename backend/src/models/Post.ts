import mongoose, { Document, Schema } from "mongoose";

export interface IContentImage {
  url: string;
  caption?: string;
  position: "start" | "middle" | "end";
}

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  featured_image?: string;
  content_images?: IContentImage[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentImageSchema = new Schema<IContentImage>({
  url:      { type: String, required: true },
  caption:  { type: String },
  position: { type: String, enum: ["start", "middle", "end"], default: "middle" },
});

const PostSchema = new Schema<IPost>(
  {
    title:          { type: String, required: true },
    slug:           { type: String, required: true, unique: true },
    content:        { type: String, required: true },
    author:         { type: String, required: true },
    tags:           { type: [String], default: [] },
    published:      { type: Boolean, default: false },
    featured:       { type: Boolean, default: false },
    featured_image: { type: String },
    content_images: { type: [ContentImageSchema], default: [] },
  },
  { timestamps: true }
);

export const Post =
  mongoose.models["Post"] ?? mongoose.model<IPost>("Post", PostSchema);