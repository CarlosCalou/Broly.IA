package com.brolyia.backend.model;

public class AnalyzeResponse {
    private String error;
    private String cause;
    private String fix;
    private String severity;
    private String raw;

    public AnalyzeResponse() {}

    public AnalyzeResponse(String error, String cause, String fix, String severity) {
        this.error = error;
        this.cause = cause;
        this.fix = fix;
        this.severity = severity;
    }

    public String getError()    { return error; }
    public String getCause()    { return cause; }
    public String getFix()      { return fix; }
    public String getSeverity() { return severity; }
    public String getRaw()      { return raw; }

    public void setError(String error)       { this.error = error; }
    public void setCause(String cause)       { this.cause = cause; }
    public void setFix(String fix)           { this.fix = fix; }
    public void setSeverity(String severity) { this.severity = severity; }
    public void setRaw(String raw)           { this.raw = raw; }
}