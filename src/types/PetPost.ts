export interface ImageMedia {
  height: number;
  src: string;
  width: number;
}

export interface Media {
  image: ImageMedia;
}

export interface Target {
  id: string;
  url: string;
}

export interface Attachment {
  id: number;
  description: string;
  media: Media;
  target: Target;
  type: string;
  url: string;
}

export interface PetPost {
  id: number;
  facebookPostId: string;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}
