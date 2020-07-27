package lt.codeacademy.rest.repositories;

import lt.codeacademy.rest.entities.Travel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepository extends JpaRepository<Travel, Long> {

}
