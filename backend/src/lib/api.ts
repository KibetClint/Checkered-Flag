const API_URL = import.meta.env.VITE_API_URL;

export interface ContentImage {
  url: string;
  caption?: string;
  position: "start" | "middle" | "end";
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
  featured_image?: string;
  content_images?: ContentImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Posts ───────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/api/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(
  id: string,
  data: Partial<Post>,
): Promise<Post> {
  const res = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

// ─── Contact ─────────────────────────────────────────────

export async function sendContactMessage(data: ContactMessage): Promise<void> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
}
