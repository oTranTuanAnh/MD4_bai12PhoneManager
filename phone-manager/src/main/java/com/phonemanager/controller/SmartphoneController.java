package com.phonemanager.controller;

import com.phonemanager.model.Smartphone;
import com.phonemanager.repository.ISmartphoneRepository;
import com.phonemanager.service.ISmartphoneService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/smartphones")
public class SmartphoneController {
    @Autowired
    public ISmartphoneService smartphoneService;
    @PostMapping
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone smartphone) {

        return new ResponseEntity<>(smartphoneService.save(smartphone), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<Iterable<Smartphone>> listSmartphones() {
        return new ResponseEntity<>(smartphoneService.findAll(), HttpStatus.OK);
    }
}