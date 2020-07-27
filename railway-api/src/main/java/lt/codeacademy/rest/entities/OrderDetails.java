package lt.codeacademy.rest.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name="OrderDetails")
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="orderdetail_id")
    private Long id;

    @NotNull
    @Column(name="start_destination")
    private String startdestination;

    @NotNull
    @Column(name="end_destination")
    private String enddestination;

    @NotNull
    @Column(name="date")
    private String date;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="lastname")
    private String userlastname;

    @NotNull
    @Column(name="ticket_code")
    private String ticketcode;
}
