export interface ImmigrationRequirement {
    visa: string;
    documents: string;
    vaccination: string;
    customs: string;
    notes?: string;
}
export interface CountryData {
    id: string;
    name: {
        de: string;
        en: string;
        'zh-cn': string;
        'zh-hk': string;
    };
    requirements: {
        de: ImmigrationRequirement;
        en: ImmigrationRequirement;
        'zh-cn': ImmigrationRequirement;
        'zh-hk': ImmigrationRequirement;
    };
}
export declare const immigrationData: CountryData[];
//# sourceMappingURL=immigration-data.d.ts.map