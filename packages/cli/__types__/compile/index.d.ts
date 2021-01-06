export interface IOptionsStart {
    name: string;
    cid?: string;
    cidSalt?: string;
    cidType?: string | null;
    __langs__?: object;
    minify?: boolean;
    separateCss?: boolean;
}
export interface IOptions extends IOptionsStart {
    name: string;
    cid: string;
    cidSalt: string;
    cidType: string | null;
    __langs__: any;
    minify: boolean;
    separateCss: boolean;
}
export declare const OPTIONS: IOptions;
export interface IResult {
    content: string;
    temp: any;
    options: IOptions;
    style: {
        css: string;
        code: string;
    };
    script: {
        server: string;
        client: string;
        module: string;
        main: string;
    };
    template: {
        htmlx: string[];
        code: string;
    };
    final: string;
}
export default function compile(content?: string, optionsStart?: IOptionsStart): IResult;
