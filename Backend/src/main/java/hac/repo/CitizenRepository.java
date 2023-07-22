package hac.repo;

import hac.model.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {
    /**
     * @return all the citizens in the table
     */
    List<Citizen> findAll();

    /**
     * @param id the id of the citizen
     * @return the citizen with the given id
     */
    Citizen findById(long id);
}

