import React from "react";

interface IndexHeroActuProps {
  image: string;
  link: string;
  buttonText?: string;
  className?: string;
}

const IndexHeroActu: React.FC<IndexHeroActuProps> = ({
  image,
  link,
  buttonText = "Voir",
  className = "",
}) => (
  <div className={`gallery__item ${className}`}>
	<img src={image} alt="" />
    <a href={link} className="gallery__button">
      {buttonText}
    </a>
  </div>
);

export default IndexHeroActu;
