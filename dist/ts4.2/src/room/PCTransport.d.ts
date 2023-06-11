import { EventEmitter } from 'events';
/** @internal */
interface TrackBitrateInfo {
    sid: string;
    codec: string;
    maxbr: number;
}
export declare const PCEvents: {
    readonly NegotiationStarted: "negotiationStarted";
    readonly NegotiationComplete: "negotiationComplete";
};
/** @internal */
export default class PCTransport extends EventEmitter {
    pc: RTCPeerConnection;
    pendingCandidates: RTCIceCandidateInit[];
    restartingIce: boolean;
    renegotiate: boolean;
    trackBitrates: TrackBitrateInfo[];
    remoteStereoMids: string[];
    remoteNackMids: string[];
    onOffer?: (offer: RTCSessionDescriptionInit) => void;
    constructor(config?: RTCConfiguration, mediaConstraints?: Record<string, unknown>);
    get isICEConnected(): boolean;
    addIceCandidate(candidate: RTCIceCandidateInit): Promise<void>;
    setRemoteDescription(sd: RTCSessionDescriptionInit): Promise<void>;
    negotiate: {
        (this: unknown, ...args: [
            onError?: ((e: Error) => void) | undefined
        ] & any[]): Promise<void>;
        cancel: (reason?: any) => void;
    };
    createAndSendOffer(options?: RTCOfferOptions): Promise<void>;
    createAndSetAnswer(): Promise<RTCSessionDescriptionInit>;
    setTrackCodecBitrate(sid: string, codec: string, maxbr: number): void;
    close(): void;
    private setMungedLocalDescription;
}
export {};
//# sourceMappingURL=PCTransport.d.ts.map
