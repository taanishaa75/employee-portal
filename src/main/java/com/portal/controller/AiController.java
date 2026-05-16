package com.portal.controller;

import com.portal.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate-jd")
    public ResponseEntity<Map<String, String>> generateJD(@RequestBody Map<String, String> req) {
        String jd = aiService.generateJobDescription(
            req.get("designation"),
            req.get("department")
        );
        return ResponseEntity.ok(Map.of("jobDescription", jd));
    }
}