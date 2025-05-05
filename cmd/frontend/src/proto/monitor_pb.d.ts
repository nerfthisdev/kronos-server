import * as jspb from 'google-protobuf'



export class StatsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatsRequest): StatsRequest.AsObject;
  static serializeBinaryToWriter(message: StatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatsRequest;
  static deserializeBinaryFromReader(message: StatsRequest, reader: jspb.BinaryReader): StatsRequest;
}

export namespace StatsRequest {
  export type AsObject = {
  }
}

export class CPUCoreUsage extends jspb.Message {
  getCore(): string;
  setCore(value: string): CPUCoreUsage;

  getUsage(): number;
  setUsage(value: number): CPUCoreUsage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CPUCoreUsage.AsObject;
  static toObject(includeInstance: boolean, msg: CPUCoreUsage): CPUCoreUsage.AsObject;
  static serializeBinaryToWriter(message: CPUCoreUsage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CPUCoreUsage;
  static deserializeBinaryFromReader(message: CPUCoreUsage, reader: jspb.BinaryReader): CPUCoreUsage;
}

export namespace CPUCoreUsage {
  export type AsObject = {
    core: string,
    usage: number,
  }
}

export class Memory_usage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): Memory_usage;

  getUsed(): number;
  setUsed(value: number): Memory_usage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Memory_usage.AsObject;
  static toObject(includeInstance: boolean, msg: Memory_usage): Memory_usage.AsObject;
  static serializeBinaryToWriter(message: Memory_usage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Memory_usage;
  static deserializeBinaryFromReader(message: Memory_usage, reader: jspb.BinaryReader): Memory_usage;
}

export namespace Memory_usage {
  export type AsObject = {
    total: number,
    used: number,
  }
}

export class Disk_usage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): Disk_usage;

  getUsed(): number;
  setUsed(value: number): Disk_usage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Disk_usage.AsObject;
  static toObject(includeInstance: boolean, msg: Disk_usage): Disk_usage.AsObject;
  static serializeBinaryToWriter(message: Disk_usage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Disk_usage;
  static deserializeBinaryFromReader(message: Disk_usage, reader: jspb.BinaryReader): Disk_usage;
}

export namespace Disk_usage {
  export type AsObject = {
    total: number,
    used: number,
  }
}

export class CPUStatsResponse extends jspb.Message {
  getTotalUsage(): number;
  setTotalUsage(value: number): CPUStatsResponse;

  getCoresUsageList(): Array<CPUCoreUsage>;
  setCoresUsageList(value: Array<CPUCoreUsage>): CPUStatsResponse;
  clearCoresUsageList(): CPUStatsResponse;
  addCoresUsage(value?: CPUCoreUsage, index?: number): CPUCoreUsage;

  getBtime(): number;
  setBtime(value: number): CPUStatsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CPUStatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CPUStatsResponse): CPUStatsResponse.AsObject;
  static serializeBinaryToWriter(message: CPUStatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CPUStatsResponse;
  static deserializeBinaryFromReader(message: CPUStatsResponse, reader: jspb.BinaryReader): CPUStatsResponse;
}

export namespace CPUStatsResponse {
  export type AsObject = {
    totalUsage: number,
    coresUsageList: Array<CPUCoreUsage.AsObject>,
    btime: number,
  }
}

export class StatsResponse extends jspb.Message {
  getCpuUsageTotal(): CPUStatsResponse | undefined;
  setCpuUsageTotal(value?: CPUStatsResponse): StatsResponse;
  hasCpuUsageTotal(): boolean;
  clearCpuUsageTotal(): StatsResponse;

  getMemoryUsage(): Memory_usage | undefined;
  setMemoryUsage(value?: Memory_usage): StatsResponse;
  hasMemoryUsage(): boolean;
  clearMemoryUsage(): StatsResponse;

  getDiskUsage(): Disk_usage | undefined;
  setDiskUsage(value?: Disk_usage): StatsResponse;
  hasDiskUsage(): boolean;
  clearDiskUsage(): StatsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatsResponse): StatsResponse.AsObject;
  static serializeBinaryToWriter(message: StatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatsResponse;
  static deserializeBinaryFromReader(message: StatsResponse, reader: jspb.BinaryReader): StatsResponse;
}

export namespace StatsResponse {
  export type AsObject = {
    cpuUsageTotal?: CPUStatsResponse.AsObject,
    memoryUsage?: Memory_usage.AsObject,
    diskUsage?: Disk_usage.AsObject,
  }
}

