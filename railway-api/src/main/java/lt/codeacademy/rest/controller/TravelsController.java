package lt.codeacademy.rest.controller;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.math.BigDecimal;

import lt.codeacademy.rest.entities.Travel;
import lt.codeacademy.rest.entities.User;
import lt.codeacademy.rest.services.TravelService;
import lt.codeacademy.rest.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TravelsController {


    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    private final TravelService travelService;

    public TravelsController(TravelService travelService) {
        this.travelService = travelService;
    }

    @ApiResponses({
            @ApiResponse(code = 500, message = "Somethings wrong")
    })
    @GetMapping("/getall")
    public List<Travel> getTravels() {
        return travelService.getAllTravels();
    }

    @GetMapping("{id}")
    public Travel getTravelById(@PathVariable Long id) {
        return travelService.getTravelById(id);
    }

    @PostMapping("/createtravel")
    public Travel buildTravel(@RequestParam(name = "startdestination") String start,
                              @RequestParam(name = "enddestination") String end,
                              @RequestParam(name = "price") BigDecimal price,
                              @RequestParam(name = "date") String date)
    {
        Travel travel = new Travel();
        travel.setStart_destination(start);
        travel.setEnd_destination(end);
        travel.setPrice(price);
        travel.setDate(date);
        return travelService.buildTravel(travel);
    }

    @PostMapping("/updatetravel")
    public Travel updateTravel(@RequestParam(name="id") Long id,
                               @RequestParam(name="startdestination") String start,
                               @RequestParam(name="enddestination") String end,
                               @RequestParam(name="price") BigDecimal price,
                               @RequestParam(name="date") String date)
    {
        Travel travel = new Travel();
        travel.setId(id);
        travel.setStart_destination(start);
        travel.setEnd_destination(end);
        travel.setPrice(price);
        travel.setDate(date);
        return travelService.buildTravel(travel);
    }

    @PostMapping("/deletetravel")
    public void deleteTravel(@RequestParam(name="id") Long id) {
        Travel travel = travelService.getTravelById(id);
        travelService.deleteTravel(travel);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody User user) throws Exception {
        return ResponseEntity.ok(userDetailsServiceImpl.saveOrUpdateUser(user));
    }



}