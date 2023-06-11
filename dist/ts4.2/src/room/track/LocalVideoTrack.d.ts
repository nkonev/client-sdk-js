import type { SignalClient } from '../../api/SignalClient';
import { VideoLayer, VideoQuality } from '../../proto/livekit_models';
import type { SubscribedCodec, SubscribedQuality } from '../../proto/livekit_rtc';
import type { VideoSenderStats } from '../stats';
import LocalTrack from './LocalTrack';
import type { VideoCaptureOptions, VideoCodec } from './options';
export declare class SimulcastTrackInfo {
    codec: VideoCodec;
    mediaStreamTrack: MediaStreamTrack;
    sender?: RTCRtpSender;
    encodings?: RTCRtpEncodingParameters[];
    constructor(codec: VideoCodec, mediaStreamTrack: MediaStreamTrack);
}
export default class LocalVideoTrack extends LocalTrack {
    signalClient?: SignalClient;
    private prevStats?;
    private encodings?;
    simulcastCodecs: Map<VideoCodec, SimulcastTrackInfo>;
    private subscribedCodecs?;
    private senderLock;
    /**
     *
     * @param mediaTrack
     * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
     * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
     */
    constructor(mediaTrack: MediaStreamTrack, constraints?: MediaTrackConstraints, userProvidedTrack?: boolean);
    get isSimulcast(): boolean;
    startMonitor(signalClient: SignalClient): void;
    stop(): void;
    mute(): Promise<LocalVideoTrack>;
    unmute(): Promise<LocalVideoTrack>;
    getSenderStats(): Promise<VideoSenderStats[]>;
    setPublishingQuality(maxQuality: VideoQuality): void;
    setDeviceId(deviceId: ConstrainDOMString): Promise<void>;
    restartTrack(options?: VideoCaptureOptions): Promise<void>;
    addSimulcastTrack(codec: VideoCodec, encodings?: RTCRtpEncodingParameters[]): SimulcastTrackInfo;
    setSimulcastTrackSender(codec: VideoCodec, sender: RTCRtpSender): void;
    /**
     * @internal
     * Sets codecs that should be publishing
     */
    setPublishingCodecs(codecs: SubscribedCodec[]): Promise<VideoCodec[]>;
    /**
     * @internal
     * Sets layers that should be publishing
     */
    setPublishingLayers(qualities: SubscribedQuality[]): Promise<void>;
    protected monitorSender: () => Promise<void>;
    protected handleAppVisibilityChanged(): Promise<void>;
}
export declare function videoQualityForRid(rid: string): VideoQuality;
export declare function videoLayersFromEncodings(width: number, height: number, encodings?: RTCRtpEncodingParameters[], svc?: boolean): VideoLayer[];
//# sourceMappingURL=LocalVideoTrack.d.ts.map
