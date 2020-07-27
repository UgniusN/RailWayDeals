package lt.codeacademy.rest.repositories;

import lt.codeacademy.rest.entities.Order;
import lt.codeacademy.rest.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUser(User user);
}
