package lt.codeacademy.rest.entities;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Entity
@Table(name="Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="purchase_id")
    private Long id;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="travel_id" ,referencedColumnName="travel_id")
    private Travel travel;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
