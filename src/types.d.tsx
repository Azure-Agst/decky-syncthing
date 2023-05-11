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
