## API Report File for "@fluidframework/protocol-base"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as git from '@fluidframework/gitresources';
import { IAttachment } from '@fluidframework/protocol-definitions';
import { IBlob } from '@fluidframework/protocol-definitions';
import { ICommittedProposal } from '@fluidframework/protocol-definitions';
import { ICreateTreeEntry } from '@fluidframework/gitresources';
import { IDocumentAttributes } from '@fluidframework/protocol-definitions';
import { IProcessMessageResult } from '@fluidframework/protocol-definitions';
import { IQuorum } from '@fluidframework/protocol-definitions';
import { IQuorumClients } from '@fluidframework/protocol-definitions';
import { IQuorumClientsEvents } from '@fluidframework/protocol-definitions';
import { IQuorumEvents } from '@fluidframework/protocol-definitions';
import { IQuorumProposals } from '@fluidframework/protocol-definitions';
import { IQuorumProposalsEvents } from '@fluidframework/protocol-definitions';
import { ISequencedClient } from '@fluidframework/protocol-definitions';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISequencedProposal } from '@fluidframework/protocol-definitions';
import { ISnapshotTreeEx } from '@fluidframework/protocol-definitions';
import { ITree } from '@fluidframework/protocol-definitions';
import { ITree as ITree_2 } from '@fluidframework/gitresources';
import { ITreeEntry } from '@fluidframework/protocol-definitions';
import { SummaryObject } from '@fluidframework/protocol-definitions';
import { TypedEventEmitter } from '@fluidframework/common-utils';

// @public (undocumented)
export function addBlobToTree(tree: ITree, blobName: string, content: object): void;

// @public
export class AttachmentTreeEntry {
    constructor(path: string, id: string);
    // (undocumented)
    readonly id: string;
    // (undocumented)
    readonly mode = FileMode.File;
    // (undocumented)
    readonly path: string;
    // (undocumented)
    readonly type = TreeEntry.Attachment;
    // (undocumented)
    readonly value: IAttachment;
}

// @public
export class BlobTreeEntry {
    constructor(path: string, contents: string, encoding?: "utf-8" | "base64");
    // (undocumented)
    readonly mode = FileMode.File;
    // (undocumented)
    readonly path: string;
    // (undocumented)
    readonly type = TreeEntry.Blob;
    // (undocumented)
    readonly value: IBlob;
}

// @public
export function buildHierarchy(flatTree: git.ITree, blobsShaToPathCache?: Map<string, string>, removeAppTreePrefix?: boolean): ISnapshotTreeEx;

// @public (undocumented)
export function generateServiceProtocolEntries(deli: string, scribe: string): ITreeEntry[];

// @public
export function getGitMode(value: SummaryObject): string;

// @public
export function getGitType(value: SummaryObject): "blob" | "tree";

// @public (undocumented)
export function getQuorumTreeEntries(documentId: string, minimumSequenceNumber: number, sequenceNumber: number, term: number, quorumSnapshot: IQuorumSnapshot): ITreeEntry[];

// @public (undocumented)
export interface ILocalSequencedClient extends ISequencedClient {
    shouldHaveLeft?: boolean;
}

// @public (undocumented)
export interface IProtocolHandler {
    // (undocumented)
    readonly attributes: IDocumentAttributes;
    // (undocumented)
    close(): void;
    // (undocumented)
    getProtocolState(): IScribeProtocolState;
    // (undocumented)
    processMessage(message: ISequencedDocumentMessage, local: boolean): IProcessMessageResult;
    // (undocumented)
    readonly quorum: IQuorum;
    // (undocumented)
    setConnectionState(connected: boolean, clientId: string | undefined): any;
    // (undocumented)
    snapshot(): IQuorumSnapshot;
}

// @public
export interface IQuorumSnapshot {
    // (undocumented)
    members: QuorumClientsSnapshot;
    // (undocumented)
    proposals: QuorumProposalsSnapshot["proposals"];
    // (undocumented)
    values: QuorumProposalsSnapshot["values"];
}

// @public (undocumented)
export interface IScribeProtocolState {
    // (undocumented)
    members: [string, ISequencedClient][];
    // (undocumented)
    minimumSequenceNumber: number;
    // (undocumented)
    proposals: [number, ISequencedProposal, string[]][];
    // (undocumented)
    sequenceNumber: number;
    // (undocumented)
    values: [string, ICommittedProposal][];
}

// @public
export const isServiceMessageType: (type: string) => boolean;

// @public (undocumented)
export function isSystemMessage(message: ISequencedDocumentMessage): boolean;

// @public (undocumented)
export function mergeAppAndProtocolTree(appSummaryTree: ITree_2, protocolTree: ITree_2): ICreateTreeEntry[];

// @public
export class ProtocolOpHandler implements IProtocolHandler {
    constructor(minimumSequenceNumber: number, sequenceNumber: number, term: number | undefined, members: [string, ISequencedClient][], proposals: [number, ISequencedProposal, string[]][], values: [string, ICommittedProposal][], sendProposal: (key: string, value: any) => number);
    // (undocumented)
    get attributes(): IDocumentAttributes;
    // (undocumented)
    close(): void;
    getProtocolState(): IScribeProtocolState;
    // (undocumented)
    minimumSequenceNumber: number;
    // (undocumented)
    processMessage(message: ISequencedDocumentMessage, local: boolean): IProcessMessageResult;
    // (undocumented)
    get quorum(): Quorum;
    // (undocumented)
    readonly _quorum: Quorum;
    // (undocumented)
    sequenceNumber: number;
    // (undocumented)
    setConnectionState(connected: boolean, clientId: string | undefined): void;
    // (undocumented)
    snapshot(): IQuorumSnapshot;
    // (undocumented)
    readonly term: number;
}

// @public (undocumented)
export class ProtocolOpHandlerWithClientValidation extends ProtocolOpHandler {
    // (undocumented)
    processMessage(message: ISequencedDocumentMessage, local: boolean): IProcessMessageResult;
}

// @public
export class Quorum extends TypedEventEmitter<IQuorumEvents> implements IQuorum {
    constructor(members: QuorumClientsSnapshot, proposals: QuorumProposalsSnapshot["proposals"], values: QuorumProposalsSnapshot["values"], sendProposal: (key: string, value: any) => number);
    addMember(clientId: string, details: ISequencedClient): void;
    addProposal(key: string, value: any, sequenceNumber: number, local: boolean, clientSequenceNumber: number): void;
    // (undocumented)
    close(): void;
    // (undocumented)
    dispose(): void;
    // (undocumented)
    get disposed(): boolean;
    get(key: string): any;
    // @deprecated
    getApprovalData(key: string): ICommittedProposal | undefined;
    getMember(clientId: string): ISequencedClient | undefined;
    getMembers(): Map<string, ISequencedClient>;
    has(key: string): boolean;
    propose(key: string, value: any): Promise<void>;
    removeMember(clientId: string): void;
    // (undocumented)
    setConnectionState(connected: boolean, clientId?: string): void;
    snapshot(): IQuorumSnapshot;
    updateMinimumSequenceNumber(message: ISequencedDocumentMessage): void;
}

// @public
export class QuorumClients extends TypedEventEmitter<IQuorumClientsEvents> implements IQuorumClients {
    constructor(snapshot: QuorumClientsSnapshot);
    addMember(clientId: string, details: ISequencedClient): void;
    // (undocumented)
    dispose(): void;
    // (undocumented)
    get disposed(): boolean;
    getMember(clientId: string): ISequencedClient | undefined;
    getMembers(): Map<string, ISequencedClient>;
    removeMember(clientId: string): void;
    snapshot(): QuorumClientsSnapshot;
}

// @public
export type QuorumClientsSnapshot = [string, ISequencedClient][];

// @public
export class QuorumProposals extends TypedEventEmitter<IQuorumProposalsEvents> implements IQuorumProposals {
    constructor(snapshot: QuorumProposalsSnapshot, sendProposal: (key: string, value: any) => number);
    addProposal(key: string, value: any, sequenceNumber: number, local: boolean, clientSequenceNumber: number): void;
    // (undocumented)
    dispose(): void;
    // (undocumented)
    get disposed(): boolean;
    get(key: string): any;
    // @deprecated
    getApprovalData(key: string): ICommittedProposal | undefined;
    has(key: string): boolean;
    propose(key: string, value: any): Promise<void>;
    // (undocumented)
    setConnectionState(connected: boolean): void;
    snapshot(): QuorumProposalsSnapshot;
    updateMinimumSequenceNumber(message: ISequencedDocumentMessage): void;
}

// @public
export type QuorumProposalsSnapshot = {
    proposals: [number, ISequencedProposal, string[]][];
    values: [string, ICommittedProposal][];
};

// @public
export class TreeTreeEntry {
    constructor(path: string, value: ITree);
    // (undocumented)
    readonly mode = FileMode.Directory;
    // (undocumented)
    readonly path: string;
    // (undocumented)
    readonly type = TreeEntry.Tree;
    // (undocumented)
    readonly value: ITree;
}

// (No @packageDocumentation comment for this package)

```