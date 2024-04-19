import { useLoadImage } from "@/hooks/loadImage";
import { cn } from "@/lib/utils";

export const Card = (props: { className?: string; card: Card }) => {
  const image = useLoadImage(props.card.urls[0]);
  // const avatar = useLoadImage(props.card.avatar || '');

  return (
    <div className={cn(props.className, "group relative overflow-hidden")}>
      <div className="absolute bottom-0 left-0 opacity-0 transition-opacity group-hover:opacity-100">
        <h2>{props.card.title || "Card title"}</h2>
      </div>
      <div className="h-full w-full">
        {image && (
          <img
            src={image}
            alt={props.card.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
