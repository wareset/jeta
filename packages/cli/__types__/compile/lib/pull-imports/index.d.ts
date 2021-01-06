import { INodeTokenize, IOptionsTokenize } from '@rastree/lib/dist/__types__';
export { INodeTokenize, IOptionsTokenize };
declare function pullImports(content: INodeTokenize[]): INodeTokenize[];
declare function pullImports(content: string): {
    imports: string;
    scripts: string;
};
export default pullImports;
