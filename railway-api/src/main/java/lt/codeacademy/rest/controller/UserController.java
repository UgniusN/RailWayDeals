package lt.codeacademy.rest.controller;


import lombok.Data;
import lt.codeacademy.rest.entities.Role;
import lt.codeacademy.rest.entities.Travel;
import lt.codeacademy.rest.entities.User;
import lt.codeacademy.rest.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping
    public UserDto getUser(@AuthenticationPrincipal User user) {
        return new UserDto(user);
    }

    @PostMapping("/createuser")
    public User buildUser(@RequestParam(name = "user") String username,
                          @RequestParam(name = "pass") String password,
                          @RequestParam(name = "name") String name,
                          @RequestParam(name = "lastname") String lastname,
                          @RequestParam(name = "email") String email,
                          @RequestParam(name = "country") String country)
    {
        return userDetailsService.buildUser(username,password,name,lastname,email,country);
    }

    @Data
    private static class UserDto {
        private Long userid;
        private String name;
        private String lastName;
        private Set<String> roles;

        UserDto(User user) {
            this.userid = user.getId();
            this.name = user.getName();
            this.lastName = user.getLastName();
            this.roles = user.getRoles().stream().map(Role::getRole).collect(Collectors.toSet());
        }
    }

}
