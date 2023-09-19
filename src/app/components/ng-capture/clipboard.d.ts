

interface ClipboardItem {
    readonly types: readonly string[];
    readonly presentationStyle: "unspecified" | "inline" | "attachment";
    getType(): Promise<Blob>;
}
  
// interface ClipboardItemData {
//     [mimeType: string]: Blob | string | Promise<Blob | string>;
// }
  
declare var ClipboardItem: {
    prototype: ClipboardItem;
    new (items: Record<string, string | Blob | PromiseLike<string | Blob>>, options?: ClipboardItemOptions): ClipboardItem;
  };

interface Clipboard {
    read(): Promise<DataTransfer>;
    write(data: ClipboardItem[]): Promise<void>;
}

interface ClipboardItemOptions {
    presentationStyle?: PresentationStyle;
}

type PresentationStyle = "unspecified" | "inline" | "attachment"