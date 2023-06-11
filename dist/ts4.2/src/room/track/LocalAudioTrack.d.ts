import type { AudioSenderStats } from '../stats';
import LocalTrack from './LocalTrack';
import type { AudioCaptureOptions } from './options';
export default class LocalAudioTrack extends LocalTrack {
    /** @internal */
    stopOnMute: boolean;
    private prevStats?;
    /**
     *
     * @param mediaTrack
     * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
     * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
     */
    constructor(mediaTrack: MediaStreamTrack, constraints?: MediaTrackConstraints, userProvidedTrack?: boolean);
    setDeviceId(deviceId: ConstrainDOMString): Promise<void>;
    mute(): Promise<LocalAudioTrack>;
    unmute(): Promise<LocalAudioTrack>;
    restartTrack(options?: AudioCaptureOptions): Promise<void>;
    protected restart(constraints?: MediaTrackConstraints): Promise<LocalTrack>;
    startMonitor(): void;
    protected monitorSender: () => Promise<void>;
    getSenderStats(): Promise<AudioSenderStats | undefined>;
    checkForSilence(): Promise<boolean>;
}
//# sourceMappingURL=LocalAudioTrack.d.ts.map
