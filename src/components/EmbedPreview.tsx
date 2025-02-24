
import { formatDistanceToNow } from "date-fns";

interface EmbedPreviewProps {
  embed: {
    title?: string;
    description?: string;
    color?: string;
    author?: {
      name: string;
      icon_url?: string;
    };
    thumbnail?: {
      url: string;
    };
    image?: {
      url: string;
    };
    footer?: {
      text: string;
      icon_url?: string;
    };
    fields?: Array<{
      name: string;
      value: string;
      inline: boolean;
    }>;
  };
}

export const EmbedPreview = ({ embed }: EmbedPreviewProps) => {
  return (
    <div
      className="embed-preview glass-card"
      style={{ borderLeftColor: embed.color || "#000000" }}
    >
      {embed.author && embed.author.name && (
        <div className="mb-2 flex items-center gap-2">
          {embed.author.icon_url && (
            <img
              src={embed.author.icon_url}
              alt="Author icon"
              className="h-6 w-6 rounded-full"
            />
          )}
          <span className="text-sm font-medium">{embed.author.name}</span>
        </div>
      )}

      {embed.title && (
        <h2 className="mb-2 text-lg font-semibold text-gray-900">{embed.title}</h2>
      )}

      {embed.description && (
        <p className="mb-4 whitespace-pre-wrap text-gray-700">{embed.description}</p>
      )}

      {embed.fields && embed.fields.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {embed.fields.map((field, index) => (
            <div
              key={index}
              className={`space-y-1 ${field.inline ? "col-span-1" : "col-span-full"}`}
            >
              <h3 className="font-medium text-gray-900">{field.name}</h3>
              <p className="text-sm text-gray-700">{field.value}</p>
            </div>
          ))}
        </div>
      )}

      {embed.image && embed.image.url && (
        <img
          src={embed.image.url}
          alt="Embed image"
          className="mb-4 max-h-96 w-full rounded-md object-cover"
        />
      )}

      {embed.thumbnail && embed.thumbnail.url && (
        <img
          src={embed.thumbnail.url}
          alt="Thumbnail"
          className="float-right ml-4 h-16 w-16 rounded-md object-cover"
        />
      )}

      {embed.footer && embed.footer.text && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          {embed.footer.icon_url && (
            <img
              src={embed.footer.icon_url}
              alt="Footer icon"
              className="h-4 w-4 rounded-full"
            />
          )}
          <span>{embed.footer.text}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(), { addSuffix: true })}</span>
        </div>
      )}
    </div>
  );
};
