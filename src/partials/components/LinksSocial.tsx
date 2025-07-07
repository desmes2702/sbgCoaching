import React from "react";
import { socialLinks, SocialPlatform } from "@/js/data/socialLinks.ts";

interface Props {
  variant?: "black" | "white" | "red";
  size?: number;
}

const LinksSocial: React.FC<Props> = ({ variant, size = 24 }) => {
  return (
    <ul className="social">
      {(Object.keys(socialLinks) as SocialPlatform[]).map((platform) => {
        const { url, icon, label, variant: defaultVariant, availableVariants } = socialLinks[platform];

        let iconColor: "black" | "white" | "red";
        if (variant === "white") {
          if (platform === "instagram") {
            iconColor = "red";
          } else if (availableVariants.includes("white")) {
            iconColor = "white";
          } else {
            iconColor = defaultVariant;
          }
        } else if (variant && availableVariants.includes(variant)) {
          iconColor = variant;
        } else {
          iconColor = defaultVariant;
        }

        return (
          <li key={platform}>
            <a
              href={url}
              className="social__link"
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/img/${icon}-${iconColor}.svg`}
                alt={`${label} icon`}
                width={size}
                height={size}
                loading="lazy"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default LinksSocial;
