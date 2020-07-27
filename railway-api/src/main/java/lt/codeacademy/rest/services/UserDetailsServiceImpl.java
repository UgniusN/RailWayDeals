package lt.codeacademy.rest.services;

import lt.codeacademy.rest.entities.User;
import lt.codeacademy.rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user found by name: " + username));
    }

    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    public User buildUser(String username, String password, String name, String lastname, String email, String country ) {
        User user = new User();
        user.buildUser(username,passwordEncoder.encode(password),name,lastname,email,country);
        return userRepository.save(user);
    }

}
