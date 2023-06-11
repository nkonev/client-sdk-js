export default class DeviceManager {
    private static instance?;
    static mediaDeviceKinds: MediaDeviceKind[];
    static getInstance(): DeviceManager;
    static userMediaPromiseMap: Map<MediaDeviceKind, Promise<MediaStream>>;
    getDevices(kind?: MediaDeviceKind, requestPermissions?: boolean): Promise<MediaDeviceInfo[]>;
    normalizeDeviceId(kind: MediaDeviceKind, deviceId?: string, groupId?: string): Promise<string | undefined>;
}
//# sourceMappingURL=DeviceManager.d.ts.map
