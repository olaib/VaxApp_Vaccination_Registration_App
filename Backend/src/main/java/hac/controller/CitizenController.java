package hac.controller;

import hac.model.Citizen;
import hac.repo.CitizenRepository;
import hac.services.CitizenServices;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private static final String CITIZEN_SAVED_SUCCESS = "Citizen saved successfully!";
    private final CitizenServices citizenServices;

    @Autowired
    public CitizenController(CitizenServices citizenServices) {
        this.citizenServices = citizenServices;
    }

    /**
     * Endpoint to handle form submission and save the citizen details.
     *
     * @param citizen The Citizen object containing the submitted form data.
     * @return ResponseEntity with the saved Citizen object.
     */
    @PostMapping("")
    public ResponseEntity<String> addCitizen(@Valid @RequestBody Citizen citizen) {
        // Save the citizen details to the database
        Citizen savedCitizen = citizenServices.addCitizen(citizen);
        return ResponseEntity.ok(CITIZEN_SAVED_SUCCESS);
    }

    /**
     * Get all citizens in the database.
     *
     * @return ResponseEntity with a list of all Citizen objects.
     */
    @GetMapping("")
    public ResponseEntity<List<Citizen>> getAllCitizens() {
        List<Citizen> citizens = citizenServices.getCitizens();
        return ResponseEntity.ok(citizens);
    }


    /**
     * This method handles the exception thrown when the exception is thrown 400 bad request or validation
     * status code is returned;
     *
     * @param ex exception thrown
     * @return 400 status code and the exception message
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * This method handles the exception thrown when the exception is thrown 500 status code is returned;
     *
     * @param e exception
     * @return 500 status code and the exception message
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}

