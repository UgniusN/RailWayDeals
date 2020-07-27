package lt.codeacademy.rest.entities;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

@Data
@Entity
@Table(name = "Travels")
@ApiModel(value = "Travel", description = "A product in this eshop")
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_id")
    @ApiModelProperty(hidden = true)
    private Long id;

    @NotNull
    @Column(name = "start_destination")
    @NotEmpty
    private String start_destination;

    @NotNull
    @Column(name = "end_destination")
    private String end_destination;

    @Column(name = "price")
    @DecimalMin("0.01")
    @NotNull
    private BigDecimal price;

    @NotNull
    @Column(name = "date")
    private String date;
}