import type { SignalClient } from '../../api/SignalClient';
import type { ParticipantInfo } from '../../proto/livekit_models';
import RemoteTrackPublication from '../track/RemoteTrackPublication';
import { Track } from '../track/Track';
import type { AudioOutputOptions } from '../track/options';
import type { AdaptiveStreamSettings } from '../track/types';
import Participant from './Participant';
import type { ParticipantEventCallbacks } from './Participant';
export default class RemoteParticipant extends Participant {
    audioTracks: Map<string, RemoteTrackPublication>;
    videoTracks: Map<string, RemoteTrackPublication>;
    tracks: Map<string, RemoteTrackPublication>;
    signalClient: SignalClient;
    private volume?;
    private audioContext?;
    private audioOutput?;
    /** @internal */
    static fromParticipantInfo(signalClient: SignalClient, pi: ParticipantInfo): RemoteParticipant;
    /** @internal */
    constructor(signalClient: SignalClient, sid: string, identity?: string, name?: string, metadata?: string);
    protected addTrackPublication(publication: RemoteTrackPublication): void;
    getTrack(source: Track.Source): RemoteTrackPublication | undefined;
    getTrackByName(name: string): RemoteTrackPublication | undefined;
    /**
     * sets the volume on the participant's microphone track
     * if no track exists the volume will be applied when the microphone track is added
     */
    setVolume(volume: number): void;
    /**
     * gets the volume on the participant's microphone track
     */
    getVolume(): number | undefined;
    /** @internal */
    addSubscribedMediaTrack(mediaTrack: MediaStreamTrack, sid: Track.SID, mediaStream: MediaStream, receiver?: RTCRtpReceiver, adaptiveStreamSettings?: AdaptiveStreamSettings, triesLeft?: number): RemoteTrackPublication | undefined;
    /** @internal */
    get hasMetadata(): boolean;
    getTrackPublication(sid: Track.SID): RemoteTrackPublication | undefined;
    /** @internal */
    updateInfo(info: ParticipantInfo): boolean;
    /** @internal */
    unpublishTrack(sid: Track.SID, sendUnpublish?: boolean): void;
    /**
     * @internal
     */
    setAudioContext(ctx: AudioContext | undefined): void;
    /**
     * @internal
     */
    setAudioOutput(output: AudioOutputOptions): Promise<void>;
    /** @internal */
    emit<E extends keyof ParticipantEventCallbacks>(event: E, ...args: Parameters<ParticipantEventCallbacks[E]>): boolean;
}
//# sourceMappingURL=RemoteParticipant.d.ts.map
