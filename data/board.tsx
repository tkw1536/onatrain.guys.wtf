type TrainType = 'S' | 'RB' | 'RE' | 'IC' | 'ICE' | string;
type LangType = 'de' | 'en' | 'fr';
type BoardType = 'an' | 'ab';
type Params = {
    bhf: string | string[];
    bhfname?: string;
    disrupt?: boolean;
    footer?: boolean;
    impressum?: boolean;
    lang?: LangType;
    marquee?: boolean;
    paging?: number;
    pagingdauer?: number;
    platform?: number | string | Array<number | string>;
    schriftdauer?: number;
    scrollspeed?: number;
    SecLang?: LangType;
    title?: boolean;
    typ?: BoardType;
    via?: boolean;
    zeilen?: number;
    zugtyp?: TrainType;
}

function encode(value: string | number | boolean | Array<string | number | boolean> | undefined): string | undefined {
    if(Array.isArray(value)) {
        return value.map(encode).join(',')
    }
    if (typeof value === 'boolean') {
        return value ? '1' : '0'
    } else if (typeof value === 'number') {
        return value.toString(10)
    } else if (typeof value === 'string') {
        return value
    }
    return undefined
}

const BOARD_LINK_BASE = 'https://iris.noncd.db.de/wbt/js/index.html';

export function BoardLink(params: Params): string {
    const urlparams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        const param = encode(value);
        if (!param) return
        
        urlparams.set(key, param);
    })

    return `${BOARD_LINK_BASE}?${urlparams}`
}