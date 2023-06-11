import type TypedEventEmitter from 'typed-emitter';
import { SignalClient } from '../api/SignalClient';
import type { SignalOptions } from '../api/SignalClient';
import type { InternalRoomOptions } from '../options';
import { DataPacket, DataPacket_Kind, DisconnectReason, SpeakerInfo, TrackInfo, UserPacket } from '../proto/livekit_models';
import { AddTrackRequest, JoinResponse } from '../proto/livekit_rtc';
import PCTransport from './PCTransport';
import type LocalTrack from './track/LocalTrack';
import type LocalVideoTrack from './track/LocalVideoTrack';
import type { SimulcastTrackInfo } from './track/LocalVideoTrack';
import type { TrackPublishOptions } from './track/options';
declare const RTCEngine_base: new () => TypedEventEmitter<EngineEventCallbacks>;
/** @internal */
export default class RTCEngine extends RTCEngine_base {
    private options;
    publisher?: PCTransport;
    subscriber?: PCTransport;
    client: SignalClient;
    rtcConfig: RTCConfiguration;
    peerConnectionTimeout: number;
    fullReconnectOnNext: boolean;
    /**
     * @internal
     */
    latestJoinResponse?: JoinResponse;
    get isClosed(): boolean;
    private lossyDC?;
    private lossyDCSub?;
    private reliableDC?;
    private dcBufferStatus;
    private reliableDCSub?;
    private subscriberPrimary;
    private primaryPC?;
    private pcState;
    private _isClosed;
    private pendingTrackResolvers;
    private hasPublished;
    private url?;
    private token?;
    private signalOpts?;
    private reconnectAttempts;
    private reconnectStart;
    private clientConfiguration?;
    private attemptingReconnect;
    private reconnectPolicy;
    private reconnectTimeout?;
    private participantSid?;
    /** keeps track of how often an initial join connection has been tried */
    private joinAttempts;
    /** specifies how often an initial join connection is allowed to retry */
    private maxJoinAttempts;
    private closingLock;
    private dataProcessLock;
    private shouldFailNext;
    private regionUrlProvider?;
    constructor(options: InternalRoomOptions);
    join(url: string, token: string, opts: SignalOptions, abortSignal?: AbortSignal): Promise<JoinResponse>;
    close(): Promise<void>;
    addTrack(req: AddTrackRequest): Promise<TrackInfo>;
    /**
     * Removes sender from PeerConnection, returning true if it was removed successfully
     * and a negotiation is necessary
     * @param sender
     * @returns
     */
    removeTrack(sender: RTCRtpSender): boolean;
    updateMuteStatus(trackSid: string, muted: boolean): void;
    get dataSubscriberReadyState(): string | undefined;
    getConnectedServerAddress(): Promise<string | undefined>;
    private configure;
    private makeRTCConfiguration;
    private createDataChannels;
    private handleDataChannel;
    private handleDataMessage;
    private handleDataError;
    private handleBufferedAmountLow;
    private setPreferredCodec;
    createSender(track: LocalTrack, opts: TrackPublishOptions, encodings?: RTCRtpEncodingParameters[]): Promise<RTCRtpSender>;
    createSimulcastSender(track: LocalVideoTrack, simulcastTrack: SimulcastTrackInfo, opts: TrackPublishOptions, encodings?: RTCRtpEncodingParameters[]): Promise<RTCRtpSender | undefined>;
    private createTransceiverRTCRtpSender;
    private createSimulcastTransceiverSender;
    private createRTCRtpSender;
    private handleDisconnect;
    private attemptReconnect;
    private getNextRetryDelay;
    private restartConnection;
    private resumeConnection;
    waitForPCInitialConnection(timeout?: number, abortController?: AbortController): Promise<void>;
    private waitForPCReconnected;
    waitForRestarted: () => Promise<void>;
    sendDataPacket(packet: DataPacket, kind: DataPacket_Kind): Promise<void>;
    private updateAndEmitDCBufferStatus;
    private isBufferStatusLow;
    /**
     * @internal
     */
    ensureDataTransportConnected(kind: DataPacket_Kind, subscriber?: boolean): Promise<void>;
    private ensurePublisherConnected;
    verifyTransport(): boolean;
    /** @internal */
    negotiate(): Promise<void>;
    dataChannelForKind(kind: DataPacket_Kind, sub?: boolean): RTCDataChannel | undefined;
    failNext(): void;
    private clearReconnectTimeout;
    private clearPendingReconnect;
    private handleBrowserOnLine;
    private registerOnLineListener;
    private deregisterOnLineListener;
}
export type EngineEventCallbacks = {
    connected: (joinResp: JoinResponse) => void;
    disconnected: (reason?: DisconnectReason) => void;
    resuming: () => void;
    resumed: () => void;
    restarting: () => void;
    restarted: () => void;
    signalResumed: () => void;
    signalRestarted: (joinResp: JoinResponse) => void;
    closing: () => void;
    mediaTrackAdded: (track: MediaStreamTrack, streams: MediaStream, receiver?: RTCRtpReceiver) => void;
    activeSpeakersUpdate: (speakers: Array<SpeakerInfo>) => void;
    dataPacketReceived: (userPacket: UserPacket, kind: DataPacket_Kind) => void;
    transportsCreated: (publisher: PCTransport, subscriber: PCTransport) => void;
    dcBufferStatusChanged: (isLow: boolean, kind: DataPacket_Kind) => void;
};
export {};
//# sourceMappingURL=RTCEngine.d.ts.map
