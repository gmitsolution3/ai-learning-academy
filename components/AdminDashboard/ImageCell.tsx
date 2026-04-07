import { Package } from "lucide-react";

export default function ImageCell({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
      {imageUrl ? (
        <img
          src={imageUrl || "/fallback.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Package className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
