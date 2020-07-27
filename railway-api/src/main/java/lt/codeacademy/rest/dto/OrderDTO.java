package lt.codeacademy.rest.dto;

import lombok.Data;
import lt.codeacademy.rest.entities.Order;

import java.util.ArrayList;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;

    private String startdestination;

    private String enddestination;

    private String date;

    private String name;

    private String lastname;

    private String ticketcode;

    public OrderDTO build(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setStartdestination(order.getTravel().getStart_destination());
        orderDTO.setEnddestination(order.getTravel().getEnd_destination());
        orderDTO.setName(order.getUser().getName());
        orderDTO.setLastname(order.getUser().getLastName());
        orderDTO.setTicketcode("53432526642346");
        orderDTO.setDate(order.getTravel().getDate());
        return orderDTO;
    }

    public List<OrderDTO> getOrderDTO(List<Order> orders) {
        List<OrderDTO> orderDTOS = new ArrayList<>();

        for(Order order : orders) {
            orderDTOS.add(new OrderDTO().build(order));
        }
        return orderDTOS;
    }
}
