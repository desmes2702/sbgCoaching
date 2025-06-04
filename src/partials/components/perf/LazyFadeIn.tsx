import {
  useEffect,
  useState,
  type ReactNode,
  type ElementType,
  type RefObject,
} from "react";
import { useInView } from "@/hooks/useInView";
import "@/scss/components/_lazy.scss";

type LazyFadeInProps =
  | {
      type: "img";
      src: string;
      alt: string;
      className?: string;
      width?: number | string;
      height?: number | string;
      style?: React.CSSProperties;
      delay?: string;
      duration?: string;
      transformFrom?: string;
      once?: boolean;
      id?: string;
      activeKey?: string | number;
    }
  | {
      type: "video";
      src: string;
      className?: string;
      autoPlay?: boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
      poster?: string;
      style?: React.CSSProperties;
      delay?: string;
      duration?: string;
      transformFrom?: string;
      once?: boolean;
      id?: string;
      activeKey?: string | number;
      innerRef?: RefObject<HTMLVideoElement | null>
    }
  | {
      type: "block";
      children: ReactNode;
      as?: ElementType;
      className?: string;
      style?: React.CSSProperties;
      delay?: string;
      duration?: string;
      transformFrom?: string;
      once?: boolean;
      id?: string;
      role?: string;
      ariaHidden?: boolean;
      activeKey?: string | number;
    };

const LazyFadeIn: React.FC<LazyFadeInProps> = (props) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hasAppeared, setHasAppeared] = useState(false);

  const delay = "delay" in props ? props.delay || "0s" : "0s";
  const duration = "duration" in props ? props.duration || "0.6s" : "0.6s";
  const transformFrom = "transformFrom" in props ? props.transformFrom || "translateY(2rem)" : "translateY(2rem)";
  const once = "once" in props ? props.once !== false : true;
  const storageKey = props.id ? `lazyFadeIn__${props.id}` : null;

  useEffect(() => {
    if (storageKey && sessionStorage.getItem(storageKey) === "true") {
      setHasAppeared(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (isInView && once && !hasAppeared) {
      if (storageKey) sessionStorage.setItem(storageKey, "true");
      setHasAppeared(true);
    }
  }, [isInView, once, hasAppeared, storageKey]);

  // 👇 Réinitialise l’affichage si activeKey change
  useEffect(() => {
    if (props.activeKey && once) {
      setHasAppeared(false);
    }
  }, [props.activeKey, once]);

  const show = once ? hasAppeared || isInView : isInView;

  const style = {
    ...(props.style ?? {}),
    transitionDuration: duration,
    transitionDelay: delay,
    "--from-transform": transformFrom,
  } as React.CSSProperties;

  if (props.type === "img") {
    return (
      <div
        ref={ref}
        id={props.id}
        className={`lazy-fade ${show ? "is-visible" : ""} ${props.className ?? ""}`}
        style={style}
      >
        {show && (
          <img
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    );
  }

  if (props.type === "video") {
    return (
      <div
        ref={ref}
        id={props.id}
        className={`lazy-fade ${show ? "is-visible" : ""} ${props.className ?? ""}`}
        style={style}
      >
        {show && (
          <video
            ref={(el) => {
              if (el) {
                el.volume = 0.5;
                if (props.innerRef) {
                  (props.innerRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                }
              }
            }}
            src={props.src}
            autoPlay={props.autoPlay}
            loop={props.loop}
            muted = {props.loop}
            controls
            poster={props.poster}
            playsInline
            preload="auto"
          />
        )}
      </div>
    );
  }

  if (props.type === "block") {
    const Tag = props.as ?? "div";
    return (
      <Tag
        ref={ref}
        id={props.id}
        role={props.role}
        aria-hidden={props.ariaHidden}
        className={`lazy-fade ${show ? "is-visible" : ""} ${props.className ?? ""}`}
        style={style}
      >
        {show ? props.children : null}
      </Tag>
    );
  }

  return null;
};

export default LazyFadeIn;
