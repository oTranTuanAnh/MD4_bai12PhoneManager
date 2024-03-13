package com.phonemanager.controller;

import com.phonemanager.model.Smartphone;
import com.phonemanager.repository.ISmartphoneRepository;
import com.phonemanager.service.ISmartphoneService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
    @DeleteMapping("/{id}")
    public ResponseEntity<Smartphone> deleteSmartphone(@PathVariable Long id) {
        Optional<Smartphone> smartphoneOptional = smartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        smartphoneService.remove(id);
        return new ResponseEntity<>(smartphoneOptional.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Smartphone> editSmartphone(@PathVariable Long id) {
        Optional<Smartphone> smartphone= smartphoneService.findById(id);
        return new ResponseEntity<>(smartphone.get(), HttpStatus.OK);
    }
    @PutMapping ("/{id}")
    public ResponseEntity<Smartphone> editSmartphone1(@PathVariable Long id, @RequestBody Smartphone smartphone) {
        Smartphone sm = new Smartphone();
        sm.setId(id);
        sm.setProducer(smartphone.getProducer());
        sm.setModel(smartphone.getModel());
        sm.setPrice(smartphone.getPrice());
        return new ResponseEntity<>(smartphoneService.save(sm), HttpStatus.OK);
    }
}