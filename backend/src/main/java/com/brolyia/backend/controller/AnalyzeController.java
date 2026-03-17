package com.brolyia.backend.controller;

import com.brolyia.backend.model.AnalyzeRequest;
import com.brolyia.backend.model.AnalyzeResponse;
import com.brolyia.backend.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyzeController {

    private final GeminiService geminiService;

    public AnalyzeController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(@RequestBody AnalyzeRequest request) {
        if (request.getLog() == null || request.getLog().isBlank()) {
            return ResponseEntity.badRequest().body("Log não pode ser vazio.");
        }

        try {
            AnalyzeResponse response = geminiService.analyze(request.getLog());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Broly.IA backend online");
    }
}