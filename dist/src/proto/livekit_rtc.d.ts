import _m0 from "protobufjs/minimal";
import { ClientConfiguration, ConnectionQuality, DisconnectReason, Encryption_Type, ParticipantInfo, ParticipantTracks, Room, ServerInfo, SpeakerInfo, SubscriptionError, TrackInfo, TrackSource, TrackType, VideoLayer, VideoQuality } from "./livekit_models";
export declare const protobufPackage = "livekit";
export declare enum SignalTarget {
    PUBLISHER = 0,
    SUBSCRIBER = 1,
    UNRECOGNIZED = -1
}
export declare function signalTargetFromJSON(object: any): SignalTarget;
export declare function signalTargetToJSON(object: SignalTarget): string;
export declare enum StreamState {
    ACTIVE = 0,
    PAUSED = 1,
    UNRECOGNIZED = -1
}
export declare function streamStateFromJSON(object: any): StreamState;
export declare function streamStateToJSON(object: StreamState): string;
export declare enum CandidateProtocol {
    UDP = 0,
    TCP = 1,
    TLS = 2,
    UNRECOGNIZED = -1
}
export declare function candidateProtocolFromJSON(object: any): CandidateProtocol;
export declare function candidateProtocolToJSON(object: CandidateProtocol): string;
export interface SignalRequest {
    message?: {
        $case: "offer";
        offer: SessionDescription;
    } | {
        $case: "answer";
        answer: SessionDescription;
    } | {
        $case: "trickle";
        trickle: TrickleRequest;
    } | {
        $case: "addTrack";
        addTrack: AddTrackRequest;
    } | {
        $case: "mute";
        mute: MuteTrackRequest;
    } | {
        $case: "subscription";
        subscription: UpdateSubscription;
    } | {
        $case: "trackSetting";
        trackSetting: UpdateTrackSettings;
    } | {
        $case: "leave";
        leave: LeaveRequest;
    } | {
        $case: "updateLayers";
        updateLayers: UpdateVideoLayers;
    } | {
        $case: "subscriptionPermission";
        subscriptionPermission: SubscriptionPermission;
    } | {
        $case: "syncState";
        syncState: SyncState;
    } | {
        $case: "simulate";
        simulate: SimulateScenario;
    } | {
        $case: "ping";
        ping: number;
    } | {
        $case: "updateMetadata";
        updateMetadata: UpdateParticipantMetadata;
    } | {
        $case: "pingReq";
        pingReq: Ping;
    };
}
export interface SignalResponse {
    message?: {
        $case: "join";
        join: JoinResponse;
    } | {
        $case: "answer";
        answer: SessionDescription;
    } | {
        $case: "offer";
        offer: SessionDescription;
    } | {
        $case: "trickle";
        trickle: TrickleRequest;
    } | {
        $case: "update";
        update: ParticipantUpdate;
    } | {
        $case: "trackPublished";
        trackPublished: TrackPublishedResponse;
    } | {
        $case: "leave";
        leave: LeaveRequest;
    } | {
        $case: "mute";
        mute: MuteTrackRequest;
    } | {
        $case: "speakersChanged";
        speakersChanged: SpeakersChanged;
    } | {
        $case: "roomUpdate";
        roomUpdate: RoomUpdate;
    } | {
        $case: "connectionQuality";
        connectionQuality: ConnectionQualityUpdate;
    } | {
        $case: "streamStateUpdate";
        streamStateUpdate: StreamStateUpdate;
    } | {
        $case: "subscribedQualityUpdate";
        subscribedQualityUpdate: SubscribedQualityUpdate;
    } | {
        $case: "subscriptionPermissionUpdate";
        subscriptionPermissionUpdate: SubscriptionPermissionUpdate;
    } | {
        $case: "refreshToken";
        refreshToken: string;
    } | {
        $case: "trackUnpublished";
        trackUnpublished: TrackUnpublishedResponse;
    } | {
        $case: "pong";
        pong: number;
    } | {
        $case: "reconnect";
        reconnect: ReconnectResponse;
    } | {
        $case: "pongResp";
        pongResp: Pong;
    } | {
        $case: "subscriptionResponse";
        subscriptionResponse: SubscriptionResponse;
    };
}
export interface SimulcastCodec {
    codec: string;
    cid: string;
    enableSimulcastLayers: boolean;
}
export interface AddTrackRequest {
    /** client ID of track, to match it when RTC track is received */
    cid: string;
    name: string;
    type: TrackType;
    /** to be deprecated in favor of layers */
    width: number;
    height: number;
    /** true to add track and initialize to muted */
    muted: boolean;
    /** true if DTX (Discontinuous Transmission) is disabled for audio */
    disableDtx: boolean;
    source: TrackSource;
    layers: VideoLayer[];
    simulcastCodecs: SimulcastCodec[];
    /** server ID of track, publish new codec to exist track */
    sid: string;
    stereo: boolean;
    /** true if RED (Redundant Encoding) is disabled for audio */
    disableRed: boolean;
    encryption: Encryption_Type;
}
export interface TrickleRequest {
    candidateInit: string;
    target: SignalTarget;
}
export interface MuteTrackRequest {
    sid: string;
    muted: boolean;
}
export interface JoinResponse {
    room?: Room;
    participant?: ParticipantInfo;
    otherParticipants: ParticipantInfo[];
    /** deprecated. use server_info.version instead. */
    serverVersion: string;
    iceServers: ICEServer[];
    /** use subscriber as the primary PeerConnection */
    subscriberPrimary: boolean;
    /**
     * when the current server isn't available, return alternate url to retry connection
     * when this is set, the other fields will be largely empty
     */
    alternativeUrl: string;
    clientConfiguration?: ClientConfiguration;
    /** deprecated. use server_info.region instead. */
    serverRegion: string;
    pingTimeout: number;
    pingInterval: number;
    serverInfo?: ServerInfo;
    /** Server-Injected-Frame byte trailer, used to identify unencrypted frames when e2ee is enabled */
    sifTrailer: Uint8Array;
}
export interface ReconnectResponse {
    iceServers: ICEServer[];
    clientConfiguration?: ClientConfiguration;
}
export interface TrackPublishedResponse {
    cid: string;
    track?: TrackInfo;
}
export interface TrackUnpublishedResponse {
    trackSid: string;
}
export interface SessionDescription {
    /** "answer" | "offer" | "pranswer" | "rollback" */
    type: string;
    sdp: string;
}
export interface ParticipantUpdate {
    participants: ParticipantInfo[];
}
export interface UpdateSubscription {
    trackSids: string[];
    subscribe: boolean;
    participantTracks: ParticipantTracks[];
}
export interface UpdateTrackSettings {
    trackSids: string[];
    /** when true, the track is placed in a paused state, with no new data returned */
    disabled: boolean;
    /** deprecated in favor of width & height */
    quality: VideoQuality;
    /** for video, width to receive */
    width: number;
    /** for video, height to receive */
    height: number;
    fps: number;
    /**
     * subscription priority. 1 being the highest (0 is unset)
     * when unset, server sill assign priority based on the order of subscription
     * server will use priority in the following ways:
     * 1. when subscribed tracks exceed per-participant subscription limit, server will
     *    pause the lowest priority tracks
     * 2. when the network is congested, server will assign available bandwidth to
     *    higher priority tracks first. lowest priority tracks can be paused
     */
    priority: number;
}
export interface LeaveRequest {
    /**
     * sent when server initiates the disconnect due to server-restart
     * indicates clients should attempt full-reconnect sequence
     */
    canReconnect: boolean;
    reason: DisconnectReason;
}
/** message to indicate published video track dimensions are changing */
export interface UpdateVideoLayers {
    trackSid: string;
    layers: VideoLayer[];
}
export interface UpdateParticipantMetadata {
    metadata: string;
    name: string;
}
export interface ICEServer {
    urls: string[];
    username: string;
    credential: string;
}
export interface SpeakersChanged {
    speakers: SpeakerInfo[];
}
export interface RoomUpdate {
    room?: Room;
}
export interface ConnectionQualityInfo {
    participantSid: string;
    quality: ConnectionQuality;
    score: number;
}
export interface ConnectionQualityUpdate {
    updates: ConnectionQualityInfo[];
}
export interface StreamStateInfo {
    participantSid: string;
    trackSid: string;
    state: StreamState;
}
export interface StreamStateUpdate {
    streamStates: StreamStateInfo[];
}
export interface SubscribedQuality {
    quality: VideoQuality;
    enabled: boolean;
}
export interface SubscribedCodec {
    codec: string;
    qualities: SubscribedQuality[];
}
export interface SubscribedQualityUpdate {
    trackSid: string;
    subscribedQualities: SubscribedQuality[];
    subscribedCodecs: SubscribedCodec[];
}
export interface TrackPermission {
    /** permission could be granted either by participant sid or identity */
    participantSid: string;
    allTracks: boolean;
    trackSids: string[];
    participantIdentity: string;
}
export interface SubscriptionPermission {
    allParticipants: boolean;
    trackPermissions: TrackPermission[];
}
export interface SubscriptionPermissionUpdate {
    participantSid: string;
    trackSid: string;
    allowed: boolean;
}
export interface SyncState {
    /** last subscribe answer before reconnecting */
    answer?: SessionDescription;
    subscription?: UpdateSubscription;
    publishTracks: TrackPublishedResponse[];
    dataChannels: DataChannelInfo[];
    /** last received server side offer before reconnecting */
    offer?: SessionDescription;
}
export interface DataChannelInfo {
    label: string;
    id: number;
    target: SignalTarget;
}
export interface SimulateScenario {
    scenario?: {
        $case: "speakerUpdate";
        speakerUpdate: number;
    } | {
        $case: "nodeFailure";
        nodeFailure: boolean;
    } | {
        $case: "migration";
        migration: boolean;
    } | {
        $case: "serverLeave";
        serverLeave: boolean;
    } | {
        $case: "switchCandidateProtocol";
        switchCandidateProtocol: CandidateProtocol;
    } | {
        $case: "subscriberBandwidth";
        subscriberBandwidth: number;
    };
}
export interface Ping {
    timestamp: number;
    /** rtt in milliseconds calculated by client */
    rtt: number;
}
export interface Pong {
    /** timestamp field of last received ping request */
    lastPingTimestamp: number;
    timestamp: number;
}
export interface RegionSettings {
    regions: RegionInfo[];
}
export interface RegionInfo {
    region: string;
    url: string;
    distance: number;
}
export interface SubscriptionResponse {
    trackSid: string;
    err: SubscriptionError;
}
export declare const SignalRequest: {
    encode(message: SignalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignalRequest;
    fromJSON(object: any): SignalRequest;
    toJSON(message: SignalRequest): unknown;
    create<I extends {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        }) | ({
            updateMetadata?: {
                metadata?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } & {
            $case: "updateMetadata";
        }) | ({
            pingReq?: {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } | undefined;
        } & {
            $case: "pingReq";
        }) | undefined;
    } & {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K in Exclude<keyof I["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_1 in Exclude<keyof I["message"], "offer" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_2 in Exclude<keyof I["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_3 in Exclude<keyof I["message"], "answer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_4 in Exclude<keyof I["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_5 in Exclude<keyof I["message"], "trickle" | "$case">]: never; }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        } & {
            addTrack?: ({
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_6 in Exclude<keyof I["message"]["addTrack"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_7 in Exclude<keyof I["message"]["addTrack"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                simulcastCodecs?: ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] & ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & { [K_8 in Exclude<keyof I["message"]["addTrack"]["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_9 in Exclude<keyof I["message"]["addTrack"]["simulcastCodecs"], keyof {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[]>]: never; }) | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_10 in Exclude<keyof I["message"]["addTrack"], keyof AddTrackRequest>]: never; }) | undefined;
            $case: "addTrack";
        } & { [K_11 in Exclude<keyof I["message"], "addTrack" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_12 in Exclude<keyof I["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_13 in Exclude<keyof I["message"], "mute" | "$case">]: never; }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        } & {
            subscription?: ({
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_14 in Exclude<keyof I["message"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSids?: (string[] & string[] & { [K_15 in Exclude<keyof I["message"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                } & { [K_16 in Exclude<keyof I["message"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_17 in Exclude<keyof I["message"]["subscription"]["participantTracks"], keyof {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_18 in Exclude<keyof I["message"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
            $case: "subscription";
        } & { [K_19 in Exclude<keyof I["message"], "subscription" | "$case">]: never; }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        } & {
            trackSetting?: ({
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_20 in Exclude<keyof I["message"]["trackSetting"]["trackSids"], keyof string[]>]: never; }) | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } & { [K_21 in Exclude<keyof I["message"]["trackSetting"], keyof UpdateTrackSettings>]: never; }) | undefined;
            $case: "trackSetting";
        } & { [K_22 in Exclude<keyof I["message"], "trackSetting" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_23 in Exclude<keyof I["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_24 in Exclude<keyof I["message"], "leave" | "$case">]: never; }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        } & {
            updateLayers?: ({
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_25 in Exclude<keyof I["message"]["updateLayers"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_26 in Exclude<keyof I["message"]["updateLayers"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_27 in Exclude<keyof I["message"]["updateLayers"], keyof UpdateVideoLayers>]: never; }) | undefined;
            $case: "updateLayers";
        } & { [K_28 in Exclude<keyof I["message"], "updateLayers" | "$case">]: never; }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        } & {
            subscriptionPermission?: ({
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } & {
                allParticipants?: boolean | undefined;
                trackPermissions?: ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                } & {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: (string[] & string[] & { [K_29 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    participantIdentity?: string | undefined;
                } & { [K_30 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_31 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"], keyof {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_32 in Exclude<keyof I["message"]["subscriptionPermission"], keyof SubscriptionPermission>]: never; }) | undefined;
            $case: "subscriptionPermission";
        } & { [K_33 in Exclude<keyof I["message"], "subscriptionPermission" | "$case">]: never; }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        } & {
            syncState?: ({
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } & {
                answer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_34 in Exclude<keyof I["message"]["syncState"]["answer"], keyof SessionDescription>]: never; }) | undefined;
                subscription?: ({
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } & {
                    trackSids?: (string[] & string[] & { [K_35 in Exclude<keyof I["message"]["syncState"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] & ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    } & {
                        participantSid?: string | undefined;
                        trackSids?: (string[] & string[] & { [K_36 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    } & { [K_37 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_38 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"], keyof {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_39 in Exclude<keyof I["message"]["syncState"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
                publishTracks?: ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] & ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                } & {
                    cid?: string | undefined;
                    track?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_40 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_41 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_42 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_43 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_44 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_45 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_46 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
                } & { [K_47 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_48 in Exclude<keyof I["message"]["syncState"]["publishTracks"], keyof {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
                dataChannels?: ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] & ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & { [K_49 in Exclude<keyof I["message"]["syncState"]["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_50 in Exclude<keyof I["message"]["syncState"]["dataChannels"], keyof {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[]>]: never; }) | undefined;
                offer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_51 in Exclude<keyof I["message"]["syncState"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            } & { [K_52 in Exclude<keyof I["message"]["syncState"], keyof SyncState>]: never; }) | undefined;
            $case: "syncState";
        } & { [K_53 in Exclude<keyof I["message"], "syncState" | "$case">]: never; }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        } & {
            simulate?: ({
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } & {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                } & {
                    speakerUpdate?: number | undefined;
                    $case: "speakerUpdate";
                } & { [K_54 in Exclude<keyof I["message"]["simulate"]["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                } & {
                    nodeFailure?: boolean | undefined;
                    $case: "nodeFailure";
                } & { [K_55 in Exclude<keyof I["message"]["simulate"]["scenario"], "nodeFailure" | "$case">]: never; }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                } & {
                    migration?: boolean | undefined;
                    $case: "migration";
                } & { [K_56 in Exclude<keyof I["message"]["simulate"]["scenario"], "migration" | "$case">]: never; }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                } & {
                    serverLeave?: boolean | undefined;
                    $case: "serverLeave";
                } & { [K_57 in Exclude<keyof I["message"]["simulate"]["scenario"], "serverLeave" | "$case">]: never; }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                } & {
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                    $case: "switchCandidateProtocol";
                } & { [K_58 in Exclude<keyof I["message"]["simulate"]["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                } & {
                    subscriberBandwidth?: number | undefined;
                    $case: "subscriberBandwidth";
                } & { [K_59 in Exclude<keyof I["message"]["simulate"]["scenario"], "subscriberBandwidth" | "$case">]: never; }) | undefined;
            } & { [K_60 in Exclude<keyof I["message"]["simulate"], "scenario">]: never; }) | undefined;
            $case: "simulate";
        } & { [K_61 in Exclude<keyof I["message"], "simulate" | "$case">]: never; }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        } & {
            ping?: number | undefined;
            $case: "ping";
        } & { [K_62 in Exclude<keyof I["message"], "ping" | "$case">]: never; }) | ({
            updateMetadata?: {
                metadata?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } & {
            $case: "updateMetadata";
        } & {
            updateMetadata?: ({
                metadata?: string | undefined;
                name?: string | undefined;
            } & {
                metadata?: string | undefined;
                name?: string | undefined;
            } & { [K_63 in Exclude<keyof I["message"]["updateMetadata"], keyof UpdateParticipantMetadata>]: never; }) | undefined;
            $case: "updateMetadata";
        } & { [K_64 in Exclude<keyof I["message"], "updateMetadata" | "$case">]: never; }) | ({
            pingReq?: {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } | undefined;
        } & {
            $case: "pingReq";
        } & {
            pingReq?: ({
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } & {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } & { [K_65 in Exclude<keyof I["message"]["pingReq"], keyof Ping>]: never; }) | undefined;
            $case: "pingReq";
        } & { [K_66 in Exclude<keyof I["message"], "pingReq" | "$case">]: never; }) | undefined;
    } & { [K_67 in Exclude<keyof I, "message">]: never; }>(base?: I | undefined): SignalRequest;
    fromPartial<I_1 extends {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        }) | ({
            updateMetadata?: {
                metadata?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } & {
            $case: "updateMetadata";
        }) | ({
            pingReq?: {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } | undefined;
        } & {
            $case: "pingReq";
        }) | undefined;
    } & {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_68 in Exclude<keyof I_1["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_69 in Exclude<keyof I_1["message"], "offer" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_70 in Exclude<keyof I_1["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_71 in Exclude<keyof I_1["message"], "answer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_72 in Exclude<keyof I_1["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_73 in Exclude<keyof I_1["message"], "trickle" | "$case">]: never; }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        } & {
            addTrack?: ({
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_74 in Exclude<keyof I_1["message"]["addTrack"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_75 in Exclude<keyof I_1["message"]["addTrack"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                simulcastCodecs?: ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] & ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & { [K_76 in Exclude<keyof I_1["message"]["addTrack"]["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_77 in Exclude<keyof I_1["message"]["addTrack"]["simulcastCodecs"], keyof {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[]>]: never; }) | undefined;
                sid?: string | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_78 in Exclude<keyof I_1["message"]["addTrack"], keyof AddTrackRequest>]: never; }) | undefined;
            $case: "addTrack";
        } & { [K_79 in Exclude<keyof I_1["message"], "addTrack" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_80 in Exclude<keyof I_1["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_81 in Exclude<keyof I_1["message"], "mute" | "$case">]: never; }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        } & {
            subscription?: ({
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_82 in Exclude<keyof I_1["message"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSids?: (string[] & string[] & { [K_83 in Exclude<keyof I_1["message"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                } & { [K_84 in Exclude<keyof I_1["message"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_85 in Exclude<keyof I_1["message"]["subscription"]["participantTracks"], keyof {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_86 in Exclude<keyof I_1["message"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
            $case: "subscription";
        } & { [K_87 in Exclude<keyof I_1["message"], "subscription" | "$case">]: never; }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        } & {
            trackSetting?: ({
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_88 in Exclude<keyof I_1["message"]["trackSetting"]["trackSids"], keyof string[]>]: never; }) | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                fps?: number | undefined;
                priority?: number | undefined;
            } & { [K_89 in Exclude<keyof I_1["message"]["trackSetting"], keyof UpdateTrackSettings>]: never; }) | undefined;
            $case: "trackSetting";
        } & { [K_90 in Exclude<keyof I_1["message"], "trackSetting" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_91 in Exclude<keyof I_1["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_92 in Exclude<keyof I_1["message"], "leave" | "$case">]: never; }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        } & {
            updateLayers?: ({
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_93 in Exclude<keyof I_1["message"]["updateLayers"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_94 in Exclude<keyof I_1["message"]["updateLayers"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_95 in Exclude<keyof I_1["message"]["updateLayers"], keyof UpdateVideoLayers>]: never; }) | undefined;
            $case: "updateLayers";
        } & { [K_96 in Exclude<keyof I_1["message"], "updateLayers" | "$case">]: never; }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        } & {
            subscriptionPermission?: ({
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } & {
                allParticipants?: boolean | undefined;
                trackPermissions?: ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                } & {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: (string[] & string[] & { [K_97 in Exclude<keyof I_1["message"]["subscriptionPermission"]["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    participantIdentity?: string | undefined;
                } & { [K_98 in Exclude<keyof I_1["message"]["subscriptionPermission"]["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_99 in Exclude<keyof I_1["message"]["subscriptionPermission"]["trackPermissions"], keyof {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_100 in Exclude<keyof I_1["message"]["subscriptionPermission"], keyof SubscriptionPermission>]: never; }) | undefined;
            $case: "subscriptionPermission";
        } & { [K_101 in Exclude<keyof I_1["message"], "subscriptionPermission" | "$case">]: never; }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        } & {
            syncState?: ({
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } & {
                answer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_102 in Exclude<keyof I_1["message"]["syncState"]["answer"], keyof SessionDescription>]: never; }) | undefined;
                subscription?: ({
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } & {
                    trackSids?: (string[] & string[] & { [K_103 in Exclude<keyof I_1["message"]["syncState"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] & ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    } & {
                        participantSid?: string | undefined;
                        trackSids?: (string[] & string[] & { [K_104 in Exclude<keyof I_1["message"]["syncState"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    } & { [K_105 in Exclude<keyof I_1["message"]["syncState"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_106 in Exclude<keyof I_1["message"]["syncState"]["subscription"]["participantTracks"], keyof {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_107 in Exclude<keyof I_1["message"]["syncState"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
                publishTracks?: ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[] & ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                } & {
                    cid?: string | undefined;
                    track?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_108 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_109 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_110 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_111 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_112 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_113 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_114 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
                } & { [K_115 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_116 in Exclude<keyof I_1["message"]["syncState"]["publishTracks"], keyof {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
                dataChannels?: ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] & ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & { [K_117 in Exclude<keyof I_1["message"]["syncState"]["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_118 in Exclude<keyof I_1["message"]["syncState"]["dataChannels"], keyof {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[]>]: never; }) | undefined;
                offer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_119 in Exclude<keyof I_1["message"]["syncState"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            } & { [K_120 in Exclude<keyof I_1["message"]["syncState"], keyof SyncState>]: never; }) | undefined;
            $case: "syncState";
        } & { [K_121 in Exclude<keyof I_1["message"], "syncState" | "$case">]: never; }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        } & {
            simulate?: ({
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                }) | undefined;
            } & {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                } & {
                    speakerUpdate?: number | undefined;
                    $case: "speakerUpdate";
                } & { [K_122 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                } & {
                    nodeFailure?: boolean | undefined;
                    $case: "nodeFailure";
                } & { [K_123 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "nodeFailure" | "$case">]: never; }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                } & {
                    migration?: boolean | undefined;
                    $case: "migration";
                } & { [K_124 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "migration" | "$case">]: never; }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                } & {
                    serverLeave?: boolean | undefined;
                    $case: "serverLeave";
                } & { [K_125 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "serverLeave" | "$case">]: never; }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                } & {
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                    $case: "switchCandidateProtocol";
                } & { [K_126 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | ({
                    subscriberBandwidth?: number | undefined;
                } & {
                    $case: "subscriberBandwidth";
                } & {
                    subscriberBandwidth?: number | undefined;
                    $case: "subscriberBandwidth";
                } & { [K_127 in Exclude<keyof I_1["message"]["simulate"]["scenario"], "subscriberBandwidth" | "$case">]: never; }) | undefined;
            } & { [K_128 in Exclude<keyof I_1["message"]["simulate"], "scenario">]: never; }) | undefined;
            $case: "simulate";
        } & { [K_129 in Exclude<keyof I_1["message"], "simulate" | "$case">]: never; }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        } & {
            ping?: number | undefined;
            $case: "ping";
        } & { [K_130 in Exclude<keyof I_1["message"], "ping" | "$case">]: never; }) | ({
            updateMetadata?: {
                metadata?: string | undefined;
                name?: string | undefined;
            } | undefined;
        } & {
            $case: "updateMetadata";
        } & {
            updateMetadata?: ({
                metadata?: string | undefined;
                name?: string | undefined;
            } & {
                metadata?: string | undefined;
                name?: string | undefined;
            } & { [K_131 in Exclude<keyof I_1["message"]["updateMetadata"], keyof UpdateParticipantMetadata>]: never; }) | undefined;
            $case: "updateMetadata";
        } & { [K_132 in Exclude<keyof I_1["message"], "updateMetadata" | "$case">]: never; }) | ({
            pingReq?: {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } | undefined;
        } & {
            $case: "pingReq";
        } & {
            pingReq?: ({
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } & {
                timestamp?: number | undefined;
                rtt?: number | undefined;
            } & { [K_133 in Exclude<keyof I_1["message"]["pingReq"], keyof Ping>]: never; }) | undefined;
            $case: "pingReq";
        } & { [K_134 in Exclude<keyof I_1["message"], "pingReq" | "$case">]: never; }) | undefined;
    } & { [K_135 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): SignalRequest;
};
export declare const SignalResponse: {
    encode(message: SignalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignalResponse;
    fromJSON(object: any): SignalResponse;
    toJSON(message: SignalResponse): unknown;
    create<I extends {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } | undefined;
        } & {
            $case: "join";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        }) | ({
            reconnect?: {
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "reconnect";
        }) | ({
            pongResp?: {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
        } & {
            $case: "pongResp";
        }) | ({
            subscriptionResponse?: {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } | undefined;
        } & {
            $case: "subscriptionResponse";
        }) | undefined;
    } & {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } | undefined;
        } & {
            $case: "join";
        } & {
            join?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K in Exclude<keyof I["message"]["join"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["message"]["join"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_2 in Exclude<keyof I["message"]["join"]["room"], keyof Room>]: never; }) | undefined;
                participant?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_3 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_4 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_5 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_6 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_7 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_8 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_9 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_10 in Exclude<keyof I["message"]["join"]["participant"]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_11 in Exclude<keyof I["message"]["join"]["participant"]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_12 in Exclude<keyof I["message"]["join"]["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_13 in Exclude<keyof I["message"]["join"]["participant"], keyof ParticipantInfo>]: never; }) | undefined;
                otherParticipants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_14 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_15 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_16 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_17 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_18 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_19 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_20 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_21 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_22 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_23 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_24 in Exclude<keyof I["message"]["join"]["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_25 in Exclude<keyof I["message"]["join"]["otherParticipants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
                serverVersion?: string | undefined;
                iceServers?: ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] & ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & {
                    urls?: (string[] & string[] & { [K_26 in Exclude<keyof I["message"]["join"]["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & { [K_27 in Exclude<keyof I["message"]["join"]["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_28 in Exclude<keyof I["message"]["join"]["iceServers"], keyof {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[]>]: never; }) | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: ({
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    video?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_29 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
                    screen?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_30 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: ({
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } & {
                        codecs?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_31 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_32 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                        publish?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_33 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_34 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_35 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & { [K_36 in Exclude<keyof I["message"]["join"]["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: ({
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & { [K_37 in Exclude<keyof I["message"]["join"]["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
                sifTrailer?: Uint8Array | undefined;
            } & { [K_38 in Exclude<keyof I["message"]["join"], keyof JoinResponse>]: never; }) | undefined;
            $case: "join";
        } & { [K_39 in Exclude<keyof I["message"], "join" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_40 in Exclude<keyof I["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_41 in Exclude<keyof I["message"], "answer" | "$case">]: never; }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_42 in Exclude<keyof I["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_43 in Exclude<keyof I["message"], "offer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_44 in Exclude<keyof I["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_45 in Exclude<keyof I["message"], "trickle" | "$case">]: never; }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        } & {
            update?: ({
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } & {
                participants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_46 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_47 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_48 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_49 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_50 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_51 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_52 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_53 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_54 in Exclude<keyof I["message"]["update"]["participants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_55 in Exclude<keyof I["message"]["update"]["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_56 in Exclude<keyof I["message"]["update"]["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_57 in Exclude<keyof I["message"]["update"]["participants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_58 in Exclude<keyof I["message"]["update"], "participants">]: never; }) | undefined;
            $case: "update";
        } & { [K_59 in Exclude<keyof I["message"], "update" | "$case">]: never; }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        } & {
            trackPublished?: ({
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } & {
                cid?: string | undefined;
                track?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_60 in Exclude<keyof I["message"]["trackPublished"]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_61 in Exclude<keyof I["message"]["trackPublished"]["track"]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_62 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_63 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_64 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_65 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"], keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } & { [K_66 in Exclude<keyof I["message"]["trackPublished"]["track"], keyof TrackInfo>]: never; }) | undefined;
            } & { [K_67 in Exclude<keyof I["message"]["trackPublished"], keyof TrackPublishedResponse>]: never; }) | undefined;
            $case: "trackPublished";
        } & { [K_68 in Exclude<keyof I["message"], "trackPublished" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_69 in Exclude<keyof I["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_70 in Exclude<keyof I["message"], "leave" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_71 in Exclude<keyof I["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_72 in Exclude<keyof I["message"], "mute" | "$case">]: never; }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        } & {
            speakersChanged?: ({
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } & {
                speakers?: ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & { [K_73 in Exclude<keyof I["message"]["speakersChanged"]["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_74 in Exclude<keyof I["message"]["speakersChanged"]["speakers"], keyof {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_75 in Exclude<keyof I["message"]["speakersChanged"], "speakers">]: never; }) | undefined;
            $case: "speakersChanged";
        } & { [K_76 in Exclude<keyof I["message"], "speakersChanged" | "$case">]: never; }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        } & {
            roomUpdate?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K_77 in Exclude<keyof I["message"]["roomUpdate"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_78 in Exclude<keyof I["message"]["roomUpdate"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_79 in Exclude<keyof I["message"]["roomUpdate"]["room"], keyof Room>]: never; }) | undefined;
            } & { [K_80 in Exclude<keyof I["message"]["roomUpdate"], "room">]: never; }) | undefined;
            $case: "roomUpdate";
        } & { [K_81 in Exclude<keyof I["message"], "roomUpdate" | "$case">]: never; }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        } & {
            connectionQuality?: ({
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } & {
                updates?: ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & { [K_82 in Exclude<keyof I["message"]["connectionQuality"]["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_83 in Exclude<keyof I["message"]["connectionQuality"]["updates"], keyof {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_84 in Exclude<keyof I["message"]["connectionQuality"], "updates">]: never; }) | undefined;
            $case: "connectionQuality";
        } & { [K_85 in Exclude<keyof I["message"], "connectionQuality" | "$case">]: never; }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        } & {
            streamStateUpdate?: ({
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } & {
                streamStates?: ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & { [K_86 in Exclude<keyof I["message"]["streamStateUpdate"]["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_87 in Exclude<keyof I["message"]["streamStateUpdate"]["streamStates"], keyof {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_88 in Exclude<keyof I["message"]["streamStateUpdate"], "streamStates">]: never; }) | undefined;
            $case: "streamStateUpdate";
        } & { [K_89 in Exclude<keyof I["message"], "streamStateUpdate" | "$case">]: never; }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        } & {
            subscribedQualityUpdate?: ({
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                subscribedQualities?: ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & { [K_90 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_91 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedQualities"], keyof {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[]>]: never; }) | undefined;
                subscribedCodecs?: ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] & ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                } & {
                    codec?: string | undefined;
                    qualities?: ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & { [K_92 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_93 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"], keyof {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_94 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_95 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"], keyof {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_96 in Exclude<keyof I["message"]["subscribedQualityUpdate"], keyof SubscribedQualityUpdate>]: never; }) | undefined;
            $case: "subscribedQualityUpdate";
        } & { [K_97 in Exclude<keyof I["message"], "subscribedQualityUpdate" | "$case">]: never; }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        } & {
            subscriptionPermissionUpdate?: ({
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & { [K_98 in Exclude<keyof I["message"]["subscriptionPermissionUpdate"], keyof SubscriptionPermissionUpdate>]: never; }) | undefined;
            $case: "subscriptionPermissionUpdate";
        } & { [K_99 in Exclude<keyof I["message"], "subscriptionPermissionUpdate" | "$case">]: never; }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        } & {
            refreshToken?: string | undefined;
            $case: "refreshToken";
        } & { [K_100 in Exclude<keyof I["message"], "refreshToken" | "$case">]: never; }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        } & {
            trackUnpublished?: ({
                trackSid?: string | undefined;
            } & {
                trackSid?: string | undefined;
            } & { [K_101 in Exclude<keyof I["message"]["trackUnpublished"], "trackSid">]: never; }) | undefined;
            $case: "trackUnpublished";
        } & { [K_102 in Exclude<keyof I["message"], "trackUnpublished" | "$case">]: never; }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        } & {
            pong?: number | undefined;
            $case: "pong";
        } & { [K_103 in Exclude<keyof I["message"], "pong" | "$case">]: never; }) | ({
            reconnect?: {
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "reconnect";
        } & {
            reconnect?: ({
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } & {
                iceServers?: ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] & ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & {
                    urls?: (string[] & string[] & { [K_104 in Exclude<keyof I["message"]["reconnect"]["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & { [K_105 in Exclude<keyof I["message"]["reconnect"]["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_106 in Exclude<keyof I["message"]["reconnect"]["iceServers"], keyof {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[]>]: never; }) | undefined;
                clientConfiguration?: ({
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    video?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_107 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
                    screen?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_108 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: ({
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } & {
                        codecs?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_109 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_110 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                        publish?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_111 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_112 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_113 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & { [K_114 in Exclude<keyof I["message"]["reconnect"]["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
            } & { [K_115 in Exclude<keyof I["message"]["reconnect"], keyof ReconnectResponse>]: never; }) | undefined;
            $case: "reconnect";
        } & { [K_116 in Exclude<keyof I["message"], "reconnect" | "$case">]: never; }) | ({
            pongResp?: {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
        } & {
            $case: "pongResp";
        } & {
            pongResp?: ({
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } & {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } & { [K_117 in Exclude<keyof I["message"]["pongResp"], keyof Pong>]: never; }) | undefined;
            $case: "pongResp";
        } & { [K_118 in Exclude<keyof I["message"], "pongResp" | "$case">]: never; }) | ({
            subscriptionResponse?: {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } | undefined;
        } & {
            $case: "subscriptionResponse";
        } & {
            subscriptionResponse?: ({
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } & {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } & { [K_119 in Exclude<keyof I["message"]["subscriptionResponse"], keyof SubscriptionResponse>]: never; }) | undefined;
            $case: "subscriptionResponse";
        } & { [K_120 in Exclude<keyof I["message"], "subscriptionResponse" | "$case">]: never; }) | undefined;
    } & { [K_121 in Exclude<keyof I, "message">]: never; }>(base?: I | undefined): SignalResponse;
    fromPartial<I_1 extends {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } | undefined;
        } & {
            $case: "join";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        }) | ({
            reconnect?: {
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "reconnect";
        }) | ({
            pongResp?: {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
        } & {
            $case: "pongResp";
        }) | ({
            subscriptionResponse?: {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } | undefined;
        } & {
            $case: "subscriptionResponse";
        }) | undefined;
    } & {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } | undefined;
        } & {
            $case: "join";
        } & {
            join?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
                sifTrailer?: Uint8Array | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K_122 in Exclude<keyof I_1["message"]["join"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_123 in Exclude<keyof I_1["message"]["join"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_124 in Exclude<keyof I_1["message"]["join"]["room"], keyof Room>]: never; }) | undefined;
                participant?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_125 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_126 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_127 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_128 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_129 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_130 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_131 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_132 in Exclude<keyof I_1["message"]["join"]["participant"]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_133 in Exclude<keyof I_1["message"]["join"]["participant"]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_134 in Exclude<keyof I_1["message"]["join"]["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_135 in Exclude<keyof I_1["message"]["join"]["participant"], keyof ParticipantInfo>]: never; }) | undefined;
                otherParticipants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_136 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_137 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_138 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_139 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_140 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_141 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_142 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_143 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_144 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_145 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_146 in Exclude<keyof I_1["message"]["join"]["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_147 in Exclude<keyof I_1["message"]["join"]["otherParticipants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
                serverVersion?: string | undefined;
                iceServers?: ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] & ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & {
                    urls?: (string[] & string[] & { [K_148 in Exclude<keyof I_1["message"]["join"]["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & { [K_149 in Exclude<keyof I_1["message"]["join"]["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_150 in Exclude<keyof I_1["message"]["join"]["iceServers"], keyof {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[]>]: never; }) | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: ({
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    video?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_151 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
                    screen?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_152 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: ({
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } & {
                        codecs?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_153 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_154 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                        publish?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_155 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_156 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_157 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & { [K_158 in Exclude<keyof I_1["message"]["join"]["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: ({
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & { [K_159 in Exclude<keyof I_1["message"]["join"]["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
                sifTrailer?: Uint8Array | undefined;
            } & { [K_160 in Exclude<keyof I_1["message"]["join"], keyof JoinResponse>]: never; }) | undefined;
            $case: "join";
        } & { [K_161 in Exclude<keyof I_1["message"], "join" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_162 in Exclude<keyof I_1["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_163 in Exclude<keyof I_1["message"], "answer" | "$case">]: never; }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_164 in Exclude<keyof I_1["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_165 in Exclude<keyof I_1["message"], "offer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_166 in Exclude<keyof I_1["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_167 in Exclude<keyof I_1["message"], "trickle" | "$case">]: never; }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        } & {
            update?: ({
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } & {
                participants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_168 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_169 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_170 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_171 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_172 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_173 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    } & { [K_174 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_175 in Exclude<keyof I_1["message"]["update"]["participants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: (TrackSource[] & TrackSource[] & { [K_176 in Exclude<keyof I_1["message"]["update"]["participants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } & { [K_177 in Exclude<keyof I_1["message"]["update"]["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_178 in Exclude<keyof I_1["message"]["update"]["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_179 in Exclude<keyof I_1["message"]["update"]["participants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                        stereo?: boolean | undefined;
                        disableRed?: boolean | undefined;
                        encryption?: Encryption_Type | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        canPublishSources?: TrackSource[] | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                        canUpdateMetadata?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_180 in Exclude<keyof I_1["message"]["update"], "participants">]: never; }) | undefined;
            $case: "update";
        } & { [K_181 in Exclude<keyof I_1["message"], "update" | "$case">]: never; }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        } & {
            trackPublished?: ({
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } | undefined;
            } & {
                cid?: string | undefined;
                track?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_182 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_183 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_184 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_185 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["codecs"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_186 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_187 in Exclude<keyof I_1["message"]["trackPublished"]["track"]["codecs"], keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                    stereo?: boolean | undefined;
                    disableRed?: boolean | undefined;
                    encryption?: Encryption_Type | undefined;
                } & { [K_188 in Exclude<keyof I_1["message"]["trackPublished"]["track"], keyof TrackInfo>]: never; }) | undefined;
            } & { [K_189 in Exclude<keyof I_1["message"]["trackPublished"], keyof TrackPublishedResponse>]: never; }) | undefined;
            $case: "trackPublished";
        } & { [K_190 in Exclude<keyof I_1["message"], "trackPublished" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_191 in Exclude<keyof I_1["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_192 in Exclude<keyof I_1["message"], "leave" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_193 in Exclude<keyof I_1["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_194 in Exclude<keyof I_1["message"], "mute" | "$case">]: never; }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        } & {
            speakersChanged?: ({
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } & {
                speakers?: ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & { [K_195 in Exclude<keyof I_1["message"]["speakersChanged"]["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_196 in Exclude<keyof I_1["message"]["speakersChanged"]["speakers"], keyof {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_197 in Exclude<keyof I_1["message"]["speakersChanged"], "speakers">]: never; }) | undefined;
            $case: "speakersChanged";
        } & { [K_198 in Exclude<keyof I_1["message"], "speakersChanged" | "$case">]: never; }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        } & {
            roomUpdate?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K_199 in Exclude<keyof I_1["message"]["roomUpdate"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_200 in Exclude<keyof I_1["message"]["roomUpdate"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    numPublishers?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_201 in Exclude<keyof I_1["message"]["roomUpdate"]["room"], keyof Room>]: never; }) | undefined;
            } & { [K_202 in Exclude<keyof I_1["message"]["roomUpdate"], "room">]: never; }) | undefined;
            $case: "roomUpdate";
        } & { [K_203 in Exclude<keyof I_1["message"], "roomUpdate" | "$case">]: never; }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        } & {
            connectionQuality?: ({
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } & {
                updates?: ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & { [K_204 in Exclude<keyof I_1["message"]["connectionQuality"]["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_205 in Exclude<keyof I_1["message"]["connectionQuality"]["updates"], keyof {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_206 in Exclude<keyof I_1["message"]["connectionQuality"], "updates">]: never; }) | undefined;
            $case: "connectionQuality";
        } & { [K_207 in Exclude<keyof I_1["message"], "connectionQuality" | "$case">]: never; }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        } & {
            streamStateUpdate?: ({
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } & {
                streamStates?: ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & { [K_208 in Exclude<keyof I_1["message"]["streamStateUpdate"]["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_209 in Exclude<keyof I_1["message"]["streamStateUpdate"]["streamStates"], keyof {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_210 in Exclude<keyof I_1["message"]["streamStateUpdate"], "streamStates">]: never; }) | undefined;
            $case: "streamStateUpdate";
        } & { [K_211 in Exclude<keyof I_1["message"], "streamStateUpdate" | "$case">]: never; }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        } & {
            subscribedQualityUpdate?: ({
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                subscribedQualities?: ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & { [K_212 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_213 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedQualities"], keyof {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[]>]: never; }) | undefined;
                subscribedCodecs?: ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] & ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                } & {
                    codec?: string | undefined;
                    qualities?: ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & { [K_214 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_215 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"], keyof {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_216 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_217 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"]["subscribedCodecs"], keyof {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_218 in Exclude<keyof I_1["message"]["subscribedQualityUpdate"], keyof SubscribedQualityUpdate>]: never; }) | undefined;
            $case: "subscribedQualityUpdate";
        } & { [K_219 in Exclude<keyof I_1["message"], "subscribedQualityUpdate" | "$case">]: never; }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        } & {
            subscriptionPermissionUpdate?: ({
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & { [K_220 in Exclude<keyof I_1["message"]["subscriptionPermissionUpdate"], keyof SubscriptionPermissionUpdate>]: never; }) | undefined;
            $case: "subscriptionPermissionUpdate";
        } & { [K_221 in Exclude<keyof I_1["message"], "subscriptionPermissionUpdate" | "$case">]: never; }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        } & {
            refreshToken?: string | undefined;
            $case: "refreshToken";
        } & { [K_222 in Exclude<keyof I_1["message"], "refreshToken" | "$case">]: never; }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        } & {
            trackUnpublished?: ({
                trackSid?: string | undefined;
            } & {
                trackSid?: string | undefined;
            } & { [K_223 in Exclude<keyof I_1["message"]["trackUnpublished"], "trackSid">]: never; }) | undefined;
            $case: "trackUnpublished";
        } & { [K_224 in Exclude<keyof I_1["message"], "trackUnpublished" | "$case">]: never; }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        } & {
            pong?: number | undefined;
            $case: "pong";
        } & { [K_225 in Exclude<keyof I_1["message"], "pong" | "$case">]: never; }) | ({
            reconnect?: {
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "reconnect";
        } & {
            reconnect?: ({
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
            } & {
                iceServers?: ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] & ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & {
                    urls?: (string[] & string[] & { [K_226 in Exclude<keyof I_1["message"]["reconnect"]["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & { [K_227 in Exclude<keyof I_1["message"]["reconnect"]["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_228 in Exclude<keyof I_1["message"]["reconnect"]["iceServers"], keyof {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[]>]: never; }) | undefined;
                clientConfiguration?: ({
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    video?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_229 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
                    screen?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_230 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: ({
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                        publish?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } & {
                        codecs?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_231 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_232 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                        publish?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_233 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_234 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_235 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & { [K_236 in Exclude<keyof I_1["message"]["reconnect"]["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
            } & { [K_237 in Exclude<keyof I_1["message"]["reconnect"], keyof ReconnectResponse>]: never; }) | undefined;
            $case: "reconnect";
        } & { [K_238 in Exclude<keyof I_1["message"], "reconnect" | "$case">]: never; }) | ({
            pongResp?: {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
        } & {
            $case: "pongResp";
        } & {
            pongResp?: ({
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } & {
                lastPingTimestamp?: number | undefined;
                timestamp?: number | undefined;
            } & { [K_239 in Exclude<keyof I_1["message"]["pongResp"], keyof Pong>]: never; }) | undefined;
            $case: "pongResp";
        } & { [K_240 in Exclude<keyof I_1["message"], "pongResp" | "$case">]: never; }) | ({
            subscriptionResponse?: {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } | undefined;
        } & {
            $case: "subscriptionResponse";
        } & {
            subscriptionResponse?: ({
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } & {
                trackSid?: string | undefined;
                err?: SubscriptionError | undefined;
            } & { [K_241 in Exclude<keyof I_1["message"]["subscriptionResponse"], keyof SubscriptionResponse>]: never; }) | undefined;
            $case: "subscriptionResponse";
        } & { [K_242 in Exclude<keyof I_1["message"], "subscriptionResponse" | "$case">]: never; }) | undefined;
    } & { [K_243 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): SignalResponse;
};
export declare const SimulcastCodec: {
    encode(message: SimulcastCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulcastCodec;
    fromJSON(object: any): SimulcastCodec;
    toJSON(message: SimulcastCodec): unknown;
    create<I extends {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SimulcastCodec>]: never; }>(base?: I | undefined): SimulcastCodec;
    fromPartial<I_1 extends {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SimulcastCodec>]: never; }>(object: I_1): SimulcastCodec;
};
export declare const AddTrackRequest: {
    encode(message: AddTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddTrackRequest;
    fromJSON(object: any): AddTrackRequest;
    toJSON(message: AddTrackRequest): unknown;
    create<I extends {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
        simulcastCodecs?: {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] | undefined;
        sid?: string | undefined;
        stereo?: boolean | undefined;
        disableRed?: boolean | undefined;
        encryption?: Encryption_Type | undefined;
    } & {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K in Exclude<keyof I["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
        simulcastCodecs?: ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] & ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_3 in Exclude<keyof I["simulcastCodecs"], keyof {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[]>]: never; }) | undefined;
        sid?: string | undefined;
        stereo?: boolean | undefined;
        disableRed?: boolean | undefined;
        encryption?: Encryption_Type | undefined;
    } & { [K_4 in Exclude<keyof I, keyof AddTrackRequest>]: never; }>(base?: I | undefined): AddTrackRequest;
    fromPartial<I_1 extends {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
        simulcastCodecs?: {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] | undefined;
        sid?: string | undefined;
        stereo?: boolean | undefined;
        disableRed?: boolean | undefined;
        encryption?: Encryption_Type | undefined;
    } & {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["layers"][number], keyof VideoLayer>]: never; })[] & { [K_6 in Exclude<keyof I_1["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
        simulcastCodecs?: ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] & ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & { [K_7 in Exclude<keyof I_1["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_8 in Exclude<keyof I_1["simulcastCodecs"], keyof {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[]>]: never; }) | undefined;
        sid?: string | undefined;
        stereo?: boolean | undefined;
        disableRed?: boolean | undefined;
        encryption?: Encryption_Type | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof AddTrackRequest>]: never; }>(object: I_1): AddTrackRequest;
};
export declare const TrickleRequest: {
    encode(message: TrickleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrickleRequest;
    fromJSON(object: any): TrickleRequest;
    toJSON(message: TrickleRequest): unknown;
    create<I extends {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & { [K in Exclude<keyof I, keyof TrickleRequest>]: never; }>(base?: I | undefined): TrickleRequest;
    fromPartial<I_1 extends {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof TrickleRequest>]: never; }>(object: I_1): TrickleRequest;
};
export declare const MuteTrackRequest: {
    encode(message: MuteTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MuteTrackRequest;
    fromJSON(object: any): MuteTrackRequest;
    toJSON(message: MuteTrackRequest): unknown;
    create<I extends {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof MuteTrackRequest>]: never; }>(base?: I | undefined): MuteTrackRequest;
    fromPartial<I_1 extends {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof MuteTrackRequest>]: never; }>(object: I_1): MuteTrackRequest;
};
export declare const JoinResponse: {
    encode(message: JoinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JoinResponse;
    fromJSON(object: any): JoinResponse;
    toJSON(message: JoinResponse): unknown;
    create<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
        participant?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } | undefined;
        otherParticipants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
        serverVersion?: string | undefined;
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } | undefined;
        sifTrailer?: Uint8Array | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K in Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["room"], keyof Room>]: never; }) | undefined;
        participant?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_3 in Exclude<keyof I["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_4 in Exclude<keyof I["participant"]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_6 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_7 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_8 in Exclude<keyof I["participant"]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_9 in Exclude<keyof I["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_10 in Exclude<keyof I["participant"]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_11 in Exclude<keyof I["participant"]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_12 in Exclude<keyof I["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_13 in Exclude<keyof I["participant"], keyof ParticipantInfo>]: never; }) | undefined;
        otherParticipants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_14 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_15 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_16 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_17 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_18 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_19 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_20 in Exclude<keyof I["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_21 in Exclude<keyof I["otherParticipants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_22 in Exclude<keyof I["otherParticipants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_23 in Exclude<keyof I["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_24 in Exclude<keyof I["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_25 in Exclude<keyof I["otherParticipants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
        serverVersion?: string | undefined;
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & { [K_26 in Exclude<keyof I["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & { [K_27 in Exclude<keyof I["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_28 in Exclude<keyof I["iceServers"], keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>]: never; }) | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_29 in Exclude<keyof I["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_30 in Exclude<keyof I["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: ({
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } & {
                codecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_31 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_32 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
                publish?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_33 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_34 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_35 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & { [K_36 in Exclude<keyof I["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: ({
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & { [K_37 in Exclude<keyof I["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
        sifTrailer?: Uint8Array | undefined;
    } & { [K_38 in Exclude<keyof I, keyof JoinResponse>]: never; }>(base?: I | undefined): JoinResponse;
    fromPartial<I_1 extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
        participant?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } | undefined;
        otherParticipants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
        serverVersion?: string | undefined;
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } | undefined;
        sifTrailer?: Uint8Array | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K_39 in Exclude<keyof I_1["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_40 in Exclude<keyof I_1["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_41 in Exclude<keyof I_1["room"], keyof Room>]: never; }) | undefined;
        participant?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_42 in Exclude<keyof I_1["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_43 in Exclude<keyof I_1["participant"]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_44 in Exclude<keyof I_1["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_45 in Exclude<keyof I_1["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_46 in Exclude<keyof I_1["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_47 in Exclude<keyof I_1["participant"]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_48 in Exclude<keyof I_1["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_49 in Exclude<keyof I_1["participant"]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_50 in Exclude<keyof I_1["participant"]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_51 in Exclude<keyof I_1["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_52 in Exclude<keyof I_1["participant"], keyof ParticipantInfo>]: never; }) | undefined;
        otherParticipants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_53 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_54 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_55 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_56 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_57 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_58 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_59 in Exclude<keyof I_1["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_60 in Exclude<keyof I_1["otherParticipants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_61 in Exclude<keyof I_1["otherParticipants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_62 in Exclude<keyof I_1["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_63 in Exclude<keyof I_1["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_64 in Exclude<keyof I_1["otherParticipants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
        serverVersion?: string | undefined;
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & { [K_65 in Exclude<keyof I_1["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & { [K_66 in Exclude<keyof I_1["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_67 in Exclude<keyof I_1["iceServers"], keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>]: never; }) | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_68 in Exclude<keyof I_1["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_69 in Exclude<keyof I_1["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: ({
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } & {
                codecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_70 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_71 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
                publish?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_72 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_73 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_74 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & { [K_75 in Exclude<keyof I_1["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: ({
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & { [K_76 in Exclude<keyof I_1["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
        sifTrailer?: Uint8Array | undefined;
    } & { [K_77 in Exclude<keyof I_1, keyof JoinResponse>]: never; }>(object: I_1): JoinResponse;
};
export declare const ReconnectResponse: {
    encode(message: ReconnectResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ReconnectResponse;
    fromJSON(object: any): ReconnectResponse;
    toJSON(message: ReconnectResponse): unknown;
    create<I extends {
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
    } & {
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & { [K in Exclude<keyof I["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & { [K_1 in Exclude<keyof I["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_2 in Exclude<keyof I["iceServers"], keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>]: never; }) | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_3 in Exclude<keyof I["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_4 in Exclude<keyof I["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: ({
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } & {
                codecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_5 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_6 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
                publish?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_7 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_8 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_9 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & { [K_10 in Exclude<keyof I["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, keyof ReconnectResponse>]: never; }>(base?: I | undefined): ReconnectResponse;
    fromPartial<I_1 extends {
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
    } & {
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & { [K_12 in Exclude<keyof I_1["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & { [K_13 in Exclude<keyof I_1["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_14 in Exclude<keyof I_1["iceServers"], keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>]: never; }) | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_15 in Exclude<keyof I_1["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_16 in Exclude<keyof I_1["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: ({
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                publish?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } & {
                codecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_17 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_18 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
                publish?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_19 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["publish"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_20 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"]["publish"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_21 in Exclude<keyof I_1["clientConfiguration"]["disabledCodecs"], keyof import("./livekit_models").DisabledCodecs>]: never; }) | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & { [K_22 in Exclude<keyof I_1["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
    } & { [K_23 in Exclude<keyof I_1, keyof ReconnectResponse>]: never; }>(object: I_1): ReconnectResponse;
};
export declare const TrackPublishedResponse: {
    encode(message: TrackPublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackPublishedResponse;
    fromJSON(object: any): TrackPublishedResponse;
    toJSON(message: TrackPublishedResponse): unknown;
    create<I extends {
        cid?: string | undefined;
        track?: {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        track?: ({
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } & {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & { [K in Exclude<keyof I["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["track"]["layers"], keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>]: never; }) | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] & ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_2 in Exclude<keyof I["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_3 in Exclude<keyof I["track"]["codecs"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_5 in Exclude<keyof I["track"]["codecs"], keyof {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } & { [K_6 in Exclude<keyof I["track"], keyof TrackInfo>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof TrackPublishedResponse>]: never; }>(base?: I | undefined): TrackPublishedResponse;
    fromPartial<I_1 extends {
        cid?: string | undefined;
        track?: {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        track?: ({
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } & {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & { [K_8 in Exclude<keyof I_1["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_9 in Exclude<keyof I_1["track"]["layers"], keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>]: never; }) | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] & ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_10 in Exclude<keyof I_1["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_11 in Exclude<keyof I_1["track"]["codecs"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I_1["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_13 in Exclude<keyof I_1["track"]["codecs"], keyof {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            stereo?: boolean | undefined;
            disableRed?: boolean | undefined;
            encryption?: Encryption_Type | undefined;
        } & { [K_14 in Exclude<keyof I_1["track"], keyof TrackInfo>]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I_1, keyof TrackPublishedResponse>]: never; }>(object: I_1): TrackPublishedResponse;
};
export declare const TrackUnpublishedResponse: {
    encode(message: TrackUnpublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackUnpublishedResponse;
    fromJSON(object: any): TrackUnpublishedResponse;
    toJSON(message: TrackUnpublishedResponse): unknown;
    create<I extends {
        trackSid?: string | undefined;
    } & {
        trackSid?: string | undefined;
    } & { [K in Exclude<keyof I, "trackSid">]: never; }>(base?: I | undefined): TrackUnpublishedResponse;
    fromPartial<I_1 extends {
        trackSid?: string | undefined;
    } & {
        trackSid?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "trackSid">]: never; }>(object: I_1): TrackUnpublishedResponse;
};
export declare const SessionDescription: {
    encode(message: SessionDescription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SessionDescription;
    fromJSON(object: any): SessionDescription;
    toJSON(message: SessionDescription): unknown;
    create<I extends {
        type?: string | undefined;
        sdp?: string | undefined;
    } & {
        type?: string | undefined;
        sdp?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SessionDescription>]: never; }>(base?: I | undefined): SessionDescription;
    fromPartial<I_1 extends {
        type?: string | undefined;
        sdp?: string | undefined;
    } & {
        type?: string | undefined;
        sdp?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SessionDescription>]: never; }>(object: I_1): SessionDescription;
};
export declare const ParticipantUpdate: {
    encode(message: ParticipantUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ParticipantUpdate;
    fromJSON(object: any): ParticipantUpdate;
    toJSON(message: ParticipantUpdate): unknown;
    create<I extends {
        participants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
    } & {
        participants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K in Exclude<keyof I["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["participants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_3 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_5 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_6 in Exclude<keyof I["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_7 in Exclude<keyof I["participants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_8 in Exclude<keyof I["participants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_9 in Exclude<keyof I["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_10 in Exclude<keyof I["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_11 in Exclude<keyof I["participants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, "participants">]: never; }>(base?: I | undefined): ParticipantUpdate;
    fromPartial<I_1 extends {
        participants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
    } & {
        participants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_13 in Exclude<keyof I_1["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_14 in Exclude<keyof I_1["participants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_15 in Exclude<keyof I_1["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_16 in Exclude<keyof I_1["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_17 in Exclude<keyof I_1["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_18 in Exclude<keyof I_1["participants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_19 in Exclude<keyof I_1["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_20 in Exclude<keyof I_1["participants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: (TrackSource[] & TrackSource[] & { [K_21 in Exclude<keyof I_1["participants"][number]["permission"]["canPublishSources"], keyof TrackSource[]>]: never; }) | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } & { [K_22 in Exclude<keyof I_1["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_23 in Exclude<keyof I_1["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_24 in Exclude<keyof I_1["participants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                canPublishSources?: TrackSource[] | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
                canUpdateMetadata?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_25 in Exclude<keyof I_1, "participants">]: never; }>(object: I_1): ParticipantUpdate;
};
export declare const UpdateSubscription: {
    encode(message: UpdateSubscription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSubscription;
    fromJSON(object: any): UpdateSubscription;
    toJSON(message: UpdateSubscription): unknown;
    create<I extends {
        trackSids?: string[] | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        } & {
            participantSid?: string | undefined;
            trackSids?: (string[] & string[] & { [K_1 in Exclude<keyof I["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_3 in Exclude<keyof I["participantTracks"], keyof {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof UpdateSubscription>]: never; }>(base?: I | undefined): UpdateSubscription;
    fromPartial<I_1 extends {
        trackSids?: string[] | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["trackSids"], keyof string[]>]: never; }) | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        } & {
            participantSid?: string | undefined;
            trackSids?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_8 in Exclude<keyof I_1["participantTracks"], keyof {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof UpdateSubscription>]: never; }>(object: I_1): UpdateSubscription;
};
export declare const UpdateTrackSettings: {
    encode(message: UpdateTrackSettings, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTrackSettings;
    fromJSON(object: any): UpdateTrackSettings;
    toJSON(message: UpdateTrackSettings): unknown;
    create<I extends {
        trackSids?: string[] | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
        fps?: number | undefined;
        priority?: number | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
        fps?: number | undefined;
        priority?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof UpdateTrackSettings>]: never; }>(base?: I | undefined): UpdateTrackSettings;
    fromPartial<I_1 extends {
        trackSids?: string[] | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
        fps?: number | undefined;
        priority?: number | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["trackSids"], keyof string[]>]: never; }) | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
        fps?: number | undefined;
        priority?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof UpdateTrackSettings>]: never; }>(object: I_1): UpdateTrackSettings;
};
export declare const LeaveRequest: {
    encode(message: LeaveRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaveRequest;
    fromJSON(object: any): LeaveRequest;
    toJSON(message: LeaveRequest): unknown;
    create<I extends {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & { [K in Exclude<keyof I, keyof LeaveRequest>]: never; }>(base?: I | undefined): LeaveRequest;
    fromPartial<I_1 extends {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof LeaveRequest>]: never; }>(object: I_1): LeaveRequest;
};
export declare const UpdateVideoLayers: {
    encode(message: UpdateVideoLayers, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateVideoLayers;
    fromJSON(object: any): UpdateVideoLayers;
    toJSON(message: UpdateVideoLayers): unknown;
    create<I extends {
        trackSid?: string | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K in Exclude<keyof I["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof UpdateVideoLayers>]: never; }>(base?: I | undefined): UpdateVideoLayers;
    fromPartial<I_1 extends {
        trackSid?: string | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["layers"][number], keyof VideoLayer>]: never; })[] & { [K_4 in Exclude<keyof I_1["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof UpdateVideoLayers>]: never; }>(object: I_1): UpdateVideoLayers;
};
export declare const UpdateParticipantMetadata: {
    encode(message: UpdateParticipantMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParticipantMetadata;
    fromJSON(object: any): UpdateParticipantMetadata;
    toJSON(message: UpdateParticipantMetadata): unknown;
    create<I extends {
        metadata?: string | undefined;
        name?: string | undefined;
    } & {
        metadata?: string | undefined;
        name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof UpdateParticipantMetadata>]: never; }>(base?: I | undefined): UpdateParticipantMetadata;
    fromPartial<I_1 extends {
        metadata?: string | undefined;
        name?: string | undefined;
    } & {
        metadata?: string | undefined;
        name?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateParticipantMetadata>]: never; }>(object: I_1): UpdateParticipantMetadata;
};
export declare const ICEServer: {
    encode(message: ICEServer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ICEServer;
    fromJSON(object: any): ICEServer;
    toJSON(message: ICEServer): unknown;
    create<I extends {
        urls?: string[] | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & {
        urls?: (string[] & string[] & { [K in Exclude<keyof I["urls"], keyof string[]>]: never; }) | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ICEServer>]: never; }>(base?: I | undefined): ICEServer;
    fromPartial<I_1 extends {
        urls?: string[] | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & {
        urls?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["urls"], keyof string[]>]: never; }) | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ICEServer>]: never; }>(object: I_1): ICEServer;
};
export declare const SpeakersChanged: {
    encode(message: SpeakersChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SpeakersChanged;
    fromJSON(object: any): SpeakersChanged;
    toJSON(message: SpeakersChanged): unknown;
    create<I extends {
        speakers?: {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] | undefined;
    } & {
        speakers?: ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & { [K in Exclude<keyof I["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_1 in Exclude<keyof I["speakers"], keyof {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "speakers">]: never; }>(base?: I | undefined): SpeakersChanged;
    fromPartial<I_1 extends {
        speakers?: {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] | undefined;
    } & {
        speakers?: ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_4 in Exclude<keyof I_1["speakers"], keyof {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "speakers">]: never; }>(object: I_1): SpeakersChanged;
};
export declare const RoomUpdate: {
    encode(message: RoomUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RoomUpdate;
    fromJSON(object: any): RoomUpdate;
    toJSON(message: RoomUpdate): unknown;
    create<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K in Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["room"], keyof Room>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "room">]: never; }>(base?: I | undefined): RoomUpdate;
    fromPartial<I_1 extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_5 in Exclude<keyof I_1["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            numPublishers?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_6 in Exclude<keyof I_1["room"], keyof Room>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, "room">]: never; }>(object: I_1): RoomUpdate;
};
export declare const ConnectionQualityInfo: {
    encode(message: ConnectionQualityInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionQualityInfo;
    fromJSON(object: any): ConnectionQualityInfo;
    toJSON(message: ConnectionQualityInfo): unknown;
    create<I extends {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ConnectionQualityInfo>]: never; }>(base?: I | undefined): ConnectionQualityInfo;
    fromPartial<I_1 extends {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ConnectionQualityInfo>]: never; }>(object: I_1): ConnectionQualityInfo;
};
export declare const ConnectionQualityUpdate: {
    encode(message: ConnectionQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionQualityUpdate;
    fromJSON(object: any): ConnectionQualityUpdate;
    toJSON(message: ConnectionQualityUpdate): unknown;
    create<I extends {
        updates?: {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] & ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_1 in Exclude<keyof I["updates"], keyof {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "updates">]: never; }>(base?: I | undefined): ConnectionQualityUpdate;
    fromPartial<I_1 extends {
        updates?: {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] & ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_4 in Exclude<keyof I_1["updates"], keyof {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "updates">]: never; }>(object: I_1): ConnectionQualityUpdate;
};
export declare const StreamStateInfo: {
    encode(message: StreamStateInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamStateInfo;
    fromJSON(object: any): StreamStateInfo;
    toJSON(message: StreamStateInfo): unknown;
    create<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & { [K in Exclude<keyof I, keyof StreamStateInfo>]: never; }>(base?: I | undefined): StreamStateInfo;
    fromPartial<I_1 extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof StreamStateInfo>]: never; }>(object: I_1): StreamStateInfo;
};
export declare const StreamStateUpdate: {
    encode(message: StreamStateUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamStateUpdate;
    fromJSON(object: any): StreamStateUpdate;
    toJSON(message: StreamStateUpdate): unknown;
    create<I extends {
        streamStates?: {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] | undefined;
    } & {
        streamStates?: ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & { [K in Exclude<keyof I["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_1 in Exclude<keyof I["streamStates"], keyof {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "streamStates">]: never; }>(base?: I | undefined): StreamStateUpdate;
    fromPartial<I_1 extends {
        streamStates?: {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] | undefined;
    } & {
        streamStates?: ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & { [K_3 in Exclude<keyof I_1["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_4 in Exclude<keyof I_1["streamStates"], keyof {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "streamStates">]: never; }>(object: I_1): StreamStateUpdate;
};
export declare const SubscribedQuality: {
    encode(message: SubscribedQuality, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedQuality;
    fromJSON(object: any): SubscribedQuality;
    toJSON(message: SubscribedQuality): unknown;
    create<I extends {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SubscribedQuality>]: never; }>(base?: I | undefined): SubscribedQuality;
    fromPartial<I_1 extends {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SubscribedQuality>]: never; }>(object: I_1): SubscribedQuality;
};
export declare const SubscribedCodec: {
    encode(message: SubscribedCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedCodec;
    fromJSON(object: any): SubscribedCodec;
    toJSON(message: SubscribedCodec): unknown;
    create<I extends {
        codec?: string | undefined;
        qualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } & {
        codec?: string | undefined;
        qualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K in Exclude<keyof I["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_1 in Exclude<keyof I["qualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SubscribedCodec>]: never; }>(base?: I | undefined): SubscribedCodec;
    fromPartial<I_1 extends {
        codec?: string | undefined;
        qualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } & {
        codec?: string | undefined;
        qualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_4 in Exclude<keyof I_1["qualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof SubscribedCodec>]: never; }>(object: I_1): SubscribedCodec;
};
export declare const SubscribedQualityUpdate: {
    encode(message: SubscribedQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedQualityUpdate;
    fromJSON(object: any): SubscribedQualityUpdate;
    toJSON(message: SubscribedQualityUpdate): unknown;
    create<I extends {
        trackSid?: string | undefined;
        subscribedQualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        subscribedCodecs?: {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        subscribedQualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K in Exclude<keyof I["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_1 in Exclude<keyof I["subscribedQualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
        subscribedCodecs?: ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } & {
            codec?: string | undefined;
            qualities?: ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & { [K_2 in Exclude<keyof I["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_3 in Exclude<keyof I["subscribedCodecs"][number]["qualities"], keyof {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_5 in Exclude<keyof I["subscribedCodecs"], keyof {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof SubscribedQualityUpdate>]: never; }>(base?: I | undefined): SubscribedQualityUpdate;
    fromPartial<I_1 extends {
        trackSid?: string | undefined;
        subscribedQualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        subscribedCodecs?: {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        subscribedQualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K_7 in Exclude<keyof I_1["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_8 in Exclude<keyof I_1["subscribedQualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
        subscribedCodecs?: ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } & {
            codec?: string | undefined;
            qualities?: ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & { [K_9 in Exclude<keyof I_1["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_10 in Exclude<keyof I_1["subscribedCodecs"][number]["qualities"], keyof {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I_1["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_12 in Exclude<keyof I_1["subscribedCodecs"], keyof {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof SubscribedQualityUpdate>]: never; }>(object: I_1): SubscribedQualityUpdate;
};
export declare const TrackPermission: {
    encode(message: TrackPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackPermission;
    fromJSON(object: any): TrackPermission;
    toJSON(message: TrackPermission): unknown;
    create<I extends {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: string[] | undefined;
        participantIdentity?: string | undefined;
    } & {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        participantIdentity?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof TrackPermission>]: never; }>(base?: I | undefined): TrackPermission;
    fromPartial<I_1 extends {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: string[] | undefined;
        participantIdentity?: string | undefined;
    } & {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["trackSids"], keyof string[]>]: never; }) | undefined;
        participantIdentity?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof TrackPermission>]: never; }>(object: I_1): TrackPermission;
};
export declare const SubscriptionPermission: {
    encode(message: SubscriptionPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionPermission;
    fromJSON(object: any): SubscriptionPermission;
    toJSON(message: SubscriptionPermission): unknown;
    create<I extends {
        allParticipants?: boolean | undefined;
        trackPermissions?: {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] | undefined;
    } & {
        allParticipants?: boolean | undefined;
        trackPermissions?: ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] & ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        } & {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            participantIdentity?: string | undefined;
        } & { [K_1 in Exclude<keyof I["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_2 in Exclude<keyof I["trackPermissions"], keyof {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof SubscriptionPermission>]: never; }>(base?: I | undefined): SubscriptionPermission;
    fromPartial<I_1 extends {
        allParticipants?: boolean | undefined;
        trackPermissions?: {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] | undefined;
    } & {
        allParticipants?: boolean | undefined;
        trackPermissions?: ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] & ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        } & {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            participantIdentity?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_6 in Exclude<keyof I_1["trackPermissions"], keyof {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof SubscriptionPermission>]: never; }>(object: I_1): SubscriptionPermission;
};
export declare const SubscriptionPermissionUpdate: {
    encode(message: SubscriptionPermissionUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionPermissionUpdate;
    fromJSON(object: any): SubscriptionPermissionUpdate;
    toJSON(message: SubscriptionPermissionUpdate): unknown;
    create<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SubscriptionPermissionUpdate>]: never; }>(base?: I | undefined): SubscriptionPermissionUpdate;
    fromPartial<I_1 extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SubscriptionPermissionUpdate>]: never; }>(object: I_1): SubscriptionPermissionUpdate;
};
export declare const SyncState: {
    encode(message: SyncState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SyncState;
    fromJSON(object: any): SyncState;
    toJSON(message: SyncState): unknown;
    create<I extends {
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        subscription?: {
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } | undefined;
        publishTracks?: {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[] | undefined;
        dataChannels?: {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] | undefined;
        offer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
    } & {
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K in Exclude<keyof I["answer"], keyof SessionDescription>]: never; }) | undefined;
        subscription?: ({
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } & {
            trackSids?: (string[] & string[] & { [K_1 in Exclude<keyof I["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            } & {
                participantSid?: string | undefined;
                trackSids?: (string[] & string[] & { [K_2 in Exclude<keyof I["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_4 in Exclude<keyof I["subscription"]["participantTracks"], keyof {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
        publishTracks?: ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[] & ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            cid?: string | undefined;
            track?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_6 in Exclude<keyof I["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_7 in Exclude<keyof I["publishTracks"][number]["track"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_9 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_10 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_11 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_12 in Exclude<keyof I["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
        } & { [K_13 in Exclude<keyof I["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_14 in Exclude<keyof I["publishTracks"], keyof {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        dataChannels?: ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] & ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & { [K_15 in Exclude<keyof I["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_16 in Exclude<keyof I["dataChannels"], keyof {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[]>]: never; }) | undefined;
        offer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K_17 in Exclude<keyof I["offer"], keyof SessionDescription>]: never; }) | undefined;
    } & { [K_18 in Exclude<keyof I, keyof SyncState>]: never; }>(base?: I | undefined): SyncState;
    fromPartial<I_1 extends {
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        subscription?: {
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } | undefined;
        publishTracks?: {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[] | undefined;
        dataChannels?: {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] | undefined;
        offer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
    } & {
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K_19 in Exclude<keyof I_1["answer"], keyof SessionDescription>]: never; }) | undefined;
        subscription?: ({
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } & {
            trackSids?: (string[] & string[] & { [K_20 in Exclude<keyof I_1["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            } & {
                participantSid?: string | undefined;
                trackSids?: (string[] & string[] & { [K_21 in Exclude<keyof I_1["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            } & { [K_22 in Exclude<keyof I_1["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_23 in Exclude<keyof I_1["subscription"]["participantTracks"], keyof {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_24 in Exclude<keyof I_1["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
        publishTracks?: ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[] & ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        } & {
            cid?: string | undefined;
            track?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_25 in Exclude<keyof I_1["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_26 in Exclude<keyof I_1["publishTracks"][number]["track"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_27 in Exclude<keyof I_1["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_28 in Exclude<keyof I_1["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_29 in Exclude<keyof I_1["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_30 in Exclude<keyof I_1["publishTracks"][number]["track"]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } & { [K_31 in Exclude<keyof I_1["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
        } & { [K_32 in Exclude<keyof I_1["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_33 in Exclude<keyof I_1["publishTracks"], keyof {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
                stereo?: boolean | undefined;
                disableRed?: boolean | undefined;
                encryption?: Encryption_Type | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        dataChannels?: ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] & ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & { [K_34 in Exclude<keyof I_1["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_35 in Exclude<keyof I_1["dataChannels"], keyof {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[]>]: never; }) | undefined;
        offer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K_36 in Exclude<keyof I_1["offer"], keyof SessionDescription>]: never; }) | undefined;
    } & { [K_37 in Exclude<keyof I_1, keyof SyncState>]: never; }>(object: I_1): SyncState;
};
export declare const DataChannelInfo: {
    encode(message: DataChannelInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DataChannelInfo;
    fromJSON(object: any): DataChannelInfo;
    toJSON(message: DataChannelInfo): unknown;
    create<I extends {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & { [K in Exclude<keyof I, keyof DataChannelInfo>]: never; }>(base?: I | undefined): DataChannelInfo;
    fromPartial<I_1 extends {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof DataChannelInfo>]: never; }>(object: I_1): DataChannelInfo;
};
export declare const SimulateScenario: {
    encode(message: SimulateScenario, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulateScenario;
    fromJSON(object: any): SimulateScenario;
    toJSON(message: SimulateScenario): unknown;
    create<I extends {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        }) | ({
            subscriberBandwidth?: number | undefined;
        } & {
            $case: "subscriberBandwidth";
        }) | undefined;
    } & {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        } & {
            speakerUpdate?: number | undefined;
            $case: "speakerUpdate";
        } & { [K in Exclude<keyof I["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        } & {
            nodeFailure?: boolean | undefined;
            $case: "nodeFailure";
        } & { [K_1 in Exclude<keyof I["scenario"], "nodeFailure" | "$case">]: never; }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        } & {
            migration?: boolean | undefined;
            $case: "migration";
        } & { [K_2 in Exclude<keyof I["scenario"], "migration" | "$case">]: never; }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        } & {
            serverLeave?: boolean | undefined;
            $case: "serverLeave";
        } & { [K_3 in Exclude<keyof I["scenario"], "serverLeave" | "$case">]: never; }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        } & {
            switchCandidateProtocol?: CandidateProtocol | undefined;
            $case: "switchCandidateProtocol";
        } & { [K_4 in Exclude<keyof I["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | ({
            subscriberBandwidth?: number | undefined;
        } & {
            $case: "subscriberBandwidth";
        } & {
            subscriberBandwidth?: number | undefined;
            $case: "subscriberBandwidth";
        } & { [K_5 in Exclude<keyof I["scenario"], "subscriberBandwidth" | "$case">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "scenario">]: never; }>(base?: I | undefined): SimulateScenario;
    fromPartial<I_1 extends {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        }) | ({
            subscriberBandwidth?: number | undefined;
        } & {
            $case: "subscriberBandwidth";
        }) | undefined;
    } & {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        } & {
            speakerUpdate?: number | undefined;
            $case: "speakerUpdate";
        } & { [K_7 in Exclude<keyof I_1["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        } & {
            nodeFailure?: boolean | undefined;
            $case: "nodeFailure";
        } & { [K_8 in Exclude<keyof I_1["scenario"], "nodeFailure" | "$case">]: never; }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        } & {
            migration?: boolean | undefined;
            $case: "migration";
        } & { [K_9 in Exclude<keyof I_1["scenario"], "migration" | "$case">]: never; }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        } & {
            serverLeave?: boolean | undefined;
            $case: "serverLeave";
        } & { [K_10 in Exclude<keyof I_1["scenario"], "serverLeave" | "$case">]: never; }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        } & {
            switchCandidateProtocol?: CandidateProtocol | undefined;
            $case: "switchCandidateProtocol";
        } & { [K_11 in Exclude<keyof I_1["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | ({
            subscriberBandwidth?: number | undefined;
        } & {
            $case: "subscriberBandwidth";
        } & {
            subscriberBandwidth?: number | undefined;
            $case: "subscriberBandwidth";
        } & { [K_12 in Exclude<keyof I_1["scenario"], "subscriberBandwidth" | "$case">]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, "scenario">]: never; }>(object: I_1): SimulateScenario;
};
export declare const Ping: {
    encode(message: Ping, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Ping;
    fromJSON(object: any): Ping;
    toJSON(message: Ping): unknown;
    create<I extends {
        timestamp?: number | undefined;
        rtt?: number | undefined;
    } & {
        timestamp?: number | undefined;
        rtt?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Ping>]: never; }>(base?: I | undefined): Ping;
    fromPartial<I_1 extends {
        timestamp?: number | undefined;
        rtt?: number | undefined;
    } & {
        timestamp?: number | undefined;
        rtt?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Ping>]: never; }>(object: I_1): Ping;
};
export declare const Pong: {
    encode(message: Pong, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Pong;
    fromJSON(object: any): Pong;
    toJSON(message: Pong): unknown;
    create<I extends {
        lastPingTimestamp?: number | undefined;
        timestamp?: number | undefined;
    } & {
        lastPingTimestamp?: number | undefined;
        timestamp?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Pong>]: never; }>(base?: I | undefined): Pong;
    fromPartial<I_1 extends {
        lastPingTimestamp?: number | undefined;
        timestamp?: number | undefined;
    } & {
        lastPingTimestamp?: number | undefined;
        timestamp?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Pong>]: never; }>(object: I_1): Pong;
};
export declare const RegionSettings: {
    encode(message: RegionSettings, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RegionSettings;
    fromJSON(object: any): RegionSettings;
    toJSON(message: RegionSettings): unknown;
    create<I extends {
        regions?: {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[] | undefined;
    } & {
        regions?: ({
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[] & ({
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        } & {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        } & { [K in Exclude<keyof I["regions"][number], keyof RegionInfo>]: never; })[] & { [K_1 in Exclude<keyof I["regions"], keyof {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "regions">]: never; }>(base?: I | undefined): RegionSettings;
    fromPartial<I_1 extends {
        regions?: {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[] | undefined;
    } & {
        regions?: ({
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[] & ({
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        } & {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["regions"][number], keyof RegionInfo>]: never; })[] & { [K_4 in Exclude<keyof I_1["regions"], keyof {
            region?: string | undefined;
            url?: string | undefined;
            distance?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "regions">]: never; }>(object: I_1): RegionSettings;
};
export declare const RegionInfo: {
    encode(message: RegionInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RegionInfo;
    fromJSON(object: any): RegionInfo;
    toJSON(message: RegionInfo): unknown;
    create<I extends {
        region?: string | undefined;
        url?: string | undefined;
        distance?: number | undefined;
    } & {
        region?: string | undefined;
        url?: string | undefined;
        distance?: number | undefined;
    } & { [K in Exclude<keyof I, keyof RegionInfo>]: never; }>(base?: I | undefined): RegionInfo;
    fromPartial<I_1 extends {
        region?: string | undefined;
        url?: string | undefined;
        distance?: number | undefined;
    } & {
        region?: string | undefined;
        url?: string | undefined;
        distance?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RegionInfo>]: never; }>(object: I_1): RegionInfo;
};
export declare const SubscriptionResponse: {
    encode(message: SubscriptionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionResponse;
    fromJSON(object: any): SubscriptionResponse;
    toJSON(message: SubscriptionResponse): unknown;
    create<I extends {
        trackSid?: string | undefined;
        err?: SubscriptionError | undefined;
    } & {
        trackSid?: string | undefined;
        err?: SubscriptionError | undefined;
    } & { [K in Exclude<keyof I, keyof SubscriptionResponse>]: never; }>(base?: I | undefined): SubscriptionResponse;
    fromPartial<I_1 extends {
        trackSid?: string | undefined;
        err?: SubscriptionError | undefined;
    } & {
        trackSid?: string | undefined;
        err?: SubscriptionError | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SubscriptionResponse>]: never; }>(object: I_1): SubscriptionResponse;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
//# sourceMappingURL=livekit_rtc.d.ts.map