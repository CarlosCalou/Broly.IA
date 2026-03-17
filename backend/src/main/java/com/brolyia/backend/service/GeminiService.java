package com.brolyia.backend.service;

import com.brolyia.backend.model.AnalyzeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public AnalyzeResponse analyze(String logText) throws Exception {

        String prompt = """
            Você é especialista em análise de logs. Analise o log e responda NESTE FORMATO:

            Erro: [descrição simples em português]
            Causa: [causa provável em português, linguagem simples]
            Solução: [passos para resolver em português]
            Severidade: [baixa / média / alta]

            Log:
```
            %s
```

            Seja objetivo. Linguagem simples para iniciantes. Máximo 3 linhas por campo.
            """.formatted(logText);

        String requestBody = """
            {
              "contents": [{"parts": [{"text": %s}]}],
              "generationConfig": {"temperature": 0.2, "maxOutputTokens": 512}
            }
            """.formatted(toJsonString(prompt));

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new Exception("Erro na API Gemini: " + response.statusCode());
        }

        return parseResponse(response.body());
    }

    private AnalyzeResponse parseResponse(String body) {
        int start = body.indexOf("\"text\": \"") + 9;
        int end   = body.lastIndexOf("\"");
        if (start < 9 || end <= start) {
            AnalyzeResponse r = new AnalyzeResponse();
            r.setRaw("Não foi possível interpretar a resposta.");
            return r;
        }

        String text = body.substring(start, end)
            .replace("\\n", "\n")
            .replace("\\\"", "\"");

        return parseText(text);
    }

    private AnalyzeResponse parseText(String text) {
        String error  = extractField(text, "Erro");
        String cause  = extractField(text, "Causa");
        String fix    = extractField(text, "Solução");
        String sevRaw = extractField(text, "Severidade").toLowerCase();

        String severity = "medium";
        if (sevRaw.contains("baixa")) severity = "low";
        if (sevRaw.contains("alta"))  severity = "high";

        if (error.isEmpty() && cause.isEmpty() && fix.isEmpty()) {
            AnalyzeResponse r = new AnalyzeResponse();
            r.setRaw(text);
            r.setSeverity(severity);
            return r;
        }

        return new AnalyzeResponse(error, cause, fix, severity);
    }

    private String extractField(String text, String field) {
        String marker = field + ":";
        int idx = text.indexOf(marker);
        if (idx == -1) return "";
        int start = idx + marker.length();
        int end   = text.indexOf("\n", start);
        if (end == -1) end = text.length();
        return text.substring(start, end).trim();
    }

    private String toJsonString(String value) {
        return "\"" + value
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
            + "\"";
    }
}