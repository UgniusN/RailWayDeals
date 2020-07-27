package lt.codeacademy.rest.controller;

import lt.codeacademy.rest.dto.OrderDTO;
import lt.codeacademy.rest.entities.Order;
import lt.codeacademy.rest.entities.User;
import lt.codeacademy.rest.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createorder")
    public Order buildOrder(@RequestParam(name = "travelid") Long travelid, @RequestParam(name = "userid") Long userid)
    {
        return orderService.buildOrder(travelid,userid);
    }

    @GetMapping("/getorder/{id}")
    public OrderDTO getOrder(@PathVariable Long id) {
        return new OrderDTO().build(orderService.getOrderByID(id));
    }

    @GetMapping("/userorders")
    public List<OrderDTO> getUserOrders(@AuthenticationPrincipal User user) {
        return orderService.getUserOrders(user.getId());
    }
}