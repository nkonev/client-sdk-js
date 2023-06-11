export declare class RegionUrlProvider {
    private serverUrl;
    private token;
    private regionSettings;
    private lastUpdateAt;
    private settingsCacheTime;
    private attemptedRegions;
    constructor(url: string, token: string);
    isCloud(): boolean;
    getNextBestRegionUrl(abortSignal?: AbortSignal): Promise<string | null>;
    resetAttempts(): void;
    private fetchRegionSettings;
}
//# sourceMappingURL=RegionUrlProvider.d.ts.map