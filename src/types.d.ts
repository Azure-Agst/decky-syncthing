export interface iStVersion {
    arch:        string;
    codename:    string;
    container:   boolean;
    date:        Date;
    isBeta:      boolean;
    isCandidate: boolean;
    isRelease:   boolean;
    longVersion: string;
    os:          string;
    stamp:       string;
    tags:        string[];
    user:        string;
    version:     string;
}

export interface iStFolder {
    id:                      string;
    label:                   string;
    filesystemType:          string;
    path:                    string;
    type:                    string;
    devices:                 iStDevice[];
    rescanIntervalS:         number;
    fsWatcherEnabled:        boolean;
    fsWatcherDelayS:         number;
    ignorePerms:             boolean;
    autoNormalize:           boolean;
    minDiskFree:             iStFolderMDF;
    versioning:              iStFolderVers;
    copiers:                 number;
    pullerMaxPendingKiB:     number;
    hashers:                 number;
    order:                   string;
    ignoreDelete:            boolean;
    scanProgressIntervalS:   number;
    pullerPauseS:            number;
    maxConflicts:            number;
    disableSparseFiles:      boolean;
    disableTempIndexes:      boolean;
    paused:                  boolean;
    weakHashThresholdPct:    number;
    markerName:              string;
    copyOwnershipFromParent: boolean;
    modTimeWindowS:          number;
    maxConcurrentWrites:     number;
    disableFsync:            boolean;
    blockPullOrder:          string;
    copyRangeMethod:         string;
    caseSensitiveFS:         boolean;
    junctionsAsDirs:         boolean;
    syncOwnership:           boolean;
    sendOwnership:           boolean;
    syncXattrs:              boolean;
    sendXattrs:              boolean;
    xattrFilter:             iStFolderXFilter;
}

export interface iStDevice {
    deviceID:           string;
    introducedBy:       string;
    encryptionPassword: string;
}

export interface iStFolderMDF {
    value: number;
    unit:  string;
}

export interface iStFolderVers {
    type:             string;
    params:           any;
    cleanupIntervalS: number;
    fsPath:           string;
    fsType:           string;
}

export interface iStFolderXFilter {
    entries:            any[];
    maxSingleEntrySize: number;
    maxTotalSize:       number;
}

export interface iStDbStatus {
    errors:                        number;
    pullErrors:                    number;
    invalid:                       string;
    globalFiles:                   number;
    globalDirectories:             number;
    globalSymlinks:                number;
    globalDeleted:                 number;
    globalBytes:                   number;
    globalTotalItems:              number;
    localFiles:                    number;
    localDirectories:              number;
    localSymlinks:                 number;
    localDeleted:                  number;
    localBytes:                    number;
    localTotalItems:               number;
    needFiles:                     number;
    needDirectories:               number;
    needSymlinks:                  number;
    needDeletes:                   number;
    needBytes:                     number;
    needTotalItems:                number;
    receiveOnlyChangedFiles:       number;
    receiveOnlyChangedDirectories: number;
    receiveOnlyChangedSymlinks:    number;
    receiveOnlyChangedDeletes:     number;
    receiveOnlyChangedBytes:       number;
    receiveOnlyTotalItems:         number;
    inSyncFiles:                   number;
    inSyncBytes:                   number;
    state:                         string;
    stateChanged:                  Date;
    error:                         string;
    version:                       number;
    sequence:                      number;
    ignorePatterns:                boolean;
    watchError:                    string;
}

export interface iStStats {
    [key: string]: iStFolderStats
}

export interface iStFolderStats {
    lastFile: iStFolderLFile;
    lastScan: Date;
}

export interface iStFolderLFile {
    at:       Date;
    filename: string;
    deleted:  boolean;
}

export interface iStPing {
    ping: string;
}

export interface iStFolderErr {
    folder:  string;
    errors:  iStFileError[];
    page:    number;
    perpage: number;
}

export interface iStFileError {
    path:  string;
    error: string;
}

export interface iFolderStatus {
    label: string;
    folder: iStFolder;
    errors?: iStFolderErr;
    dbStatus: iStDbStatus;
    stats?: iStFolderStats;
}