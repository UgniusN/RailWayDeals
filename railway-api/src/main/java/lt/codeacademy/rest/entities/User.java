package lt.codeacademy.rest.entities;


import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "Users")
public class User implements UserDetails {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @NotNull
    @Column(name = "username", nullable = true, unique = true)
    private String username;

    @NotNull
    @Column(name = "password", nullable = true)
    private String password;

    @NotNull
    @Column(name = "name", nullable = true)
    private String name;

    @NotNull
    @Column(name = "last_name", nullable = true)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = true)
    private String email;

    @NotNull
    @Column(name = "country", nullable = true)
    private String country;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Users_Roles",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "role_id") }
    )
    private Set<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getFullName() {
        return name + " " + lastName;
    }


    public void buildUser(String username, String password, String name, String lastname, String email, String country) {
        this.username=username;
        this.password=password;
        this.name=name;
        this.lastName=lastname;
        this.email=email;
        this.country=country;
    }
}