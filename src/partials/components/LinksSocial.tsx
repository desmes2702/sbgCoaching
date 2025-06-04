// LinksSocial.tsx
import React from "react";
import { socialLinks } from "@/js/data/socialLinks";

interface Props {
  variant?: "black" | "white" | "red";
  size?: number;
}

const LinksSocial: React.FC<Props> = ({ variant, size = 24 }) => {
  return (
    <ul className="social">
      {Object.entries(socialLinks).map(([platform, { url, icon, label }]) => (
        <li key={platform}>
          <a
            href={url}
            className="social__link"
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`/img/${icon}-${variant ?? "black"}.svg`}
              alt={`${label} icon`}
              width={size}
              height={size}
              loading="lazy"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LinksSocial;
