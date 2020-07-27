package lt.codeacademy.rest.services;

import lt.codeacademy.rest.entities.Travel;
import lt.codeacademy.rest.repositories.TravelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelService {

    private TravelRepository travelRepository;

    public TravelService(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }

    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public Travel getTravelById(Long id) {
        return travelRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public Travel buildTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    public void deleteTravel(Travel travel) {
        travelRepository.delete(travel);
    }
}
