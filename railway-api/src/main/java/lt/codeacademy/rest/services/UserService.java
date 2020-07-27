package lt.codeacademy.rest.services;


import lt.codeacademy.rest.entities.User;
import lt.codeacademy.rest.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }
}
