package hac.services;

import hac.model.Citizen;
import hac.repo.CitizenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CitizenServices {
    private final CitizenRepository citizenRepository;
    @Autowired
    public CitizenServices(CitizenRepository citizenRepository) {
        this.citizenRepository = citizenRepository;
    }

    public List<Citizen> getCitizens() {
        return citizenRepository.findAll();
    }

    public Citizen addCitizen(Citizen citizen) {
        return citizenRepository.save(citizen);
    }
}
