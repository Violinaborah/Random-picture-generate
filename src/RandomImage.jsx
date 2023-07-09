import React, { useEffect, useState } from 'react';
import './randomImage.scss';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function RandomImage() {
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const endpoint = 'https://picsum.photos/200/300'; 

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        setImageData(response.url);
        setImageUrl(response.url);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []); 

  const handleFacebookShare = () => {
    const shareUrl = imageUrl; 

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleTwitterShare = () => {
    const shareUrl = imageUrl; 

    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleWhatsAppShare = () => {
    const shareText = 'Check out this link: ';
    const shareUrl = imageUrl; 

    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`;

    window.open(whatsappUrl, '_blank');
  };

  if (!imageData) {
    return null; 
  }

  return (
    <div className="randomImage">
      <h1>Random Image from Picsum</h1>
      <div className="imageContainer">
        <img alt="" id="unsplashImage" src={imageData} />
      </div>
      <p className="imageDetails">
        Photo by <a id="creator" href="https://picsum.photos/">Picsum</a>!
      </p>
      <div className="shareOption">
        <span>Share</span>
        <div className="shareDetails">
          <button onClick={handleFacebookShare}>
            Facebook <FacebookOutlinedIcon />
          </button>
          <button onClick={handleTwitterShare}>
            Twitter <TwitterIcon />
          </button>
          <button onClick={handleWhatsAppShare}>
            WhatsApp <WhatsAppIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomImage;
