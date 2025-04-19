// api/newsletter/newsletter.type.ts

export type NewsletterRequest = {
    title: string;
    content: string;
    contentImages: File[];  // Use File for handling image uploads
    excerpt: string;
    category: string;
    tags: string[];
    thumbnailUrl: File;  // Assuming the thumbnail is a single file upload
}
// api/newsletter/newsletter.type.ts

export type NewsletterResponse = {
    id: string;
    title: string;
    content: string;
    contentImages: string[];  // URLs or paths of images
    excerpt: string;
    author: string;
    category: string;
    tags: string[];
    thumbnailUrl: string;  // URL or path to the thumbnail image
    viewCount: number;
    likeCount: number;
    createdAt: string;  // ISO string format date
    updatedAt: string;  // ISO string format date
}
export type NewsletterLikeResponse = {
    newsletterId: string;
    userId: string;
    name: string;
    liked: boolean;
    totalLikes: number;
}