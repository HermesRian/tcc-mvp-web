import type { PetPost } from '../types/PetPost';
import './PetCard.css';

interface PetCardProps {
  post: PetPost;
}

export const PetCard = ({ post }: PetCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pet-card">
      {post.attachments.map((attachment) => (
        <div key={attachment.id} className="pet-card-content">
          <div className="pet-image-container">
            <img
              src={attachment.media.image.src}
              alt={attachment.description}
              className="pet-image"
              loading="lazy"
            />
          </div>
          
          <div className="pet-info">
            <p className="pet-description">{attachment.description}</p>
            
            <div className="pet-meta">
              <span className="pet-date">
                📅 {formatDate(post.createdAt)}
              </span>
            </div>
            
            <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pet-link"
            >
              Ver no Facebook →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
