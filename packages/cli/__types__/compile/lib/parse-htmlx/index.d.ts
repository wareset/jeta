declare function parseHTMLX(content: string): string;
declare function parseHTMLX(content: string, isStr: true): string;
declare function parseHTMLX(content: string, isStr: false): {
    deep: number;
    raw: string;
}[];
export default parseHTMLX;
