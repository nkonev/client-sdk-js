export type DetectableBrowser = 'Chrome' | 'Firefox' | 'Safari';
export type BrowserDetails = {
    name: DetectableBrowser;
    version: string;
};
/**
 * @internal
 */
export declare function getBrowser(userAgent?: string, force?: boolean): BrowserDetails | undefined;
//# sourceMappingURL=browserParser.d.ts.map
