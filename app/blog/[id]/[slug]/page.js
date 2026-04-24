import BlogPostClient from "./BlogPostClient";
import connectDB from "../../../../utils/mongodb";
import Blog from "../../../../models/Blog";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    
    if (!blog) {
      return {
        title: "Blog Not Found | Ritam Vaskar",
      };
    }

    return {
      title: `${blog.title} | Ritam Vaskar`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        url: `https://ritamvaskar.tech/blog/${blog._id}/${blog.slug}`,
        siteName: "Ritam Vaskar",
        images: [
          {
            url: blog.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: [blog.coverImage || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"],
      },
    };
  } catch (error) {
    return {
      title: "Blog | Ritam Vaskar",
    };
  }
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient params={params} />;
}
