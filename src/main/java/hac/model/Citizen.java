package hac.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * Entity class representing a Citizen.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "citizens",schema = "citizens")
public class Citizen implements Serializable {
    private static final int MAX_LENGTH = 100;
    private static final int TEXT_MAX_LEN = 255;
    private static final int PHONES_MAX_LEN = 15;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * First name of the citizen.
     */
    @NotBlank(message = "First name is required")
    @Size(max = MAX_LENGTH, message = "First name must be at most " + MAX_LENGTH + " characters")
    private String firstName;

    /**
     * Last name of the citizen.
     */
    @NotBlank(message = "Last name is required")
    @Size(max = MAX_LENGTH, message = "Last name must be at most " + MAX_LENGTH + " characters")
    private String lastName;

    /**
     * Date of birth of the citizen.
     */
    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;

    /**
     * Address of the citizen.
     */
    @NotBlank(message = "Address is required")
    @Size(max = TEXT_MAX_LEN, message = "Address must be at most " + TEXT_MAX_LEN + " characters")
    private String address;

    /**
     * City where the citizen lives.
     */
    @NotBlank(message = "City is required")
    @Size(max = MAX_LENGTH, message = "City must be at most " + MAX_LENGTH + " characters")
    private String city;
    /**
     * City where the citizen lives.
     */
    @NotBlank(message = "Country is required")
    @Size(max = MAX_LENGTH, message = "Country must be at most " + MAX_LENGTH + " characters")
    private String country;

    /**
     * Zip code of the citizen's location.
     */
    private String zipCode;

    /**
     * Landline phone number of the citizen.
     */
    @Size(max = PHONES_MAX_LEN, message = "Landline phone number must be at most " + PHONES_MAX_LEN + " characters")
    private String landline;

    /**
     * Cellular phone number of the citizen.
     */
    @NotBlank(message = "Cellular phone number is required")
    @Size(max = PHONES_MAX_LEN, message = "Cellular phone number must be at most " + PHONES_MAX_LEN + " characters")
    private String cellular;

    /**
     * Indicates if the citizen was infected by COVID-19.
     */
    @NotNull(message = "COVID infected field is required")
    private Boolean covidInfected;

    /**
     * List of health conditions of the citizen.
     */
    @ElementCollection
    private List<String> healthConditions;

    /**
     * Other conditions of the citizen (if any).
     */
    @Size(max = TEXT_MAX_LEN, message = "Other conditions must be at most " + TEXT_MAX_LEN + "characters")
    private String otherConditions;
}
