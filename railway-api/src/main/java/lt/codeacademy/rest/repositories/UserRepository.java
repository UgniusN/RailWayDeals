package lt.codeacademy.rest.repositories;

import lt.codeacademy.rest.entities.Travel;
import lt.codeacademy.rest.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);
    User findUserById(Long id);
}

